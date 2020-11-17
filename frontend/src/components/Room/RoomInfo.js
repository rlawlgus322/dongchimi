import React from "react";
import "./RoomInfo.css";

function RoomInfo({ room }) {
  return (
    <div className="roomInfo">
      <div className="leftInfo">
        <h3 className="leftInfo-text">{`Room : ${room}`}</h3>
      </div>
    </div>
  );
}

export default RoomInfo;
