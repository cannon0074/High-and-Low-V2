import React, { useState } from "react";
import "../css/help.css";
import sound10 from "../Sound/決定ボタンを押す33.mp3";

const Help = () => {
  const [modal, setModal] = useState(false);

  const modalVisible = () => {
    setModal(!modal);
    pico();
  };

  const pico = () => {
    const pico = new Audio(sound10);
    pico.play();
  };

  return (
    <>
      <div className="help">
        <button className="help-button" onClick={modalVisible}>
          ？
        </button>
      </div>

      <div className={`help-content ${modal ? "modal-visible" : ""}`}>
        <div
          className={`modal-content ${modal ? "fadein" : ""}
        ${modal ? "" : "fadeout"}`}
        >
          <p>★ルール説明★ </p>
          <p>
            裏側のカード（右のカード）の数字を予想します。
            <br />
            表側のカード（左のカード）より大きいと思ったら「HIGH」、
            <br />
            小さいと思ったら「LOW」を選んでください。
            <br />
            <br />
            数字の大きさは
            <br />
            <br />
            2→3→4→5→6→7→8→9→10→J→Q→K→A
            <br />
            低　　　　　　　　　　　　　　　　　　高
            <br />
            <br />
            となっています。引き分けはやり直しです。
            <br />
            <br />
            HARD MODEは50回連続チャレンジです。
            <br />
            苦行です。
          </p>
        </div>
      </div>
    </>
  );
};

export default Help;
