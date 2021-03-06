import React, { useState, useEffect } from "react";
export type CellProps = {
  id: string;
  value: string;
  onClick: () => void;
};

const Cell: React.FC<CellProps> = (props) => {
  return (
    <div
      id={props.id}
      className="cell scene scene--card"
      onClick={props.onClick}
      data-value={props.value}
    >
      <div className={props.value ? "card is-flipped" : "card unflipped"}>
        <div className="card__face card__face--front"></div>
        <div
          className={
            (props.value == "X" ? "black " : "white ") +
            "card__face card__face--back"
          }
        >
          {props.value}
        </div>
      </div>
    </div>
  );
};

export default Cell;
