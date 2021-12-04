import React, { useState, useEffect } from "react";
import "./Post.css";
import { MoreVert, ThumbUp } from "@material-ui/icons";
import {
  doc,
  db,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
  getDownloadURL,
  arrayRemove,
  deleteDoc,
  getStorage,
  ref,
  deleteObject,
} from "../../../firebase/firebase";
import {
  Text,
  Flex,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
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
  Input,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { exerciseUnits } from "../../../utils/exercises";
import { calories } from "../../../utils/calories";

export default function Post({ post, user, profiles, setPosts }) {
  const [image, setImage] = useState("");
  const [isLiked, setIsLiked] = useState(0);
  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();
  const [comment, setComment] = useState("");
  const bodyWtExercises = [
    "Plank",
    "Pull up/chin up",
    "Sit up/crunch",
    "Push up",
  ];

  const postComment = () => {
    const docRef = doc(db, "test", post.id);
    var currentTime =
      new Date(Date.now()).toISOString().substring(0, 10) +
      "\xa0@\xa0" +
      new Date(Date.now()).toISOString().substring(11, 19);
    updateDoc(docRef, {
      comments: arrayUnion({
        usr: user.Name,
        comment: comment,
        time: currentTime,
      }),
    });
    post.comments.push({ usr: user.Name, comment: comment, time: currentTime });

    const comIn = document.getElementById("comment");
    comIn.value = "";
    setComment("");
  };

  const handleDelete = (post) => {
    //delete image
    if (post.img !== "no_image_provided") {
      const storage = getStorage();
      const deleteRef = ref(storage, post.img);
      deleteObject(deleteRef);
    }
    //delete doc
    deleteDoc(doc(db, "test", post.id));

    var thispost = post;

    setPosts((prev) => prev.filter((post) => post !== thispost));
  };

  const handleLike = () => {
    var alreadyLiked = false;
    if (!user) {
      return;
    }

    getDoc(doc(db, "test", post.id)).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        //loop through array
        for (let i = 0; i < data.likes; i++) {
          //if the user has already liked it
          if (data.likers[i] === user.uid) {
            alreadyLiked = true;
          }
        }
        const docRef = doc(db, "test", post.id);

        if (alreadyLiked === false) {
          updateDoc(docRef, {
            likers: arrayUnion(user.uid),
            likes: increment(1),
          });
          setIsLiked(1);
        } else {
          updateDoc(docRef, {
            likers: arrayRemove(user.uid),
            likes: increment(-1),
          });
          setIsLiked(0);
          var index = post.likers?.indexOf(user.uid);
          if (index !== -1) {
            post.likers?.splice(index, 1);
          }
        }
      }
    });
  };

  useEffect(() => {
    const storage = getStorage();
    async function fetchImage() {
      if (post?.img !== "no_image_provided") {
        const downloadURL = await getDownloadURL(ref(storage, post.img));
        setImage(downloadURL);
      }
    }
    fetchImage();
  }, [post.img]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={profiles[post?.usr]?.propic}
              alt=""
            />
            <span className="postUsername">
              {profiles[post?.usr]?.username}
            </span>
            {post.timestamp !== "just now" ? (
              <span className="postDate">
                <Text mt="3px" color="#928E8B">
                  {new Date(post?.timestamp?.seconds * 1000)
                    .toISOString()
                    .substring(0, 10) + "\xa0@\xa0"}
                  {new Date(post?.timestamp.seconds * 1000)
                    .toISOString()
                    .substring(11, 19)}
                </Text>
              </span>
            ) : (
              <span className="postDate">
                <Text mt="3px" color="#928E8B">
                  Just Now
                </Text>
              </span>
            )}
          </div>
          <div className="postTopRight">
            {user.uid === post.usr && post.timestamp !== "just now" ? (
              <Popover>
                <PopoverTrigger>
                  <MoreVert />
                </PopoverTrigger>
                <PopoverContent w="130px" align="center">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody justify="center">
                    <ButtonGroup spacing="6">
                      <Button
                        size="sm"
                        borderRadius="10"
                        variant="outline"
                        onClick={() => handleDelete(post)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        </div>
        {(post?.desc || (post?.img && image)) && (
          <div className="postCenter">
            {post?.desc && <span className="postText">{post?.desc}</span>}
            {post?.img && image && (
              <img className="postImg" src={image} alt="" />
            )}
          </div>
        )}

        {post?.type &&
        (post?.cals ||
          (profiles[post?.usr]?.feet &&
            profiles[post?.usr]?.inches &&
            profiles[post?.usr]?.weight)) &&
        (post?.scale || bodyWtExercises.includes(post?.type)) &&
        post?.quantity ? (
          <Box bg="rgba(0, 0, 0, 0.04)">
            <hr className="postHr" />
            <Flex justify="space-around" align="center" mb="10px">
              <Stack>
                <Text color="gray.400" fontSize="xs">
                  Exercise
                </Text>
                <Text>{post?.type}</Text>
              </Stack>
              {!bodyWtExercises.includes(post?.type) && (
                <Stack>
                  <Text color="gray.400" fontSize="xs">
                    {exerciseUnits[post?.type]?.scale.replace(/./, (c) =>
                      c.toUpperCase()
                    )}
                  </Text>
                  <Text>{post?.scale}</Text>
                </Stack>
              )}
              <Stack>
                <Text color="gray.400" fontSize="xs">
                  {exerciseUnits[post?.type]?.quantity.replace(/./, (c) =>
                    c.toUpperCase()
                  )}
                </Text>
                <Text>{post?.quantity}</Text>
              </Stack>
              <Stack>
                <Text color="gray.400" fontSize="xs">
                  Estimate
                </Text>
                <Text>
                  {post?.cals
                    ? `${Math.round(post.cals)} calories`
                    : `${Math.round(
                        calories(
                          post?.type,
                          Number(profiles[post?.usr]?.feet),
                          Number(profiles[post?.usr]?.inches),
                          Number(profiles[post?.usr]?.weight),
                          post?.scale,
                          post?.quantity
                        )
                      )} calories`}
                </Text>
              </Stack>
            </Flex>

            <hr className="postHr" />
          </Box>
        ) : (
          <hr className="postHr" />
        )}

        <div className="postBottom">
          <div className="postBottomLeft">
            {post.likers?.includes(user.uid) || isLiked === 1 ? (
              <ThumbUp onClick={handleLike} htmlColor="#FFC494"></ThumbUp>
            ) : (
              <ThumbUp onClick={handleLike} htmlColor="#D0CCCA"></ThumbUp>
            )}
            <span className="postLikeCounter">
              {post?.likes + isLiked === 1 ? (
                <Text mt="2px" fontSize="10pt" color="#928E8B">
                  {post?.likes + isLiked} like
                </Text>
              ) : (
                <Text mt="2px" fontSize="10pt" color="#928E8B">
                  {post?.likes + isLiked} likes
                </Text>
              )}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={onCommentsOpen}>
              <Text mt="-25px" color="#928E8B" fontSize="10pt" as="u">
                {post?.comment} comments
              </Text>
            </span>
          </div>
        </div>
      </div>
      <Modal isOpen={isCommentsOpen} onClose={onCommentsClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primary.2350">Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {post.comments?.map((comment, index) => (
              <Box key={index} m={2}>
                <Text color="grey" fontSize="10px">
                  {comment.usr}
                </Text>
                <Flex justify="space-between">
                  <Text>{comment.comment}</Text>
                  <Text color="grey" fontSize="xs">
                    {comment?.time}
                  </Text>
                </Flex>
              </Box>
            ))}
            <Divider orientation="horizontal" m={3} />
            <Input
              id="comment"
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
