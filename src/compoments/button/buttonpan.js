import "../button/button.css";
import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "../../config";
var check = false;
var tmplight = false;

// Khởi tạo kết nối Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function ButtonPan() {
  // Đọc đèn có sáng không
  const [led, setLed] = useState([]);
  // Đọc quạt có bật không
  const [pan, setPan] = useState([]);
  // Đọc số người
  const [people, setPeople] = useState([]);
  // Đọc số button
  const [btn, setBtn] = useState([]);

  useEffect(() => {
    const messagesRef3 = database.ref("messages/checkled");
    const messagesRef4 = database.ref("messages/checkpan");
    const messagesRef2 = database.ref("messages/people");
    const messagesRef1 = database.ref("messages/buttonst");

    messagesRef1.on("value", (snapshot) => {
      const data1 = snapshot.val();
      if (data1) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setBtn(data1);
      }
    });

    messagesRef2.on("value", (snapshot) => {
      const data2 = snapshot.val();
      if (data2) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setPeople(data2);
      }
    });
    messagesRef3.on("value", (snapshot) => {
      const data3 = snapshot.val();
      if (data3) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setLed(data3);
      }
    });
    messagesRef4.on("value", (snapshot) => {
      const data4 = snapshot.val();
      if (data4) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setPan(data4);
      }
    });

    // Hủy lắng nghe khi component unmount
    return () => {
      messagesRef3.off();
      messagesRef4.off();
    };
  }, []);
  // Điều khiển đèn
  const [light, setLight] = useState(tmplight);

  const [isHighlighted, setIsHighlighted] = useState(check);

  const handleClick = () => {
    check = !check;
    setIsHighlighted(check);
  };

  if (check === true) {
    // Gửi dữ liệu lên firebase
    const messageRef = database.ref("messages/checkpan");
    messageRef.set("1");
  } else {
    const messageRef = database.ref("messages/checkpan");
    messageRef.set("0");
  }

  return (
    <>
      <div
        className={
          isHighlighted ||
          (pan === "1" && people > 0 && btn === "0") ||
          (pan === "1" && btn === "1")
            ? "toggleButton active"
            : "toggleButton"
        }
        onClick={handleClick}
      >
        <div className="slider"></div>
      </div>
    </>
  );
}

export default ButtonPan;
