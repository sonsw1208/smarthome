import "./App.css";
import "./style/fontawesome-free-6.4.0-web/css/all.css";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./config";
import { WiHumidity } from "react-icons/wi";
import { HiLightBulb } from "react-icons/hi";
import Item from "./compoments/itemcontrol/itemlight";
import "./compoments/button/button.css";
import { BsFan } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { GrFormSubtract } from "react-icons/gr";
import { GrFormAdd } from "react-icons/gr";
import ItemLight from "./compoments/itemcontrol/itemlight";
import ItemPan from "./compoments/itemcontrol/itempan";
import ItemTempu from "./compoments/itemcontrol/itemtempu";
import { BsFillPeopleFill } from "react-icons/bs";

// Khởi tạo kết nối Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Gửi dữ liệu lên firebase
// const messageRef = database.ref("messages/messageId");
// messageRef.set({
//   text: "Hello, Firebase!",
//   timestamp: Date.now(),
// });
var temp = false;
// Giá trị nhiệt độ max
//var numbertem = 50;
// Giá trị nhiệt độ min
var strmintem = false;
//var mintem = 10;
//Hiển thị số người
function App() {
  // Đọc dữ liệu độ ẩm
  const [messages, setMessages] = useState([]);
  // Đọc nhiệt độ
  const [humidity, setHumidity] = useState([]);
  // Đọc số người
  const [people, setPeople] = useState([]);

  // Đọc nhietdo max
  const [tmax, setTmax] = useState([]);
  // Đọc nhietdo min
  const [tmin, setTmin] = useState([]);

  //Chỉnh nhiệt độ max
  //const [changeaddtem, setChangeaddtem] = useState(numbertem);
  const [tempura, setTemp] = useState(temp);
  const addtemp = () => {
    temp = !temp;
    setTemp(temp);
  };

  //Chỉnh nhiệt độ min
  //const [changemintem, setChangemintem] = useState(mintem);
  const [mintempura, setminTemp] = useState(strmintem);
  const controlmintemp = () => {
    strmintem = !strmintem;
    setminTemp(strmintem);
  };

  // Gửi dữ liệu lên firebase
  // const messageRef = database.ref("messages/mintemp");
  // messageRef.set(changeaddtem);
  // const messageRef1 = database.ref("messages/maxtemp");
  // messageRef1.set(changemintem);

  useEffect(() => {
    const messagesRef = database.ref("messages/humidity");
    const messagesRef1 = database.ref("messages/temp");
    const messagesRef2 = database.ref("messages/people");
    const messagesRef3 = database.ref("messages/mintemp");
    const messagesRef4 = database.ref("messages/maxtemp");

    messagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setMessages(data);
      }
    });

    messagesRef1.on("value", (snapshot) => {
      const data1 = snapshot.val();
      if (data1) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setHumidity(data1);
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
        setTmax(data3);
      }
    });

    messagesRef4.on("value", (snapshot) => {
      const data4 = snapshot.val();
      if (data4) {
        //Chuyển đổi dữ liệu từ Firebase thành một mảng
        //const messageList = Object.values(data);
        setTmin(data4);
      }
    });

    // Hủy lắng nghe khi component unmount
    return () => {
      messagesRef.off();
      messagesRef1.off();
    };
  }, []);

  return (
    <div className="f-App">
      <div className="App">
        <header className="header-home">
          <div className="display-people">
            <BsFillPeopleFill />
            <p>{people}</p>
          </div>
          <div className="home-status">HOME STATUS</div>
          <div className="icon-th">
            <p className="icon-temp">
              <i class="fa-solid fa-temperature-quarter fa-beat"></i> {humidity}
              °C
            </p>
            <p className="icon-hum">
              <WiHumidity />
              {messages}%
            </p>
          </div>
        </header>
        <div className="app-body">
          {/*  */}
          <ItemLight iconcus={<HiLightBulb />} name={"Ligth intensily"} />
          <ItemPan iconcus={<BsFan />} name={"Fan Strong"} />
          {/* <ItemTempu iconcus={<CiTempHigh />} name={"Temperature"} /> */}
          {/* <Item iconcus={<BsFan />} name={"Fan Strong"} />
          <Item iconcus={<CiTempHigh />} name={"Temperature"} /> */}
          <p className="control-minmax">
            Điều chỉnh giá trị min , max cho nhiệt độ
          </p>
          <div className="control-tempu">
            <div
              onClick={() => {
                // if (tempura) {
                //   setChangeaddtem(changeaddtem - 1);
                // }
                // if (mintempura) {
                //   setChangemintem(changemintem - 1);
                // }
              }}
              className="btn-sub"
            >
              <GrFormSubtract />
            </div>
            <div className="display-tempu">
              <h3
                onMouseDown={controlmintemp}
                className={
                  strmintem ? "number-temp number-temp-red" : "number-temp"
                }
              >
                {" "}
                min
                <br />
                {tmax}°C
              </h3>
              <img
                className="img-display-min"
                //onClick={}
                alt="noimage"
                src="https://img.pikbest.com/png-images/qiantu/technology-wind-circle-vector_2711874.png!f305cw"
                width="100%"
              />
            </div>
            <div className="display-tempu">
              <h3
                onMouseDown={addtemp}
                className={
                  tempura ? "number-temp number-temp-red" : "number-temp"
                }
              >
                {" "}
                max <br />
                {tmin}°C
              </h3>
              <img
                className="img-display-max"
                alt="noimage"
                src="https://img.pikbest.com/png-images/qiantu/technology-wind-circle-vector_2711874.png!f305cw"
                width="100%"
              />
            </div>
            <div
              onClick={() => {
                // if (tempura) {
                //   setChangeaddtem(changeaddtem + 1);
                // }
                // if (mintempura) {
                //   setChangemintem(changemintem + 1);
                // }
              }}
              className="btn-add"
            >
              <GrFormAdd />
            </div>
          </div>
          <div className="body-right"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
