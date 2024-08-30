import React from "react";
import "../css/star.css";
import "../css/Card.css";
import "../css/Title.css";

const Titletext = () => {
  return (
    <>
      <div className="title-container">
        <h1 className="title-high">High</h1>
        <h1 className="title-and">&</h1>
        <h1 className="title-low">Low</h1>
      </div>
    </>
  );
};

export default Titletext;
