import React, { useState } from "react";
import search_icon from "./asset/search_.png";

import "./Input.css";

const Input = ({ handleClick }) => {
  const [inputText, setInputText] = useState("");

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div class="search__input__box">
      <div
        class="search__input__icon"
        onClick={handleClick}
        style={{
          backgroundImage: `url('${search_icon}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "18px",
        }}
      ></div>
      <input
        onChange={onInputChange}
        className="search__input"
        style={{
          transitionDuration: "300ms",
        }}
      />
    </div>
  );
};

export default Input;
