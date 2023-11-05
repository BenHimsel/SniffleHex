import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  const [toggleBoard, setToggleBoard] = useState(false);

  return (
    <div className="App h-full w-full">
      <div className="w-full columns-3 bg-slate-600 rounded-sm">
        <div className="">a</div>
        <div className="">b</div>
        <div className="">c</div>
      </div>

      <br />
      <Button icon="pi pi-plus" className="mr-2" label="Show Board" onClick={() => setToggleBoard((toggleBoard) => !toggleBoard)}></Button>
      <div id="board" className="justify-center w-full h-full">
        {toggleBoard ? <GameBoard></GameBoard> : "Board Hidden"}
      </div>
    </div>
  );
}

export default App;
