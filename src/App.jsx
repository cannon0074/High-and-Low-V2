import { useState } from "react";

import "./App.css";
import Deck from "./components/Deck.jsx";
import Title from "./components/title.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Title />
    </>
  );
}

export default App;
