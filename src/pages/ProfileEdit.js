import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  HStack,
  Button,
  Editable,
  FormLabel,
  FormControl,
  Stack,
  Image,
  EditableInput,
  EditablePreview,
  IconButton,
  ButtonGroup,
  InputGroup,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Topbar from "../components/sections/Topbar/Topbar";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  db,
  updateDoc,
  auth,
  getDoc,
  getStorage,
  uploadBytes,
  ref,
  getDownloadURL,
  Auth,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
  deleteObject,
} from "../firebase/firebase";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

export default function ProfileEdit({ user }) {
  const [input, setInput] = useState({
    name: "",
    dob: "",
    gender: "",
    weight: "",
    height_in: "",
    height_ft: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [delPassword, setDelPassword] = useState("");
  const [error, setError] = useState({ deactivate: "", currPass: "", newPass: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deactivateAccount = async () => {
    let credential = Auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      delPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential).then(async function(){
      const storage = getStorage();
      const userAuth = auth.currentUser;
      async function deletePosts(querySnapshot) {
        querySnapshot.forEach(async (docSnap) => {
          if (docSnap?.data()?.img !== "no_image_provided") {
            //delete post images
            const imgRef = ref(storage, docSnap.data().img);
            await deleteObject(imgRef);
          }
          await deleteDoc(doc(db, "test", docSnap.id));
        });
      }

      //get posts
      const postsQuery = query(
        collection(db, "test"),
        where("usr", "==", user.uid)
      );
      const querySnapshot = await getDocs(postsQuery);

      //delete posts
      await deletePosts(querySnapshot);
      //get user doc
      const userRef = doc(db, "Profile", user.uid);
      if (user?.Picture_id !== "default.png") {
        //delete profile picture
        const proPicRef = ref(storage, user.Picture_id);
        await deleteObject(proPicRef);
      }
      //delete user doc
      await deleteDoc(userRef);

      //delete user
      try {
        await deleteUser(userAuth);
        window.location = "./";
      } catch (err) {}
    }).catch((error) =>{
      setError((prev) => ({
        ...prev,
        deactivate: error.code,
      }));
    });
    
  };

  useEffect(() => {
    async function getUser() {
      await getDoc(doc(db, "Profile", auth.currentUser.uid)).then(
        async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setInput({
              name: data.Name,
              email: data.Email,
              height_in: data.Height_In,
              height_ft: data.Height_Ft,
              gender: data.Gender,
              weight: data.Weight,
              dob: data.Dob,
            });
            const storage = getStorage();
            await getDownloadURL(ref(storage, data.Picture_id))
              .then((url) => {
                const img = document.getElementById("profile_pic");
                img.setAttribute("src", url);
              })
              .catch(() => {});
          }
        }
      );
    }
    getUser();
  }, []);

  function EditableControls({ isEditing, onSubmit, onEdit }) {
    return isEditing ? (
      <ButtonGroup px="8px" size="sm">
        <IconButton
          colorScheme="myblue"
          icon={<CheckIcon />}
          size="xs"
          onClick={onSubmit}
        />
      </ButtonGroup>
    ) : (
      <Flex px="15px" justify="left">
        <IconButton
          colorScheme="myblue"
          aria-label="Edit"
          size="xs"
          icon={<EditIcon />}
          onClick={onEdit}
        />
      </Flex>
    );
  }
  const handleChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleDelPass = (value) => {
    setDelPassword(value);
  };

  const handleNewPass = (name, value) => {
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const changePass = async () => {
    let credential = Auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password.old
    );
    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        if (password.new !== password.confirm) {
          setError((prev) => ({
            ...prev,
            newPass: "Make sure passwords match",
          }));
        } else if (password.new.length < 8) {
          setError((prev) => ({ ...prev, newPass: "Password too short" }));
        } else if (password.new === password.old) {
          setError((prev) => ({ ...prev, newPass: "Same as old password" }));
        } else {
          await updatePassword(auth.currentUser, password.new).then(
            async () => {
              setError((prev) => ({ ...prev, currPass: "" }));
              setError((prev) => ({ ...prev, newPass: "" }));
            }
          );
        }
      })
      .catch(async (error) => {
        setError((prev) => ({ ...prev, currPass: "Incorrect Password" }));
      });
  };

  const handleSubmit = async () => {
    await updateDoc(doc(db, "Profile", user.uid), {
      Name: input.name,
      Height_Ft: input.height_ft,
      Height_In: input.height_in,
      Gender: input.gender,
      Weight: input.weight,
    });
  };

  const handleUpload = async () => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    try {
      if (!acceptedImageTypes.includes(image.type)) {
        setError("Error: Not a JPG or PNG");
        setImage(null);
        return;
      }
    } catch (error) {
      setError(error);
    }
    var filename = uuidv4();
    const storage = getStorage();
    const imageRef = ref(storage, filename);
    if (user.Picture_id !== "default.png") {
      const proPicRef = ref(storage, user.Picture_id);
      await deleteObject(proPicRef);
    }
    await uploadBytes(imageRef, image);
    setImage(null);
    await updateDoc(doc(db, "Profile", auth.currentUser.uid), {
      Picture_id: filename,
    });
    window.location = "/profile";
  };

  const handleImage = async (event) => {
    setImage(event.target.files[0]);
  };

  const resetErrors = async () => {
    setError((prev) => ({...prev, deactivate: ""}));
    onClose();
  };

  return (
    <Flex direction="column" align="center" m="auto">
      <Topbar user={user} />
      <Flex direction="row" mt="50px" boxShadow="lg" borderRadius="lg">
        <Box
          maxW="sm"
          borderRadius="lg"
          bg="#E3EEF9"
          overflow="hidden"
          mr="70px"
          w="250px"
          boxShadow="lg"
          border="3px"
        >
          <Image
            id="profile_pic"
            h="200px"
            w="200px"
            borderRadius="lg"
            mt="20px"
            ml="25px"
          />
          <Box p="4">
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                Username:
              </Box>
            </Box>
            <Text fontSize="sm">{input.name}</Text>
            <Box
              mt="10px"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              Date of Birth:
            </Box>
            <Text fontSize="sm">{input.dob}</Text>
            <Box
              mt="10px"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
            >
              Email:
            </Box>
            <Text fontSize="sm">{input.email}</Text>
            <FormControl>
              <Flex direction="column" align="center">
                <FormLabel
                  mt="30px"
                  ml="10px"
                  px="3"
                  py="2"
                  bg="primary.3200"
                  color="white"
                  borderRadius="10px"
                  size="md"
                  htmlFor="getFile"
                  type="button"
                  fontWeight="bold"
                  fontSize="9pt"
                  variant="outline"
                >
                  {image ? "Choose another" : " Select Profile Picture"}
                </FormLabel>
                {image && (
                  <Button
                    size="md"
                    mt="5px"
                    bg="primary.3200"
                    color="white"
                    borderRadius="10px"
                    p="2"
                    type="button"
                    fontWeight="bold"
                    fontSize="8pt"
                    variant="outline"
                    onClick={handleUpload}
                  >
                    Upload {image.name}
                  </Button>
                )}
                <Box>
                  <Button
                    mt="10px"
                    variant="link"
                    color="red"
                    fontSize="xs"
                    onClick={onOpen}
                  >
                    Deactivate Account
                  </Button>
                </Box>
              </Flex>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color="primary.2350">
                    Deactivate Account
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to delete your account?
                    <Input
                      mt = "20px"
                      mb = "5px"
                      w="300px"
                      placeholder="Type in your password to confirm"
                      size="sm"
                      type="password"
                      onChange={(event) => handleDelPass(event.target.value)}
                    />
                    <Text color = "red" fontSize = "xs"> 
                    {""}
                    {error.deactivate} {""}
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      bg="primary.3200"
                      color="primary.150"
                      fontWeight="bold"
                      fontSize="16"
                      onClick={resetErrors}
                    >
                      Back
                    </Button>
                    <Button
                      ml="5"
                      variant="ghost"
                      bg="primary.3200"
                      color="primary.150"
                      fontWeight="bold"
                      fontSize="16"
                      onClick={deactivateAccount}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Input
                border="transparent"
                type="file"
                color="red"
                onChange={handleImage}
                id="getFile"
                style={{ display: "none" }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box rounded={"xl"} w="680px" h="600">
          <Heading
            fontSize="20pt"
            mt="25px"
            align="center"
            color="primary.2350"
            textTransform="uppercase"
            fontWeight="bold"
          >
            Profile
          </Heading>
          <HStack align="space-between" mt="10px">
            <Stack>
              <Heading
                fontSize="11pt"
                mt="20px"
                align="left"
                color="primary.2350"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Personal Info
              </Heading>
              <InputGroup py="5px">
                <FormLabel mt="5px" fontSize="10pt" w="125px">
                  Height (Feet):
                </FormLabel>
                <Editable
                  fontSize="sm"
                  value={input.height_ft}
                  isPreviewFocusable={false}
                  onChange={(nextValue) => handleChange("height_ft", nextValue)}
                  onSubmit={handleSubmit}
                  color="orange.400"
                  fontWeight="bold"
                >
                  {(props) => (
                    <HStack>
                      <EditablePreview
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableInput
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableControls {...props} />
                    </HStack>
                  )}
                </Editable>
              </InputGroup>
              <InputGroup py="5px">
                <FormLabel mt="5px" fontSize="10pt" w="125px">
                  Height (Inches):
                </FormLabel>
                <Editable
                  fontSize="sm"
                  value={input.height_in}
                  isPreviewFocusable={false}
                  onChange={(nextValue) => handleChange("height_in", nextValue)}
                  onSubmit={handleSubmit}
                  color="orange.400"
                  fontWeight="bold"
                >
                  {(props) => (
                    <HStack>
                      <EditablePreview
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableInput
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableControls {...props} />
                    </HStack>
                  )}
                </Editable>
              </InputGroup>
              <InputGroup py="5px">
                <FormLabel mt="5px" fontSize="10pt" w="125px">
                  Weight (lbs):
                </FormLabel>
                <Editable
                  fontSize="sm"
                  value={input.weight}
                  isPreviewFocusable={false}
                  onChange={(nextValue) => handleChange("weight", nextValue)}
                  onSubmit={handleSubmit}
                  color="orange.400"
                  fontWeight="bold"
                >
                  {(props) => (
                    <HStack>
                      <EditablePreview
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableInput
                        textAlign="center"
                        minW="100px"
                        maxW="100px"
                        minH="25px"
                        maxH="25px"
                      />
                      <EditableControls {...props} />
                    </HStack>
                  )}
                </Editable>
              </InputGroup>
              <InputGroup py="5px">
                <FormLabel mt="5px" fontSize="10pt" w="125px">
                  Gender:
                </FormLabel>
                <Select
                  w="100px"
                  fontSize="sm"
                  h="25px"
                  value={input.gender}
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
                <IconButton
                  ml="39px"
                  colorScheme="myblue"
                  aria-label="Edit"
                  size="xs"
                  icon={<CheckIcon />}
                  onClick={handleSubmit}
                />
              </InputGroup>
            </Stack>
            <Stack px="50px">
              <Heading
                fontSize="11pt"
                mt="20px"
                align="left"
                color="primary.2350"
                textTransform="uppercase"
                fontWeight="bold"
              >
                Settings
              </Heading>
              <FormLabel py="5px" fontSize="9pt">
                Old Password:
              </FormLabel>
              <Input
                w="200px"
                placeholder="Type in old password"
                size="xs"
                type="password"
                onChange={(event) => handleNewPass("old", event.target.value)}
              />
              <Text align="center" fontSize="xs" color="red">
                {error.currPass}
              </Text>
              <FormLabel py="5px" fontSize="9pt">
                New Password:
              </FormLabel>
              <Input
                placeholder="New password"
                size="xs"
                type="password"
                onChange={(event) => handleNewPass("new", event.target.value)}
              />
              <FormLabel py="5px" fontSize="9pt">
                Confirm New Password:
              </FormLabel>
              <Input
                type="password"
                placeholder="Retype new password"
                size="xs"
                onChange={(event) =>
                  handleNewPass("confirm", event.target.value)
                }
              />
              <Text align="center" fontSize="xs" color="red">
                {error.newPass}
              </Text>
              <Box>
                <Button
                  ml="30px"
                  mt="15px"
                  size="xs"
                  w="125px"
                  bg="primary.3200"
                  color="primary.150"
                  onClick={changePass}
                >
                  Change Password
                </Button>
              </Box>
            </Stack>
          </HStack>
          <Link to="/dashboard">
            <Button
              ml="250px"
              mt="60px"
              bg="primary.3200"
              color="primary.150"
              fontWeight="bold"
              fontSize="13"
            >
              Save Changes
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
