import React, { useState, useEffect, useRef, useCallback } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import {
  doc,
  db,
  collection,
  getStorage,
  getDoc,
  getDownloadURL,
  query,
  where,
  ref,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "../../../firebase/firebase";
import { Button, Flex, Text } from "@chakra-ui/react";

export default function Feed({ user }) {
  const [fetching, setFetching] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [profiles, setProfiles] = useState({});
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
      where("usr", "in", user?.following),
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
  }, [user?.following, lastVisible]);

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
    async function fetchProfiles() {
      const storage = getStorage();
      await user?.following.forEach(async (followed) => {
        const profile = await getDoc(doc(db, "Profile", followed));
        if (profile.data()) {
          const downloadURL = await getDownloadURL(
            ref(storage, profile.data().Picture_id)
          );
          setProfiles((prev) => ({
            ...prev,
            [followed]: { username: profile.data().Name, propic: downloadURL },
          }));
        } else {
          const downloadURL = await getDownloadURL(ref(storage, "default.png"));
          setProfiles((prev) => ({
            ...prev,
            [followed]: { username: "[deleted user]", propic: downloadURL },
          }));
        }
      });
    }
    async function fetchPosts() {
      const postQuery = query(
        collection(db, "test"),
        where("usr", "in", user?.following),
        orderBy("timestamp", "desc"),
        limit(QUERY_LIMIT)
      );
      const querySnapshot = await getDocs(postQuery);
      if (querySnapshot.docs.length < QUERY_LIMIT) setFetchedAll(true);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setPosts(transformData(querySnapshot));
    }
    if (user?.following?.length) {
      Promise.all([fetchProfiles(), fetchPosts()]).then(() => {
        setFetching(false);
      });
    }
  }, [user.following]);

  return (
    <div className="Feed">
      <div className="feedWrapper">
        <Share user={user} setPosts={setPosts} />
        {posts.map((post, index) => {
          if (index + 1 === posts.length) {
            return (
              <div ref={lastPostRef} key={index}>
                <Post
                  post={post}
                  user={user}
                  profiles={profiles}
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
                profiles={profiles}
                setPosts={setPosts}
              />
            );
          }
        })}
        {!fetchedAll ? (
          <Flex justify="space-around" mt="25px">
            {fetching ? (
              <Button>Loading more...</Button>
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
                Create a post or follow someone to get started!
              </Text>
            )}
          </Flex>
        )}
      </div>
    </div>
  );
}
