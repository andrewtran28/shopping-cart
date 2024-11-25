import { useState, useEffect, useRef } from "react";
import "../styles/Carousel.css";
import logo from "../assets/logo.png";

function Carousel({}) {
  const IMG_NUM = 5;
  const IMG_WIDTH = 598; //pixels
  const carousel = useRef(0);
  let index = 0;
  let imgIndex = [];

  useEffect(() => {
    for (let i = 0; i < IMG_NUM; i++) {
      imgIndex[i] = IMG_WIDTH * i;
    }
  }, [imgIndex.length]);

    useEffect(() => {
        let autoscroll = setInterval(() => {
            scrollRight();
        }, 5000);
        return() => clearInterval(autoscroll);
    }, [index]);

  function scrollLeft() {
    index === 0 ? (index = IMG_NUM - 1) : index--;
    carousel.current.scrollTo({
      left: imgIndex[index],
      behavior: "smooth",
    });
  }

  function scrollRight() {
    index === IMG_NUM - 1 ? (index = 0) : index++;

    carousel.current.scrollTo({
      left: imgIndex[index],
      behavior: "smooth",
    });
  }

  function circleNavigation(i) {
    carousel.current.scrollTo({
        left: imgIndex[i],
        behavior:"smooth",
    });
    index = i;
  }

  return (
    <div className="menu-carousel">
      <div className="carousel-top">
        <button className="scroll carousel-left" onClick={() => scrollLeft()}>
          &#60;
        </button>
        <div className="carousel-frame" ref={carousel}>
          <div className="carousel-cont">
            <img className="carousel-img" src={logo} />
            <img className="carousel-img" src={logo} />
            <img className="carousel-img" src={logo} />
            <img className="carousel-img" src={logo} />
            <img className="carousel-img" src={logo} />
          </div>
        </div>
        <button className="scroll carousel-right" onClick={() => scrollRight()}>
          &#62;
        </button>
      </div>

      <div className="carousel-nav">
        <button className="circle-nav" id="nav0" onClick={() => circleNavigation(0)}></button>
        <button className="circle-nav" id="nav1" onClick={() => circleNavigation(1)}></button>
        <button className="circle-nav" id="nav2" onClick={() => circleNavigation(2)}></button>
        <button className="circle-nav" id="nav3" onClick={() => circleNavigation(3)}></button>
        <button className="circle-nav" id="nav4" onClick={() => circleNavigation(4)}></button>
      </div>
    </div>
  );
}

export default Carousel;