import React, { useState, useEffect } from "react";
import "./Share.css";
import PropTypes from "prop-types";
import {
  PermMedia,
  EmojiEmotions,
  AddCircleOutline,
  AccessTime,
} from "@material-ui/icons";
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
  Button,
  Box,
  Select,
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
  getDownloadURL,
} from "../../../firebase/firebase";

export default function Share({ user }) {
  const [input, setInput] = useState({ title: "", type: "", desc: "" });
  const [image, setImage] = useState(null);
  const [Error, setError] = useState("");
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTypeOpen,
    onOpen: onTypeOpen,
    onClose: onTypeClose,
  } = useDisclosure();
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onClose: onPhotoClose,
  } = useDisclosure();

  const handleImage = () => {
    if (image != null) {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (image.size > 5000000) {
        setError("Error: File too large");
        setImage(null);
        return;
      }
      //validate image filetype
      else if (!acceptedImageTypes.includes(image.type)) {
        setError("Error: Not a JPG or PNG");
        setImage(null);
        return;
      } else {
        setError("");
        return;
      }
    } else {
      setError("Error: No Image Selected");
      setImage(null);
      return;
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
        if (docSnap.data().img !== "no_image_provided") {
          const data = docSnap.data();

          const img = document.getElementById("profilePicture");
          //get image ref
          const storage = getStorage();
          const pathReference = ref(storage, data.Picture_id);

          //download, then set attribute to image tag in file
          getDownloadURL(pathReference).then((url) => {
            img.setAttribute("src", url);
          });
        }
      });
    }
    fetchProfile();
  }, [user.uid]);

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

    if (input.type === "") {
      alert("Please select an exercise");
      //setError("Please select an exercise")
      return;
    }

    //validate image size
    if (image != null) {
      if (image.size > 5000000) {
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

    //default filename (sticks if empty)
    var filename = "no_image_provided";
    if (image != null) {
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
    const typeInput = document.getElementById("dropdown");
    typeInput.value = "";
    setInput({ title: "", type: "", desc: "" });

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
          <img id="profilePicture" className="shareProfileImg" src="" alt="" />
          <input
            id="mainInput"
            placeholder="Today's Workout"
            className="shareInput"
            value={input.desc}
            onChange={(event) => handleChange("desc", event.target.value)}
          />
        </div>
        <br />
        <Select
          variant="filled"
          placeholder="Select Exercise"
          id="dropdown"
          onChange={(event) => handleChange("type", event.target.value)}
        >
          <option disabled>Cardio</option>
          <option value="Running">&nbsp;&nbsp;&nbsp;&nbsp;Running</option>
          <option value="Biking">&nbsp;&nbsp;&nbsp;&nbsp;Biking</option>
          <option value="Elliptical">&nbsp;&nbsp;&nbsp;&nbsp;Elliptical</option>
          <option value="Stair climber">
            &nbsp;&nbsp;&nbsp;&nbsp;Stair climber
          </option>

          <option disabled>Calisthetics</option>
          <option value="Push up">&nbsp;&nbsp;&nbsp;&nbsp;Push up</option>
          <option value="Pull up/chin up">
            &nbsp;&nbsp;&nbsp;&nbsp;Pull up/chin up
          </option>
          <option value="Sit up/crunch">
            &nbsp;&nbsp;&nbsp;&nbsp;Sit up/crunch
          </option>
          <option value="Plank">&nbsp;&nbsp;&nbsp;&nbsp;Plank</option>

          <option disabled>Powerlifting</option>
          <option value="Bench">&nbsp;&nbsp;&nbsp;&nbsp;Bench</option>
          <option value="Squat">&nbsp;&nbsp;&nbsp;&nbsp;Squat</option>
          <option value="Deadlift">&nbsp;&nbsp;&nbsp;&nbsp;Deadlift</option>

          <option disabled>Olympic weightlifting</option>
          <option value="Hang clean">&nbsp;&nbsp;&nbsp;&nbsp;Hang clean</option>
          <option value="Clean and jerk">
            &nbsp;&nbsp;&nbsp;&nbsp;Clean and jerk
          </option>
          <option value="Snatch">&nbsp;&nbsp;&nbsp;&nbsp;Snatch</option>

          <option disabled>General</option>
          <option value="Bicep curl">&nbsp;&nbsp;&nbsp;&nbsp;Bicep curl</option>
          <option value="Rows">&nbsp;&nbsp;&nbsp;&nbsp;Rows</option>
          <option value="Shoulder press">
            &nbsp;&nbsp;&nbsp;&nbsp;Shoulder press
          </option>
          <option value="Shoulder raise">
            &nbsp;&nbsp;&nbsp;&nbsp;Shoulder raises
          </option>
          <option value="Shrugs">&nbsp;&nbsp;&nbsp;&nbsp;Shrugs</option>
          <option value="Lunges">&nbsp;&nbsp;&nbsp;&nbsp;Lunges</option>
        </Select>
        <hr className="shareHr" />

        {/* <Text color="red" textAlign="center">
            {Error}
        </Text> */}

        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText" onClick={onPhotoOpen}>
                Add Photo
              </span>
            </div>
            <div className="shareOption">
              <AddCircleOutline htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText" onClick={onTypeOpen}>
                Choose Activity
              </span>
            </div>
            <div className="shareOption">
              <AccessTime htmlColor="black" className="shareIcon" />
              <span className="shareOptionText">Workout Details</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleMakePost}>
            Share
          </button>
        </div>
      </div>

      <Modal isOpen={isPhotoOpen} onClose={onPhotoClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primary.2350">Add Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
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
