import "../button/button.css";
import React from "react";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "../../config";
var check = false;

// Khởi tạo kết nối Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function ButtonTempu() {
  // Điều khiển đèn

  const [isHighlighted, setIsHighlighted] = useState(check);

  const handleClick = () => {
    check = !check;
    setIsHighlighted(check);
  };

  if (check === true) {
    // Gửi dữ liệu lên firebase
    const messageRef = database.ref("messages/tempu");
    messageRef.set("on");
  } else {
    const messageRef = database.ref("messages/tempu");
    messageRef.set("off");
  }

  return (
    <>
      <div
        className={isHighlighted ? "toggleButton active" : "toggleButton"}
        onClick={handleClick}
      >
        <div className="slider"></div>
      </div>
    </>
  );
}

export default ButtonTempu;
