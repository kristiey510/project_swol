import React, { useState, useEffect } from "react";
import "./Share.css";
import PropTypes from "prop-types";
import { PermMedia, EmojiEmotions, AddCircleOutline, AccessTime } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Button,
  Box,
  Select,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
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
  getDoc,
  getDownloadURL
} from "../../../firebase/firebase";

export default function Share({user}) {
  const [input, setInput] = useState({ title: "", type: "", desc: "" });
  const [image, setImage] = useState(null);
  const [Error, setError] = useState("");
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isTypeOpen , onOpen: onTypeOpen, onClose: onTypeClose } = useDisclosure()
  const { isOpen: isPhotoOpen , onOpen: onPhotoOpen, onClose: onPhotoClose } = useDisclosure()

  const handleImage = () => {
    console.log(image)
    if (image != null) {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      console.log(image);
      if (image.size > 5000000) {
        console.log("image too large");
        setError("Error: File too large");
        setImage(null);
        console.log(image);
        return;
      }
      //validate image filetype
      else if (!acceptedImageTypes.includes(image.type)) {
        console.log("wrong file type:", image.type);
        setError("Error: Not a JPG or PNG");
        setImage(null)
        console.log(image);
        return;
      }
      else {
        setError("")
        console.log(image);
        return;
      }
    }
    else{
      setError("Error: No Image Selected");
      setImage(null)
      console.log(image);
      return;
    }
  }


  useEffect(async () => {
    await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
      //console.log("doc: ",docSnap.data())
      if (docSnap.data().img !== "no_image_provided") {

        const data = docSnap.data();

        //console.log("image", data);

        const img = document.getElementById("profilePicture");
        //console.log(img);
        //get image ref
        const storage = getStorage();
        const pathReference = ref(storage, data.Picture_id);

        //download, then set attribute to image tag in file
        getDownloadURL(pathReference).then((url) => {
          img.setAttribute("src", url);
        });

      }
    });
  }, []);

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
      type: input.type,
    });

    //clear field
    const descInput = document.getElementById("mainInput");
    descInput.value = "";
    const typeInput = document.getElementById("dropdown");
    typeInput.value = "";
    setInput({ title: "", type: "", desc: "" })

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
            id = "profilePicture"
            className="shareProfileImg"
            src=""
            alt=""
          />
          <input
            id="mainInput"
            placeholder="Today's Workout"
            className="shareInput"
            value={input.desc}
            onChange={(event) => handleChange("desc", event.target.value)}
          />
        </div>
        <br/>
        <Select 
              variant="filled" 
              placeholder="Select Exercise" 
              id = "dropdown"
              onChange={(event) => handleChange("type", event.target.value)}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
        <hr className="shareHr" />
        
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span 
              className="shareOptionText"
              onClick = {onPhotoOpen}>
                Add Photo</span>
            </div>
            <div className="shareOption">
              <AddCircleOutline htmlColor="goldenrod" className="shareIcon" />
              <span 
                className="shareOptionText"
                onClick = {onTypeOpen}>
                  Choose Activity</span>
            </div>
            <div className="shareOption">
              <AccessTime htmlColor="black" className="shareIcon" />
              <span className="shareOptionText">Workout Duration/Reps</span>
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

      <Modal  isOpen={isTypeOpen} onClose={onTypeClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader color="primary.2350">Exercise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box >
            <Select 
              variant="filled" 
              placeholder="Select Exercise" 
              id = "dropdown"
              onChange={(event) => handleChange("type", event.target.value)}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
              onClick={onTypeClose}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal  isOpen={isPhotoOpen} onClose={onPhotoClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader color="primary.2350">Exercise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box >
            <input
            type="file"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
            </Box>
          </ModalBody>
          <ModalFooter>
          <HStack>
          <Text color="red" textAlign="center">
            {Error}
          </Text>
          <Button
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
              onClick={handleImage}
            >
              Upload
            </Button>
            <Button
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="16"
              onClick={onPhotoClose}
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

Share.propTypes = {
  Error: PropTypes.string,
};

Share.defaultProps = {
  Error: "",
};
