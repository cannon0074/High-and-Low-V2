import React, { useState, useEffect } from "react";
import "../css/star.css";
import "../css/Card.css";
import "../css/Title.css";
import Star from "./star.jsx";
import Deck from "./Deck.jsx";
import Titletext from "./titletext.jsx";
import Sound from "./sound.jsx";

const Title = () => {
  const [elements, setElements] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const openGame = () => {
    titleClose();
    const newElement = <Deck />;
    setElements([...elements, newElement]);
  };

  const titleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Sound />
      <Star />
      {isVisible && <Titletext />}
      {isVisible && (
        <button className="start-button" onClick={openGame}>
          Start
        </button>
      )}

      <div>
        {elements.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </div>
    </>
  );
};

export default Title;
