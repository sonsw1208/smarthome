import "../button/button.css";
import React from "react";
import { useState } from "react";
import ButtonLight from "../button/buttonlight";

function ItemLight({ iconcus, name }) {
  return (
    <div className="body-left">
      <div className="body-left-header">
        <div className="icon-light">{iconcus}</div>
        <div className="lmr-btn">
          <div>
            <h3 className="light-main">{name}</h3>
            <p className="light-room">Master room</p>
          </div>
          <ButtonLight />
        </div>
      </div>
    </div>
  );
}

export default ItemLight;
