import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import Logo from "../../ui/Logo";
import { Search } from "@material-ui/icons";
import {
  auth,
  getStorage,
  ref,
  getDownloadURL,
} from "../../../firebase/firebase";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
} from "@chakra-ui/react";

export default function Topbar({ user }) {
  const exit = async () => {
    try {
      await auth.signOut();
      alert("You are signed out.");
      window.location = "/";
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    async function getPic() {
      const storage = getStorage();
      await getDownloadURL(ref(storage, user.Picture_id))
        .then((url) => {
          const img = document.getElementById("myimg");
          img.setAttribute("src", url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getPic();
  }, [user.Picture_id]);

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
            placeholder="Search for friends, posts, or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Menu>
          <MenuButton as={Button} colorScheme="transparent" w="55px" p="0">
            <Image ml="-7px" borderRadius="50%" h="40px" id="myimg" />
          </MenuButton>
          <MenuList bg="#FDEBD0" color="primary.2500" minW="150px" maxW="150px">
            <Link to="./profile">
              <MenuItem fontSize="sm" fontWeight="bold">
                Profile
              </MenuItem>
            </Link>
            <MenuItem fontSize="sm" fontWeight="bold" onClick={exit}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
