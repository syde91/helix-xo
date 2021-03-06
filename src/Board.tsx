import React, { useState, useEffect } from "react";
import Cell from "./Cell";

type StageProps = {
  cells: string[][];
};

const Cells: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const Stage: React.FC<StageProps> = (props) => {
  const [cells, setCells] = useState(Cells);
  const [gameStop, setGameStop] = useState(false);
  const [player, setPlayer] = useState("User");

  const reset = () => {
    setGameStop(false);
    const reset: string[][] = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    console.log(reset);
    setCells(reset);
  };

  const handleClick = (row: number, column: number) => {
    if (cells[row][column] != "" || gameStop) {
      return;
    }
    const copy = [...cells];
    copy[row][column] = player == "User" ? "X" : "O";
    setCells(copy);

    if (isGameOver(cells)) {
      setGameStop(true);
      setTimeout(() => {
        alert(
          player == "User"
            ? "You LOSE!!! Try forcing your opponent to make a line."
            : "You WIN!!!"
        );
      }, 600);
      return;
    }
    if (isGameDraw(cells)) {
      alert("Draw!!!");
      return;
    }
    player == "User" ? setPlayer("CPU") : setPlayer("User");
  };
  // autoPlay: Finds the safest option for the CPU to play
  const autoPlay = (cells: string[][], value: string) => {
    const deadOptions: number[] = [];
    const goodOptions: number[] = [];
    let optionx: number;
    let optiony: number;
    let random: number;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (cells[i][j] == "") {
          const copy = cells.map(function (arr) {
            return arr.slice();
          });
          copy[i][j] = value;
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
    const element: HTMLElement = document.getElementById(
      "cell" + optionx + optiony
    ) as HTMLElement;
    element.click();
  };

  // Checks if the game has been drawn. Call isGameDraw only after isGameOver
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

  // Checks if game won
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
    return false;
  }

  useEffect(() => {
    if (player == "CPU") {
      const copy = [...cells];
      setTimeout(() => {
        autoPlay(copy, "O");
      }, 500);
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

export default Stage;
