import React, { useState } from "react";
import "../css/star.css";
import "../css/Card.css";
import "../css/Title.css";

import sound8 from "../Sound/決定ボタンを押す1.mp3";
import sound7 from "../Sound/カーソル移動4.mp3";
import Deck from "./Deck.jsx";
import Titletext from "./titletext.jsx";
import Sound from "./sound.jsx";

const Main = () => {
  const [elements, setElements] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const openGame = () => {
    titleClose();
    onbutton();
    const newElement = <Deck />;
    setElements([...elements, newElement]);
  };

  const titleClose = () => {
    setIsVisible(false);
  };

  const hoverbutton = () => {
    const onmouse = new Audio(sound7);
    onmouse.play();
  };

  const onbutton = () => {
    const onbutton = new Audio(sound8);
    onbutton.play();
  };

  return (
    <>
      <Sound />

      {isVisible && <Titletext />}
      {isVisible && (
        <button
          className="start-button"
          onClick={openGame}
          onMouseEnter={hoverbutton}
        >
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

export default Main;
