import React, { useState } from "react";
import "./Share.css";
import { PermMedia, EmojiEmotions, AddCircleOutline } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  db,
  collection,
  serverTimestamp,
  getStorage,
  ref,
  uploadBytes,
  auth,
} from "../../../firebase/firebase";

export default function Share() {
  const [input, setInput] = useState({ title: "", type: "", desc: "" });
  const [image, setImage] = useState(null);

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleMakePost = () => {
    //check user
    var user = auth.currentUser;
    //if no user
    if (!user) {
      return;
    }

    //validate image size
    if (image != null) {
      console.log(image);
      if (image.size > 5000000) {
        console.log("image too large");
        //setError("Error: File too large");
        return;
      }
      //validate image filetype
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!acceptedImageTypes.includes(image.type)) {
        console.log("wrong file type:", image.type);
        //setError("Error: Not a JPG or PNG");
        return;
      }
    }
    //reset error on success
    //setError("");

    console.log("user: ", user.uid);
    //default filename (sticks if empty)
    var filename = "no_image_provided";
    if (image != null) {
      //old way
      //filename = image.name
      //need to npm install uuid
      filename = uuidv4();
    }
    const newDocRef = doc(collection(db, "test"));
    setDoc(newDocRef, {
      title: input.title,
      type: input.type,
      desc: input.desc,
      timestamp: serverTimestamp(),
      img: filename,
      usr: user.uid,
      //no likes for now
      likes: 0,
      id: newDocRef.id,
    });

    //clear field
    const descInput = document.getElementById("mainInput");
    descInput.value = "";

    //no image log
    if (image == null) {
      console.log("no image provided");
      return;
    }

    //size in bytes
    console.log("size:", image.size);

    //image type
    console.log("type:", image.type);

    //upload file
    const storage = getStorage();
    const imageRef = ref(storage, filename);
    uploadBytes(imageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      //clear field?
    });
  };

  return (
    <div className="Share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="/assets/user/guy_1.png"
            alt=""
          />
          <input
            id="mainInput"
            placeholder="What's in your mind?"
            className="shareInput"
            value={input.desc}
            onChange={(event) => handleChange("desc", event.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptio nText">Add photos</span>
            </div>
            <div className="shareOption">
              <AddCircleOutline htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Add activities</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Share feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleMakePost}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
