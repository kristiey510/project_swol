<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, {useEffect} from "react";
>>>>>>> bffcab197ae2ba3e2b1573caf04af3af0083b2ca
import { Link } from "react-router-dom";
import "./Topbar.css";
import Logo from "../../ui/Logo";
import { Search } from "@material-ui/icons";
<<<<<<< HEAD
import { 
  doc,
  db,
  updateDoc,
  auth,
  getDoc,
  getStorage,
  ref,
  getDownloadURL,
} from "../../../firebase/firebase";
=======
>>>>>>> bffcab197ae2ba3e2b1573caf04af3af0083b2ca
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
  Image
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

export default function Topbar() {
  const exit = async () => {
  try {
    await auth.signOut();
    alert("You are signed out.");
    window.location = "/";
  } catch (err) {
    console.log("err", err);
  }
};

<<<<<<< HEAD
const [image, setImage] = useState(null);

 useEffect(() => {
    async function getPic(){
      await getDoc(doc(db, "Profile", auth.currentUser.uid)).then(
        async (docSnap) => {
          const data = docSnap.data();
          if (docSnap.exists()) {
            const storage = getStorage();
            await getDownloadURL(ref(storage, data.Picture_id))
              .then((url) => {
                const img = document.getElementById("myimg");
                img.setAttribute("src", url);
              })
              .catch((error) => {
                console.log(error);
              });
            console.log("Image set");
          }
        }
      );
    }
    getPic();
  }, []);

=======
export default function Topbar({user}) {

  useEffect(async () => {
    await getDoc(doc(db, "Profile", user.uid)).then(async (docSnap) => {
      //console.log("doc: ",docSnap.data())
      if (docSnap.data().img !== "no_image_provided") {

        const data = docSnap.data();

        //console.log("image", data);

        const img = document.getElementById("propic3");
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




>>>>>>> bffcab197ae2ba3e2b1573caf04af3af0083b2ca
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="./dashboard">
          <Logo />
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends, post, or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Menu>
<<<<<<< HEAD
          <MenuButton as={Button} colorScheme="transparent" w = "50px" p = "0" pl = "5px">
            <Image
              borderRadius = "50%"
              w = "40px"
              h = "40px"
              id = "myimg" 
=======
          <MenuButton as={Button} colorScheme="transparent">
            <img
              id = "propic3"
              src=""
              alt="Just a dude"
              className="topbarImg"
>>>>>>> bffcab197ae2ba3e2b1573caf04af3af0083b2ca
            />
          </MenuButton>
          <MenuList bg="#FDEBD0" color="primary.2500" minW="150px" maxW="150px">
            <Link to="./profile">
              <MenuItem fontSize = "sm" fontWeight="bold">Profile</MenuItem>
            </Link>
            <MenuItem fontSize = "sm" fontWeight="bold" onClick={exit}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
