import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import {
  doc,
  db,
  collection,
  getStorage,
  ref,
  getDoc,
  getDownloadURL,
  query,
  where,
  getDocs,
} from "../../../firebase/firebase";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      var username;
      var propic;
      var propicID;
      user.following?.forEach((u) => {
        //get the username of the original poster for each post
        getDoc(doc(db, "Profile", u)).then((docSnap) => {
          username = docSnap.data().Name;
          propicID = docSnap.data().Picture_id;
        }).catch((error) => {console.log(error);});
        //get all posts from users the user is following
        const postQuery = query(collection(db, "test"), where("usr", "==", u));
        getDocs(postQuery).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var name_obj = {};
            var img_obj = {};
            //store username with data
            name_obj = { ...doc.data(), username: username };

            if (doc.data().img !== "no_image_provided") {
              //get image ref
              const storage = getStorage();
              const pathReference = ref(storage, doc.data().img);

              const pathReference1 = ref(storage, propicID);

              //download, then set attribute to image tag in file
              getDownloadURL(pathReference).then((url1) => {
                getDownloadURL(pathReference1).then((url) => {
                  propic = url;
                  img_obj = { ...name_obj, imgUrl: url1, propic: propic };
                  setPosts((prev) => [...prev, img_obj]);
                });
              });
            } else {
              const storage = getStorage();
              const pathReference1 = ref(storage, propicID);
              getDownloadURL(pathReference1).then((url) => {
                propic = url;
                img_obj = { ...name_obj, imgUrl: null, propic: propic };
                setPosts((prev) => [...prev, img_obj]);
              });
            }
          });
        });
      });
    }
    fetchPosts();
  }, [user.following]);

  //sorts by date descending
  posts.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="Feed">
      <div className="feedWrapper">
        <Share user={user} setPosts = {setPosts} />
        {posts.map((post, index) => (
          <Post key={index} post={post} user={user} setPosts = {setPosts}/>
        ))}
      </div>
    </div>
  );
}
