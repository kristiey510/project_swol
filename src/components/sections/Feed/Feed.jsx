import React, { useState, useEffect } from "react"; 
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
//import { Posts } from "../../../firebase/dummyData";
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

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);


  //console.log("og",posts);


  //var postDict = ["Morning run in lullwater","Cool bike ride on the beltline","Swam at the SAAC"]
  //var currentUser = auth.currentUser;
  var currentUser = "Y5sAEElg7cUOAdrswinf8Swrs443"
  //how to make sure user is validated?

  //console.log(currentUser);

  //var currentUser = auth.currentUser;
  //console.log("user",auth.currentUser);

  useEffect(async() => {
    await getDoc(doc(db, "Profile", currentUser)).then(async(docSnap) => {
    if (docSnap.exists()) {
      var postDict = [];
      var count = 0;
      //console.log("User data:", docSnap.data());

      const user = docSnap.data();
      //loop through follows

      user.following.forEach((u) => {
        const postQuery = query(collection(db, "test"), where("usr", "==", u));
        getDocs(postQuery).then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            console.log()
            if(doc.data().img != 'no_image_provided'){
            
              //console.log("image", doc.data().img);
  
              //get image ref
              const storage = getStorage();
              const pathReference = ref(storage, doc.data().img);
  
              //download, then set attribute to image tag in file
              getDownloadURL(pathReference).then((url) => {
                //console.log("url",url)
                setImages(prev => [...prev, url]);
              })
            }
            else{
              setImages(prev => [...prev, null]);
            }


            setPosts(prev => [...prev, doc.data()]);
          });
        })
      })

      // console.log("before", posts);
      // setPosts(postDict);
      // console.log("this2",posts);
      // //return postDict;
    } else {
      console.log("No such document!");
      return [{desc:'no posts'}];
    }
    })
    
  }, [])


  console.log("posts",posts)

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
