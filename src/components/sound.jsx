import React, { useState, useRef } from "react";
import "../css/star.css";
import "../css/Title.css";
import Music from "../Sound/tamhe15loop.ogg";

const Sound = () => {
  const [musicButton, setMusicButton] = useState(false);
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(Music);
    audioRef.current.loop = true; // 音楽をループ再生する場合
    audioRef.current.volume = 0.3;
  }

  const BGMplay = () => {
    if (musicButton === false) {
      audioRef.current.play();
      setMusicButton(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // 再生位置をリセット
      setMusicButton(false);
    }
  };
  //   const [musicButton, setMusicButton] = useState(false);
  //   const bgm = new Audio(music);
  //   const BGMplay = () => {
  //     if (musicButton === false) {
  //       bgm.play();
  //       setMusicButton(true);
  //     } else if (musicButton === true) {
  //       bgm.pause();
  //       audio.currentTime = 0;
  //       setMusicButton(false);
  //     }
  //   };

  //   const mplay = () => {
  //     const bgm = new Audio(music);
  //     bgm.play();
  //   };

  //   const BGMstop = () => {
  //     const bgm = new Audio(music);
  //     bgm.stop();
  //   };

  return (
    <>
      <div className="BGMbutton">
        <button onClick={BGMplay}>{musicButton ? "BGM:OFF" : "BGM:ON"}</button>
      </div>
    </>
  );
};

export default Sound;
