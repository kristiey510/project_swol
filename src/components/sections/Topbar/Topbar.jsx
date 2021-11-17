import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import Logo from "../../ui/Logo";
import { Search } from "@material-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuDivider,
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

const exit = async () => {
  try {
    await auth.signOut();
    alert("You are signed out.");
    window.location = "/";
  } catch (err) {
    console.log("err", err);
  }
};

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
          <MenuButton as={Button} colorScheme="transparent">
            <img
              id = "propic3"
              src=""
              alt="Just a dude"
              className="topbarImg"
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
