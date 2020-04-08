import React from "react";
import "../style.css";

function Button({ buttonType, handleChildClick }) {
  let handleClick = () => {
    handleChildClick(buttonType, 1);
  };

  return <div className={buttonType} onClick={handleClick}></div>;
}

export default Button;
