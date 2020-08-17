import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";

import "./Nav.css";
import netflix_logo from "./asset/netflix-2015-logo.svg";
import search_icon from "./asset/search_.png";
const Nav = ({}) => {
  const [navShow, setNavShow] = useState(window.scrollY > 100);
  const [inputShow, setInputShow] = useState(false);
  const searchBoxRef = useRef(null);
  const windowScroll = () => {
    if (window.scrollY > 100) {
      setNavShow(true);
    } else setNavShow(false);
  };

  const clickOutsideOfSearchBox = (e) => {
    if (searchBoxRef?.current) {
      if (inputShow && !searchBoxRef.current.contains(e?.target)) {
        setInputShow(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutsideOfSearchBox);
    window.addEventListener("scroll", windowScroll);
    return () => {
      window.removeEventListener("scroll", windowScroll);
      document.removeEventListener("click", clickOutsideOfSearchBox);
    };
  });

  const handleButtonClick = () => {
    setInputShow(!inputShow);
  };

  const renderSearchButton = () => {
    return (
      <button onClick={handleButtonClick} className="nav__search__button">
        <div
          className="nav__search__img"
          style={{
            backgroundImage: `url(${search_icon})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </button>
    );
  };
  const renderButtonOrInput = () => {
    if (inputShow) {
      return <Input handleClick={handleButtonClick} />;
    }
    return renderSearchButton();
  };

  return (
    <nav className={`nav__container ${navShow && "nav__black"}`}>
      <div
        className="nav__logo"
        style={{
          backgroundImage: `url(${netflix_logo})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <ul className="nav__list">
        <li className="nav__list__item">
          <div className="nav__search__box" ref={searchBoxRef}>
            {renderButtonOrInput()}
          </div>
        </li>
        <li className="nav__list__item">
          <a href="./">MyList</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
