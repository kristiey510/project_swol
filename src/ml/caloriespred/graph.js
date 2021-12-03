import {
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "../../firebase/firebase.js";
import { calories } from "../../utils/calories.js";
import pkg from "nodeplotlib";
const { plot } = pkg;

function findDate(dayNum) {
  let ts = Date.now();
  let today = new Date(ts);
  let year = parseInt(today.getFullYear(), 10);
  //console.log(year);
  let month = parseInt(today.getMonth(), 10);
  //console.log(month);
  let day = parseInt(today.getDate(), 10);
  //console.log(day);
  var target;
  if (day < dayNum) {
    var month31 = [1, 2, 4, 6, 8, 9, 11];
    var month30 = [5, 7, 12, 10];
    if ((month === 3) & (year % 4 !== 0)) {
      day = 28 + day - dayNum;
    }
    if ((month === 3) & (year % 4 === 0)) {
      day = 29 + day - dayNum;
    }
    if (month31.includes(month)) {
      day = 31 + day - dayNum;
    }
    if (month30.includes(month)) {
      day = 30 + day - dayNum;
    }

    if (month === 1) {
      year = year - 1;
      month = 12;
    } else {
      month = month - 1;
    }
    target = new Date(year, month, day);
  } else {
    target = new Date(year, month, day - dayNum);
  }
  return target;
}

(async () => {
  let target = findDate(7);
  let example = "mB5XHvaZcZh5LANwEAwmUTAXMik1";

  // const post = await getDoc(doc(db, "test", example));

  const postQuery = query(
    collection(db, "test"),
    where("usr", "==", example),
    where("timestamp", ">=", target)
  );
  let records = [];

  getDocs(postQuery).then((querySnapshot) => {
    querySnapshot.forEach((activity) => {
      let post = activity.data();
      let uid = post["usr"];
      const docSnap = getDoc(doc(db, "Profile", uid));
      let user = docSnap.data();
      records.push({
        calories: calories(
          post["type"],
          Number(user["Height_Ft"]),
          Number(user["Height_In"]),
          Number(user["Weight"]),
          post["scale"],
          post["quantity"]
        ),
        date: post["timestamp"],
      });
    });
  });
  //console.log(records);
  let sortedRecord = {};
  for (let i = 0; i < records.length; i++) {
    let tem = records[i]["date"];
    let user_day = new Date(tem.getFullYear(), tem.getMonth(), tem.getDate());
    if (sortedRecord[user_day] != null) {
      sortedRecord[user_day] += sortedRecord[i]["calories"]; // in case one day has done many activities, default is not zero
    } else {
      sortedRecord[user_day] = sortedRecord[i]["calories"];
    }
    break;
  }

  let record = [];
  // fill out the missing days
  for (let i = 7; i >= 1; i++) {
    let one_day = findDate(i);
    if (sortedRecord[one_day] == null) {
      sortedRecord[one_day] = 0;
    }
    record.push(sortedRecord[one_day]);
  }

  //console.log('here');

  const week = [1, 2, 3, 4, 5, 6, 7];
  const trace2 = { x: week, y: record, type: "scatter" };
  plot([trace2]);
})();
