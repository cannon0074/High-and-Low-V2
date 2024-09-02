import React, { useState } from "react";
import "../css/star.css";
import "../css/Card.css";
import "../css/Title.css";

import sound8 from "../Sound/決定ボタンを押す1.mp3";
import sound7 from "../Sound/カーソル移動4.mp3";
// import Deck from "./Deck.jsx";
import Deck2 from "./Deck2.jsx";
import DeckHARD from "./DeckHARD.jsx";
import Titletext from "./titletext.jsx";
import Sound from "./sound.jsx";
import Help from "./Help.jsx";

const Main = () => {
  const [elements, setElements] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const openGame = () => {
    titleClose();
    onbutton();
    const newElement = <Deck2 />;
    setElements([...elements, newElement]);
  };

  const openHard = () => {
    titleClose();
    onbutton();
    const newElement = <DeckHARD />;
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
      {isVisible && <Help />}

      {isVisible && <Titletext />}
      {isVisible && (
        <div>
          <button
            className="start-button"
            onClick={openGame}
            onMouseEnter={hoverbutton}
          >
            Start
          </button>
        </div>
      )}
      {isVisible && (
        <div>
          <button
            className="hard-button"
            onClick={openGame}
            onMouseEnter={hoverbutton}
          >
            HARD MODE
          </button>
        </div>
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
