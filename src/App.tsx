import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Stage cells={Cells} />
    </div>
  );
}

const Cells: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

type StageProps = {
  cells: string[][];
};

type autoPlay = {
  cells: string[][];
  value: string;
};

const autoPlay = function <autoPlay>(cells, value) {
  const deadOptions: int[] = [];
  const goodOptions: int[] = [];
  let optionx: int;
  let optiony: int;
  let random: int;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (cells[i][j] == "") {
        const copy = cells.map(function (arr) {
          return arr.slice();
        });
        copy[i][j] = value;
        console.log(cells);
        console.log(copy);
        if (isGameOver(copy)) {
          deadOptions.push(i);
          deadOptions.push(j);
        } else {
          goodOptions.push(i);
          goodOptions.push(j);
        }
      }
    }
  }
  if (goodOptions.length == 0) {
    if (deadOptions.length == 0) {
      return;
    }
    optionx = deadOptions[0];
    optiony = deadOptions[1];
  } else {
    random = Math.floor(Math.random() * goodOptions.length);
    if (random % 2 != 0) {
      random -= 1;
    }
    optionx = goodOptions[random];
    optiony = goodOptions[random + 1];
  }
  console.log(goodOptions);
  console.log(deadOptions);
  console.log(optionx);
  console.log(optiony);
  const element: HTMLElement = document.getElementById(
    "cell" + optionx + optiony
  ) as HTMLElement;
  element.click();
};

function isGameDraw(cells: string[][]): boolean {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (cells[i][j] == "") {
        return false;
      }
    }
  }
  return true;
}

function isGameOver(cells: string[][]): boolean {
  const winningConditions = [
    [0, 0, 0, 1, 0, 2],
    [1, 0, 1, 1, 1, 2],
    [2, 0, 2, 1, 2, 2],
    [0, 0, 1, 0, 2, 0],
    [0, 1, 1, 1, 2, 1],
    [0, 2, 1, 2, 2, 2],
    [0, 0, 1, 1, 2, 2],
    [2, 0, 1, 1, 0, 2],
  ];
  for (let i = 0; i < winningConditions.length; i++) {
    if (
      cells[winningConditions[i][0]][winningConditions[i][1]] ==
        cells[winningConditions[i][2]][winningConditions[i][3]] &&
      cells[winningConditions[i][2]][winningConditions[i][3]] ==
        cells[winningConditions[i][4]][winningConditions[i][5]] &&
      cells[winningConditions[i][2]][winningConditions[i][3]] != ""
    ) {
      console.log("GAME OVER");
      return true;
    }
  }
}

const Stage: React.FC<StageProps> = (props) => {
  const [cells, setCells] = useState(Cells);
  const [player, setPlayer] = useState("User");

  const handleClick = (row, column) => {
    if (cells[row][column] != "") {
      return;
    }
    const copy = [...cells];
    copy[row][column] = player == "User" ? "X" : "O";
    setCells(copy);

    if (isGameOver(cells)) {
      console.log(player + " LOSES!!!");
      return;
    }
    player == "User" ? setPlayer("CPU") : setPlayer("User");
  };

  useEffect(() => {
    if (player == "CPU") {
      const copy = [...cells];
      autoPlay(copy, "O");
    }
  }, [player]);

  return (
    <div className="Board">
      <div className="row">
        <Cell
          id="cell00"
          value={cells[0][0]}
          onClick={() => handleClick(0, 0)}
        />
        <Cell
          id="cell01"
          value={props.cells[0][1]}
          onClick={() => handleClick(0, 1)}
        />
        <Cell
          id="cell02"
          value={props.cells[0][2]}
          onClick={() => handleClick(0, 2)}
        />
      </div>
      <div className="row">
        <Cell
          id="cell10"
          value={props.cells[1][0]}
          onClick={() => handleClick(1, 0)}
        />
        <Cell
          id="cell11"
          value={props.cells[1][1]}
          onClick={() => handleClick(1, 1)}
        />
        <Cell
          id="cell12"
          value={props.cells[1][2]}
          onClick={() => handleClick(1, 2)}
        />
      </div>
      <div className="row">
        <Cell
          id="cell20"
          value={props.cells[2][0]}
          onClick={() => handleClick(2, 0)}
        />
        <Cell
          id="cell21"
          value={props.cells[2][1]}
          onClick={() => handleClick(2, 1)}
        />
        <Cell
          id="cell22"
          value={props.cells[2][2]}
          onClick={() => handleClick(2, 2)}
        />
      </div>
    </div>
  );
};

type CellProps = {
  id: string;
  value: string;
  onClick: () => void;
};

const Cell: React.FC<CellProps> = (props) => {
  return (
    <div
      id={props.id}
      className="cell"
      onClick={props.onClick}
      value={props.value}
    >
      {props.value}
    </div>
  );
};

export default App;
