import React, { useState, useEffect } from "react"; 
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
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

export default function Feed({user}) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);




  //var currentUser = auth.currentUser;
  //var currentUser = "Y5sAEElg7cUOAdrswinf8Swrs443"
  //console.log("user1",user1)
  var currentUser = user
  // console.log("current user",currentUser)
  //how to make sure user is validated?

  //console.log(currentUser);

  //var currentUser = auth.currentUser;
  //console.log("user",auth.currentUser);

  useEffect(async() => {
    
    await getDoc(doc(db, "Profile", currentUser.uid)).then(async(docSnap) => {
    if (docSnap.exists()) {
      var postDict = [];
      var count = 0;
      //console.log("User data:", docSnap.data());

      const user = docSnap.data();
      //loop through follows

      user.following?.forEach((u) => {
        const postQuery = query(collection(db, "test"), where("usr", "==", u));
        getDocs(postQuery).then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            var new_obj = {}
            if(doc.data().img != 'no_image_provided'){
            
              //console.log("image", doc.data().img);
  
              //get image ref
              const storage = getStorage();
              const pathReference = ref(storage, doc.data().img);
  
              //download, then set attribute to image tag in file
              getDownloadURL(pathReference).then((url) => {
                //console.log("url",url)
                new_obj = { ...doc.data(), imgUrl: url }
                setPosts(prev => [...prev, new_obj]);
              })
            }
            else{
              new_obj = { ...doc.data(), imgUrl: null }
              setPosts(prev => [...prev, new_obj]);
            }
            
            // setPosts(prev => [...prev, doc.data()]);
          });
        })
        // const profileQuery = query(collection(db, "Profile"), where("User_id", "==", u));
        // getDocs(profileQuery).then(querySnapshot => {
        //   querySnapshot.forEach((doc) => {
        //     console.log("user",doc.data())
        //   });
        // })
      })

      // console.log("before", posts);
      // setPosts(postDict);
      // console.log("this2",posts);
      // //return postDict;
      //get display name and profile picture

    } else {
      console.log("No such document!");
      return [{desc:'no posts'}];
    }
    })
    
  }, [])

  return (
    <div className="Feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post,index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
