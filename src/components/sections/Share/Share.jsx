import React, { useState, useEffect } from "react";
import "./Share.css";
import PropTypes from "prop-types";
import { PermMedia } from "@material-ui/icons";
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
  Flex,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from "@chakra-ui/react";
import {
  doc,
  setDoc,
  updateDoc,
  db,
  collection,
  serverTimestamp,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../../firebase/firebase";
import { exerciseUnits } from "../../../utils/exercises";

export default function Share({ user, setPosts }) {
  const [input, setInput] = useState({
    title: "",
    type: "",
    desc: "",
    scale: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");
  const [profilepic, setProPic] = useState(null);
  const [Error, setError] = useState("");
  const [inputHeight, setInputHeight] = useState(1);
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onClose: onPhotoClose,
  } = useDisclosure();
  const CACHE_SIZE = 5;
  const bodyWtExercises = [
    "Plank",
    "Pull up/chin up",
    "Sit up/crunch",
    "Push up",
  ];

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
        setFilename(image?.name);
        onPhotoClose();
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
      const img = document.getElementById("profilePicture");
      //get image ref
      const storage = getStorage();
      const pathReference = ref(storage, user.Picture_id);

      //download, then set attribute to image tag in file
      getDownloadURL(pathReference).then((url) => {
        img.setAttribute("src", url);
        setProPic(url);
      });
    }
    fetchProfile();
  }, [user.Picture_id]);

  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const onChange = (event) => {
    setInputHeight(`${event.target.scrollHeight}px`);
    handleChange("desc", event.target.value);
  };

  const handleMakePost = () => {
    if (!user) {
      return;
    }

    if (input.type === "") {
      // alert("Please select an exercise");
      setError("Please select an exercise");
      return;
    } else if (bodyWtExercises.includes(input.type)) {
      if (input.quantity === "") {
        setError("Please enter exercise details");
        return;
      }
    } else if (input.scale === "" || input.quantity === "") {
      setError("Please enter exercise details");
      return;
    }

    //validate image size
    if (image != null) {
      if (image.size > 5000000) {
        setError("Error: File too large");
        return;
      }
      //validate image filetype
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!acceptedImageTypes.includes(image.type)) {
        console.log("wrong file type:", image.type);
        setError("Error: Not a JPG or PNG");
        return;
      }
    }
    //reset error on success
    setError("");

    //default filename (sticks if empty)
    var filename = "no_image_provided";
    if (image != null) {
      filename = uuidv4();
    }

    var updatedCache = user.cache;
    updatedCache.unshift(input.type);
    if (updatedCache.length > CACHE_SIZE) updatedCache.pop();

    const newDocRef = doc(collection(db, "test"));
    const userDocRef = doc(db, "Profile", user.uid);
    Promise.all([
      setDoc(newDocRef, {
        title: input.title,
        type: input.type,
        desc: input.desc,
        scale: Number(input.scale),
        quantity: Number(input.quantity),
        timestamp: serverTimestamp(),
        img: filename,
        usr: user.uid,
        likes: 0,
        id: newDocRef.id,
        comments: [],
        likers: [],
      }),
      updateDoc(userDocRef, {
        cache: updatedCache,
      }),
    ]);

    setPosts((prev) => [
      {
        title: input.title,
        type: input.type,
        desc: input.desc,
        scale: Number(input.scale),
        quantity: Number(input.quantity),
        propic: profilepic,
        usr: user.uid,
        timestamp: "just now",
        likes: 0,
        username: user.Name,
        id: newDocRef.id,
        comments: [],
        likers: [],
      },
      ...prev,
    ]);

    //clear field
    const descInput = document.getElementById("mainInput");
    descInput.value = "";
    const typeInput = document.getElementById("dropdown");
    typeInput.value = "";
    setInput({ title: "", type: "", desc: "" });

    //no image log
    if (image == null) {
      setError("Image upload error");
      return;
    } else {
      //upload file
      const storage = getStorage();
      const imageRef = ref(storage, filename);
      uploadBytes(imageRef, image);
    }
  };

  return (
    <div className="Share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img id="profilePicture" className="shareProfileImg" src="" alt="" />
          <Textarea
            id="mainInput"
            placeholder="Today's Workout"
            border="none"
            focusBorderColor="none"
            height={inputHeight}
            resize="none"
            rows="1"
            minH="40px"
            maxLength={300}
            value={input.desc}
            onChange={onChange}
          />
        </div>
        <Flex justify="flex-end" m="2px">
          <Text
            fontSize="xs"
            color="gray.300"
          >{`${input.desc.length}/300`}</Text>
        </Flex>
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

        {input.type && (
          <Flex mt="10px" justify="center" align="center">
            {exerciseUnits[input.type].scale && (
              <>
                <NumberInput
                  min={0}
                  step={1}
                  value={input.scale}
                  onChange={(str) => handleChange("scale", str)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text ml="5px" mr="5px">
                  {exerciseUnits[input.type].scale}
                </Text>
              </>
            )}
            <NumberInput
              min={0}
              step={1}
              value={input.quantity}
              onChange={(str) => handleChange("quantity", str)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text ml="5px" mr="5px">
              {exerciseUnits[input.type].quantity}
            </Text>
          </Flex>
        )}

        <hr className="shareHr" />

        <Text color="red" textAlign="center">
          {Error}
        </Text>

        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText" onClick={onPhotoOpen}>
                Add Photo
              </span>
            </div>
            {filename && <span className="shareOptionText">{filename}</span>}
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
