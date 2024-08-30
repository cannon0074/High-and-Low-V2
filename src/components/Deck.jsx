import { useEffect, useState } from "react";

import "../css/Card.css";
import "../App.css";
import sound1 from "../Sound/カードめくり1.mp3";
import sound2 from "../Sound/カードを置く.mp3";
import sound3 from "../Sound/カードを配る.mp3";
import sound4 from "../Sound/win.mp3";
import sound5 from "../Sound/lose.mp3";
import sound6 from "../Sound/draw.mp3";
import sound7 from "../Sound/カーソル移動4.mp3";
import sound8 from "../Sound/決定ボタンを押す7.mp3";
import sound9 from "../Sound/ラッパのファンファーレ.mp3";

const Deck = () => {
  // デッキIDを保存
  const backImg = "https://www.deckofcardsapi.com/static/img/back.png";
  const [firstBackImg, setFirstBackImg] = useState(backImg);
  const [secondBackImg, setSecondBackImg] = useState(backImg);
  const [deckId, setdeckId] = useState();
  // 1枚目と2枚目のカード画像を保存
  const [firstCardImg, setfirstCardImg] = useState();
  const [secondCardImg, setsecondCardImg] = useState(firstBackImg);
  // 1枚目と2枚目のカードの値を保存
  const [firstCard, setfirstCard] = useState();
  const [secondCard, setsecondCard] = useState();
  // スコア
  const [score, setScore] = useState(0);
  // 画像の回転状態を管理するための状態
  const [firstFlip, setFirstFlip] = useState(false);
  const [secondFlip, setSecondFlip] = useState(false);
  // 画像のフェードイン状態を管理するための状態
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  // 画面のメッセージを管理するための状態
  const [message, setMessage] = useState("　");
  // NEXTGAMEボタンの表示状態を管理するための状態
  const [visible, setVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [round, setRound] = useState(0);
  // 値を数値に変換する関数
  const cardValueToNumber = (value) => {
    if (value === "JACK") return 11;
    if (value === "QUEEN") return 12;
    if (value === "KING") return 13;
    if (value === "ACE") return 14;
    return parseInt(value, 10);
  };

  const createDeck = () => {
    setButtonVisible(true);

    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => {
        setFadeIn(false);
        return res.json();
      })
      .then((json) => {
        const deckId = json.deck_id;
        setdeckId(deckId);

        return fetch(
          `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
      })

      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        const newCardValue = json.cards[0].value;
        const firstCardNum = cardValueToNumber(newCardValue);
        setfirstCardImg(json.cards[0].image);
        setfirstCard(firstCardNum);
        console.log(firstCardNum);
      })
      .then(() => {
        setTimeout(() => {
          setFirstFlip(true);
          cardFlip();
          setButtonVisible(false);
        }, 300);
      });
  };

  const highDrawCard = async () => {
    setButtonVisible(!buttonVisible);
    await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const newCardValue = json.cards[0].value;
        const secondCardNum = cardValueToNumber(newCardValue);
        if (secondFlip === false) {
          //カードが裏を向いている場合
          setsecondCardImg(json.cards[0].image);
          setsecondCard(secondCardNum);
        } else if (secondFlip === true) {
          //カードが表を向いている場合
          setSecondBackImg(json.cards[0].image);
          setsecondCard(secondCardNum);
        }
        console.log(firstCard);
        console.log(secondCardNum);
        setTimeout(() => {
          setSecondFlip(!secondFlip);
          cardFlip();
          if (firstCard < secondCardNum) {
            if (score === 1) {
              setMessage("CONGRATULATIONS！");
              Fanfare();
              setScore((score) => score + 1);
              setVisible(false);
              setNewVisible(true);
            } else {
              setMessage("WIN！");
              winsound();
              setScore((score) => score + 1);
              setVisible(true);
            }
          } else if (firstCard === secondCardNum) {
            setMessage("DRAW");
            drawsound();
            setVisible(true);
          } else {
            setMessage("LOSE");
            losesound();
            setNewVisible(true);
          }
        }, 200);
      });
  };

  const lowDrawCard = () => {
    setButtonVisible(!buttonVisible);
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        const newCardValue = json.cards[0].value;
        const secondCardNum = cardValueToNumber(newCardValue);
        if (secondFlip === false) {
          setsecondCardImg(json.cards[0].image);
          setsecondCard(secondCardNum);
        } else if (secondFlip === true) {
          setSecondBackImg(json.cards[0].image);
          setsecondCard(secondCardNum);
        }
        console.log(firstCard);
        console.log(secondCardNum);
        setTimeout(() => {
          setSecondFlip(!secondFlip);
          cardFlip();
          if (firstCard > secondCardNum) {
            if (score === 1) {
              setMessage("CONGRATULATIONS！");
              Fanfare();
              setScore((score) => score + 1);
              setVisible(false);
              setNewVisible(true);
            } else {
              setMessage("WIN！");
              winsound();
              setScore((score) => score + 1);
              setVisible(true);
            }
          } else if (firstCard === secondCardNum) {
            setMessage("DRAW");
            drawsound();
            setVisible(true);
          } else {
            setMessage("LOSE");
            losesound();
            setNewVisible(true);
          }
        }, 200);
      });
  };

  const NextGame = async () => {
    setMessage("　");
    setButtonVisible(true);
    await new Promise((resolve) => {
      setVisible(false);
      setFadeOut(true);
      cardGive();
      setTimeout(resolve, 500);
    }).then(() => {
      setFadeOut(false);
      if (firstFlip === false) {
        //カードが裏を向いている場合
        setfirstCard(secondCard);
        setFirstBackImg(backImg);
        //裏面を裏模様にする
        setTimeout(() => {
          setfirstCardImg(secondBackImg);
        }, 500);
        //表面を数値にする
      } else if (firstFlip === true) {
        //カードが表を向いている場合
        setfirstCard(secondCard);
        setfirstCardImg(backImg);
        //表面を裏模様にする
        setFirstBackImg(secondCardImg);
        //裏面を数値にする
      }
      if (secondFlip === false) {
        //カードが裏を向いている場合
        setSecondBackImg(backImg);
        //裏面を裏模様にする
      } else if (secondFlip === true) {
        //カードが表を向いている場合
        setsecondCardImg(backImg);
        //表面を裏模様にする
      }

      setFadeIn(true);
      cardPut();

      setTimeout(() => {
        setFadeIn(false);
        setTimeout(() => {
          setFirstFlip(!firstFlip);
          cardFlip();
          setButtonVisible(false);
        }, 500);
      }, 500);
    });
  };

  const resetGame = async () => {
    setNewVisible(false);
    setFadeOut(true);
    cardGive();
    await new Promise((resolve) => {
      setFadeOut(true);
      setTimeout(resolve, 500);
    }).then(() => {
      setFadeOut(false);
      reset();
      setFadeIn(true);
      cardPut();
    });
    setTimeout(() => {
      setFadeIn(false);

      createDeck();
    }, 500);
  };

  const reset = () => {
    setFirstBackImg(backImg);
    setSecondBackImg(backImg);
    setdeckId();
    setfirstCardImg(backImg);
    setsecondCardImg(backImg);
    setfirstCard();
    setsecondCard();
    setScore(0);
    setFadeIn(false);
    setFadeOut(false);
    setMessage("　");
    setVisible(false);
    setButtonVisible(false);
    setRound(0);
    setNewVisible(false);
    setFirstFlip(false);
    setSecondFlip(false);
  };

  useEffect(() => {
    cardPut();
    setFadeIn(true);
  }, []);

  useEffect(() => {
    createDeck();
  }, []);

  const cardPut = () => {
    const cardput = new Audio(sound2);
    cardput.play();
  };

  const cardFlip = () => {
    const flip = new Audio(sound1);
    flip.play();
  };

  const cardGive = () => {
    const give = new Audio(sound3);
    give.play();
  };

  const winsound = () => {
    const win = new Audio(sound4);
    win.play();
  };

  const losesound = () => {
    const lose = new Audio(sound5);
    lose.play();
  };

  const drawsound = () => {
    const draw = new Audio(sound6);
    draw.play();
  };

  const hoverbutton = () => {
    const onmouse = new Audio(sound7);
    onmouse.play();
  };

  const onbutton = () => {
    const onbutton = new Audio(sound8);
    onbutton.play();
  };

  const Fanfare = () => {
    const Fanfare = new Audio(sound9);
    Fanfare.play();
  };

  return (
    <>
      <div className="main">
        <div className="score">score: {score}</div>

        <div className="cardContainer">
          <div className="firstCardContainer">
            <div
              className={`back ${firstFlip ? "rotated" : ""} ${
                fadeIn ? "fadeDown" : ""
              } ${fadeOut ? "fadeRight" : ""}`}
            >
              <img src={firstBackImg} style={{ height: "180px" }} />
            </div>
            <div
              className={`front ${firstFlip ? "rotated" : ""} ${
                fadeIn ? "fadeDown" : ""
              } ${fadeOut ? "fadeRight" : ""}`}
            >
              <img src={firstCardImg} style={{ height: "180px" }} />
            </div>
          </div>
          <div className="secondCardContainer">
            <div
              className={`back ${secondFlip ? "rotated" : ""} ${
                fadeIn ? "fadeDown" : ""
              } ${fadeOut ? "fadeRight" : ""}`}
            >
              <img src={secondBackImg} style={{ height: "180px" }} />
            </div>
            <div
              className={`front ${secondFlip ? "rotated" : ""} ${
                fadeIn ? "fadeDown" : ""
              } ${fadeOut ? "fadeRight" : ""}`}
            >
              <img src={secondCardImg} style={{ height: "180px" }} />
            </div>
          </div>
        </div>

        <div className="message">{message}</div>
        <div className="button-container">
          <div className="high-low">
            <button
              className={`high c-button _shiny_high 
              ${buttonVisible ? "button-visible" : ""}`}
              onMouseEnter={hoverbutton}
              onClick={highDrawCard}
            >
              High
            </button>
            <button
              className={`low c-button _shiny_low 
              ${buttonVisible ? "button-visible" : ""}`}
              onMouseEnter={hoverbutton}
              onClick={lowDrawCard}
            >
              Low
            </button>
          </div>
          <div className="next-new">
            <div className="nextbutton">
              <button
                className={`next ${visible ? "visible" : ""} c-button _shiny`}
                onMouseEnter={hoverbutton}
                onClick={NextGame}
              >
                NextGame
              </button>
            </div>
            <div className="resetbutton">
              <button
                className={`new ${
                  newVisible ? "newvisible" : ""
                } c-button _shiny`}
                onMouseEnter={hoverbutton}
                onClick={resetGame}
              >
                NewGame
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deck;
