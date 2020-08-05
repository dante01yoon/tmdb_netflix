import React, {useEffect, useState } from "react";
import "./Nav.css";
import netflix_logo from "./asset/netflix-2015-logo.svg";
import search_icon from "./asset/search_.png";
const Nav = ({}) => {
  const [ navShow, setNavShow ] = useState(window.scrollY > 100);
  
  const windowScroll = () => {
      if(window.scrollY > 100 ) {
        setNavShow(true);
      }
      else setNavShow(false); 
  }
  useEffect(() => {
    window.addEventListener("scroll", windowScroll);
    return (() => {
      window.removeEventListener("scroll", windowScroll);
    })
  })
  return(
  <nav className={`nav__container ${navShow && 'nav__black'}`}>
    <div 
      className="nav__logo"
      style={{
        backgroundImage: `url(${netflix_logo})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
    <ul className="nav__list">
      <li 
        className="nav__list__item"
      >
        <div className="nav__search__box"> 
        <div
          className="nav__search__img" 
          style={{
          backgroundImage: `url(${search_icon})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}/>
        </div>
      </li>
      <li className="nav__list__item"><a href="./">MyList</a></li>
    </ul>
  </nav>
  )
}

export default Nav;