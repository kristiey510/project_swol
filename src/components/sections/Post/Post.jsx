import React, {useState} from "react";
import "./Post.css";
import { MoreVert, PostAddOutlined, ThumbUp } from "@material-ui/icons";
import {
  doc,
  db,
  getDoc,
  auth,
  updateDoc,
  arrayUnion,
  increment,
  arrayRemove,
  deleteDoc,
  getStorage,
  ref,
  deleteObject,
  setDoc,
  serverTimestamp,
} from "../../../firebase/firebase";
import { 
  Text, 
  Flex, 
  Stack, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Textarea,
  Input,
  Spacer,
  Divider,
  HStack
} from "@chakra-ui/react";
import { exerciseUnits } from "../../../utils/exercises";
import { calories } from "../../../utils/calories";

export default function Post({ post, user }) {
  const bodyWtExercises = [
    "Plank",
    "Pull up/chin up",
    "Sit up/crunch",
    "Push up",
  ];
  const [isLiked,setIsLiked] = useState(0)
  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();
  const [comment, setComment] = useState("");

  const postComment = () => {
    console.log("comment")
    console.log(comment)
    const docRef = doc(db, "test", post.id);
    var currentTime = new Date(Date.now()).toISOString().substring(0, 10) + "\xa0" + "@\xa0" + new Date(Date.now()).toISOString().substring(11, 19);
    updateDoc(docRef, {
        comments: arrayUnion({usr: user.Name, comment: comment, time: currentTime})
    })
    post.comments.push({usr: user.Name, comment: comment, time: currentTime})

    const comIn = document.getElementById("comment");
    comIn.value = "";
    setComment("");
  };


  const handleDelete = (post) => {
    console.log("deleting")
    console.log(post.id)

    //delete image 
    if(post.img != 'no_image_provided'){
      console.log('deleting image',post.img)
      const storage = getStorage();
      const deleteRef = ref(storage, post.img);
      deleteObject(deleteRef)
    }
    console.log(post)
    //delete doc
    deleteDoc(doc(db, "test", post.id));

    //todo: handle cache?
  };

  const handleLike = () => {
    console.log("wtf")
    // setLN("");
    var alreadyLiked = false;
    var user = auth.currentUser;
    //if no user
    if (!user) {
      console.log("No user");
      return;
    }
    console.log("Searching for post to like:");
    console.log(post.id);

    getDoc(doc(db, "test", post.id)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        //loop through array
        for (let i = 0; i < data.likes; i++) {
          //if the user has already liked it
          if (data.likers[i] === user.uid) {
            console.log("already liked");
            alreadyLiked = true;
          }
        }
        const docRef = doc(db, "test", post.id);

        console.log(alreadyLiked);
        //like post
        if (alreadyLiked === false) {
          console.log("like");
          // setLN("Liked Post");
          updateDoc(docRef, {
            likers: arrayUnion(user.uid),
            likes: increment(1),
          });
          setIsLiked(1)
        }
        //unlike post
        else {
          console.log("unlike");
          // setLN("Unliked Post");
          updateDoc(docRef, {
            likers: arrayRemove(user.uid),
            likes: increment(-1),
          });
          setIsLiked(0)
          var index = post.likers?.indexOf(user.uid);
          if (index !== -1) {
            post.likers?.splice(index, 1);
          }
        }
      } else {
        console.log("No such document!");
      }
    });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={post?.propic} alt="" />
            <span className="postUsername">{post?.username}</span>
            {/* <span className="postDate">{post?.type}</span> */}
            <span className="postDate">
              {new Date(post?.timestamp?.seconds * 1000)
                .toISOString()
                .substring(0, 10) +
                "\xa0" +
                "@\xa0"}
              {new Date(post?.timestamp.seconds * 1000)
                .toISOString()
                .substring(11, 19)}
            </span>
          </div>
          <div className="postTopRight">
          {user.uid == post.usr ? 
          <Popover>
            <PopoverTrigger>
              <MoreVert />
            </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Delete Post?</PopoverHeader>
            <PopoverBody>
              <ButtonGroup variant='outline' spacing='6'>
              <Button 
              onClick={() => handleDelete(post)}
              colorScheme='red'>Delete</Button>
              </ButtonGroup></PopoverBody>
          </PopoverContent>
          </Popover>
          : null}
          </div>
        </div>
        {(post?.desc || post?.imgUrl) && (
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={post?.imgUrl} alt="" />
          </div>
        )}

        <hr className="postHr" />

        {post?.type &&
          user?.Height_Ft &&
          user?.Height_In &&
          user?.Weight &&
          (post?.scale || bodyWtExercises.includes(post?.type)) &&
          post?.quantity && (
            <>
              <Flex justify="space-around" align="center" mb="10px">
                <Stack>
                  <Text color="gray.400" fontSize="xs">
                    Exercise
                  </Text>
                  <Text>{post?.type}</Text>
                </Stack>
                <Stack>
                  {!bodyWtExercises.includes(post?.type) && (
                    <Text>
                      {post?.scale !== 1
                        ? `${post?.scale} ${exerciseUnits[post?.type]?.scale}`
                        : `${post?.scale} ${(exerciseUnits[
                            post?.type
                          ]?.scale).slice(0, -1)}`}
                    </Text>
                  )}
                  <Text>
                    {post?.quantity !== 1
                      ? `${post?.quantity} ${
                          exerciseUnits[post?.type]?.quantity
                        }`
                      : `${post?.quantity} ${(exerciseUnits[
                          post?.type
                        ]?.quantity).slice(0, -1)}`}
                  </Text>
                </Stack>
                <Stack>
                  <Text color="gray.400" fontSize="xs">
                    Estimate
                  </Text>
                  <Text>
                    {`${Math.round(
                      calories(
                        post?.type,
                        Number(user?.Height_Ft),
                        Number(user?.Height_In),
                        Number(user?.Weight),
                        post?.scale,
                        post?.quantity
                      )
                    )} calories`}
                  </Text>
                </Stack>
              </Flex>

              <hr className="postHr" />
            </>
          )}

        <div className="postBottom">
          <div className="postBottomLeft">
          {post.likers?.includes(user.uid) || isLiked == 1 ? 
            <ThumbUp
            onClick={handleLike}
            htmlColor="blue">
            </ThumbUp>
            :
            <ThumbUp
            onClick={handleLike}
            htmlColor="grey">
            </ThumbUp>
            }
            <span className="postLikeCounter">
              {post?.likes + isLiked === 1 ? (
                <Text>{post?.likes + isLiked} like</Text>
              ) : (
                <Text> {post?.likes + isLiked} likes</Text>
              )}
            </span>
          </div>
          <div className="postBottomRight">
            <span 
            className="postCommentText"
            onClick={onCommentsOpen}
            >{post?.comment} comments</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isCommentsOpen} onClose={onCommentsClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primary.2350">Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {post.comments?.map((comment,index) => ( 
            <Box key = {index} m ={2}>
              <Text as='span'>
               {comment.usr} 
              : {comment.comment}
                </Text>
                <Text as='span' color='grey' fontSize='xs'>{comment?.time}</Text>
            </Box>
          ))}
          <Divider orientation='horizontal' m={3}/>
          <Input
            id = "comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Make a Comment"
            size="sm"
          />
          </ModalBody>
          <ModalFooter>
          <HStack>
          <Button
                bg="primary.3200"
                color="primary.150"
                fontWeight="bold"
                fontSize="16"
                onClick={postComment}
              >
                Post Comment
              </Button>
              <Button
                bg="primary.3200"
                color="primary.150"
                fontWeight="bold"
                fontSize="16"
                onClick={onCommentsClose}
              >
                Done
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    
  );
}
