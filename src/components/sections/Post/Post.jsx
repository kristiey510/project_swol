import React, { useState, useEffect } from "react"; 
import "./Post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../../firebase/dummyData";
import { 
  doc, 
  setDoc, 
  db, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getStorage, 
  ref, 
  uploadBytes, 
  getDoc, 
  getDownloadURL,
  auth, 
  updateDoc,
  arrayUnion,
  query,
  where,
  increment,
  arrayRemove,
  getDocs,
  orderBy
  } from "../../../firebase/firebase";

export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  
  }


  const handleLike = () => {
    // setLN("");
    var alreadyLiked = false;
    var user = auth.currentUser;
    //if no user
    if(!user){
      console.log("No user");
      return;
    }
    console.log('Searching for post to like:');
    console.log(post.id);


    getDoc(doc(db, "test", post.id)).then(docSnap => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data(); 
        //loop through array 
        for(let i = 0; i<data.likes;i++){
          //if the user has already liked it
          if(data.likers[i] == user.uid){
            console.log("already liked")
            alreadyLiked = true;
          }
        }   
        const docRef = doc(db, "test", post.id)

        console.log(alreadyLiked)
        //like post
        if(alreadyLiked == false){
          console.log("like")
          // setLN("Liked Post");
          updateDoc(docRef, {
            likers: arrayUnion(user.uid),
            likes: increment(1)
          });
        }
        //unlike post
        else{
          console.log("unlike");
          // setLN("Unliked Post");
          updateDoc(docRef, {
            likers: arrayRemove(user.uid),
            likes: increment(-1)
          });
        }
        
      } 
      else {
        console.log("No such document!");
      }
    })
  }

    

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            /> */}
            <span className="postUsername">
              {post?.usr}
            </span>
            <span className="postDate">{new Date(post?.timestamp.seconds*1000).toISOString().substring(0,10) + '\xa0' + "@" + '\xa0'}</span>
            <span className="postDate">{new Date(post?.timestamp.seconds*1000).toISOString().substring(11,19)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.imgUrl} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={handleLike} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={handleLike} alt="" />
            <span className="postLikeCounter">{post?.likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
