import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calories } from "../../utils/calories";
import { Text, Box } from "@chakra-ui/react";
import {
  Timestamp,
  db,
  query,
  collection,
  where,
  getDocs,
} from "../../firebase/firebase";

export default function Graph({ user }) {
  const [data, setData] = useState([
    { day: 6, calories: 0 },
    { day: 5, calories: 0 },
    { day: 4, calories: 0 },
    { day: 3, calories: 0 },
    { day: 2, calories: 0 },
    { day: 1, calories: 0 },
    { day: 0, calories: 0 },
  ]);

  useEffect(() => {
    async function fetchPosts() {
      setData([
        { day: 6, calories: 0 },
        { day: 5, calories: 0 },
        { day: 4, calories: 0 },
        { day: 3, calories: 0 },
        { day: 2, calories: 0 },
        { day: 1, calories: 0 },
        { day: 0, calories: 0 },
      ]);
      let weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoUnix = Math.round(weekAgo.getTime() / 1000);
      const weekAgoTS = Timestamp.fromDate(weekAgo);
      const postQuery = query(
        collection(db, "test"),
        where("usr", "==", user?.uid),
        where("timestamp", ">=", weekAgoTS)
      );
      const querySnapshot = await getDocs(postQuery);
      querySnapshot.forEach((docSnap) => {
        setData((prev) => {
          let updated = prev;
          const index = Math.floor(
            (docSnap.data().timestamp.seconds - weekAgoUnix) / 86400
          );
          updated[index].calories += calories(
            docSnap.data()?.type,
            Number(user?.Height_Ft),
            Number(user?.Height_In),
            Number(user?.Weight),
            docSnap.data()?.scale,
            docSnap.data()?.quantity
          );
          return updated;
        });
      });
    }
    user?.uid && fetchPosts();
  }, [user?.Height_Ft, user?.Height_In, user?.Weight, user?.uid]);

  return (
    <Box align="center">
      <Text ml="15px" mb="25px">
        Calorie trend for past week
      </Text>
      <ResponsiveContainer width="100%" aspect={1}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#FFC494"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <Text ml="15px">Days ago</Text>
    </Box>
  );
}
