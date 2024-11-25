import { useState, useEffect, useRef } from "react";
import GetProducts from "./GetProducts";
import "../styles/Carousel.css";

function Carousel() {
    const IMG_NUM = 5;
    const IMG_WIDTH = 600; //pixels
    const carousel = useRef(null);

    let imgIndex = [];
    for (let i = 0; i < IMG_NUM; i++) {
        imgIndex[i] = IMG_WIDTH * i;    
    }

    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/", { mode: "cors" })
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .then(() => {
            if (products.length !== 0) {
                setStore(GetProducts(products, IMG_NUM));
            }
        });
    }, [products.length]);

    useEffect(() => {
        let autoscroll = setInterval(() => {
            scrollRight();
        }, 4000);
        return() => {clearInterval(autoscroll)};
    }, [index]);

    const scroll = () => {
        carousel.current.scrollTo({
            left: imgIndex[index],
            behavior: "smooth",
        });
    }

    const scrollLeft = () => {
        index === 0 ? setIndex(IMG_NUM - 1) : setIndex(index - 1);
        scroll();
    }

    const scrollRight = () => {
        index === IMG_NUM - 1 ? setIndex(0) : setIndex(index + 1);
        scroll();
    }

    const circleNavigation = (i) => {
        setIndex(i);
        scroll();
    }

    return (
        <div className="menu-carousel">
            <h2>Bestsellers</h2>
            <br />
            <div className="carousel-top">
                <button className="scroll carousel-left" onClick={() => scrollLeft()}>
                &#60;
                </button>
                <div className="carousel-frame" ref={carousel}>
                <div className="carousel-cont">
                    {store.map((item, i) => {
                        return (
                            <div key={i}>
                                <img className="carousel-img" src={item.img} />
                                <div className="carousel-name">{item.name}</div>
                            </div>
                        )
                    })}
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