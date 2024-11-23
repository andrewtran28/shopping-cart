import { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import logo from './assets/logo.png';
import cartIcon from './assets/shopping-cart.svg';
import './App.css';
import Homepage from './components/Homepage';
import Storepage from './components/Storepage';

function App() {
  const [cart, setCart] = useState([]); //useState may be old data from cart update.
  const [itemNum, setItemNum] = useState(0); //Number of items bought and displayed on shopping cart icon
  const { name } = useParams();

  const handleCart = (addItem) => {
    let index = cart.findIndex(e => e.name === addItem.name);
    if (index > -1) {
      const updatedCart = cart.map ((item) => {
        if (item.name === addItem.name) {
          return {...item, quantity: cart[index].quantity + addItem.quantity }
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      setCart(prevState => [...prevState, addItem]);
    }
  }

  const handleItemNum = () => {
    //add all quantities in cart. Then display this number on shopping cart icon.
    let sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += cart[i].quantity;
    }

    setItemNum(sum);
  }

  useEffect(() => {
    handleItemNum();
    console.log(cart);
  }, [cart]);

  return (
    <>
      <div className="header">
        <img className="logo" src={logo}/>
        <nav>
            <Link to="home">Homepage</Link>
            <br />
            <Link to="store">Store</Link>
        </nav>
        <div className="Subtotal">
            {/* ${subtotal} */}
        </div>
        <button className="btn-checkout">Go to Cart</button>

        <div className="cart-header">
            <img className="cart-icon" src={cartIcon}/>
            <div className="cart-num">
                {itemNum} 
            </div>
        </div>
      </div>

      {name === "home" ? (
        <Homepage />
      ) : name === "store" ? (
        <Storepage 
          updateCart={handleCart}
        />
      ) : (
        <Homepage />
      )}
    </>
  )
}

export default App
