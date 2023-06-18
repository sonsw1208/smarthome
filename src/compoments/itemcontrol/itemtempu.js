import "../button/button.css";
import React from "react";
import ButtonTempu from "../button/buttontempu";

function ItemTempu({ iconcus, name }) {
  return (
    <div className="body-left">
      <div className="body-left-header">
        <div className="icon-light">{iconcus}</div>
        <div className="lmr-btn">
          <div>
            <h3 className="light-main">{name}</h3>
            <p className="light-room">Master room</p>
          </div>
          <ButtonTempu />
        </div>
      </div>
    </div>
  );
}

export default ItemTempu;
