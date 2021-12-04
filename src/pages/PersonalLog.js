import React, { useState, useEffect, useRef, useCallback } from "react";
import { Flex, Box, Spinner, Text, Button } from "@chakra-ui/react";
import Topbar from "../components/sections/Topbar/Topbar";
import Sidebar from "../components/sections/Sidebar/Sidebar";
import Post from "../components/sections/Post/Post";
import {
  getStorage,
  query,
  ref,
  getDownloadURL,
  startAfter,
  orderBy,
  limit,
  collection,
  where,
  db,
  getDocs,
} from "../firebase/firebase";
import "./PersonalLog.css";

export default function PersonalLog({ user }) {
  const [fetching, setFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [profile, setProfile] = useState({});
  const observer = useRef();
  const QUERY_LIMIT = 10;

  const transformData = (snap) => {
    const posts = [];
    snap.forEach((post) => posts.push({ ...post.data() }));
    return posts;
  };

  const fetchMorePosts = useCallback(async () => {
    setFetching(true);
    const postQuery = query(
      collection(db, "test"),
      where("usr", "==", user?.uid),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(QUERY_LIMIT)
    );
    const querySnapshot = await getDocs(postQuery);
    if (querySnapshot.docs.length < QUERY_LIMIT) setFetchedAll(true);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    const next = transformData(querySnapshot);
    setPosts((prev) => prev.concat(next));
    setFetching(false);
  }, [user?.uid, lastVisible]);

  const lastPostRef = useCallback(
    (node) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !fetchedAll) {
          fetchMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetching, fetchedAll, fetchMorePosts]
  );

  useEffect(() => {
    async function fetchProfile() {
      const storage = getStorage();
      const downloadURL = await getDownloadURL(ref(storage, user.Picture_id));
      setProfile({
        [user.uid]: {
          username: user.Name,
          propic: downloadURL,
          feet: user.Height_Ft,
          inches: user.Height_In,
          weight: user.Weight,
        },
      });
    }
    async function fetchPosts() {
      const postQuery = query(
        collection(db, "test"),
        where("usr", "==", user?.uid),
        orderBy("timestamp", "desc"),
        limit(QUERY_LIMIT)
      );
      const querySnapshot = await getDocs(postQuery);
      if (querySnapshot.docs.length < QUERY_LIMIT) setFetchedAll(true);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setPosts(transformData(querySnapshot));
    }
    user?.uid &&
      Promise.all([fetchProfile(), fetchPosts()]).then(() => {
        setFetching(false);
      });
  }, [
    user.Height_Ft,
    user.Height_In,
    user.Name,
    user.Picture_id,
    user.Weight,
    user.uid,
  ]);

  return (
    <Flex width="100%" direction="column">
      <Topbar user={user} />
      <Flex direction="row">
        <Box width="370px">
          <Sidebar user={user} />
        </Box>
        <div className="Log">
          <div className="logWrapper">
            {posts.map((post, index) => {
              if (index + 1 === posts.length) {
                return (
                  <div ref={lastPostRef} key={index}>
                    <Post
                      post={post}
                      user={user}
                      profiles={profile}
                      setPosts={setPosts}
                    />
                  </div>
                );
              } else {
                return (
                  <Post
                    key={index}
                    post={post}
                    user={user}
                    profiles={profile}
                    setPosts={setPosts}
                  />
                );
              }
            })}
            {!fetchedAll ? (
              <Flex justify="space-around" mt="25px">
                {fetching ? (
                  <Spinner />
                ) : (
                  <Button onClick={fetchMorePosts}>Load more posts</Button>
                )}
              </Flex>
            ) : (
              <Flex justify="space-around" mt="25px">
                {posts.length ? (
                  <Text fontSize="sm" color="gray.400">
                    All posts loaded!
                  </Text>
                ) : (
                  <Text fontSize="sm" color="gray.400">
                    Your own posts will appear here!
                  </Text>
                )}
              </Flex>
            )}
          </div>
        </div>
      </Flex>
    </Flex>
  );
}
