import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from './assets/logo.png';
import cartIcon from './assets/shopping-cart.svg';
import Homepage from './components/Homepage';
import Storepage from './components/Storepage';
import Checkout from './components/Checkout';
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [itemNum, setItemNum] = useState(0); //Number of items bought and displayed on shopping cart icon
  const { name } = useParams();

  useEffect(() => {
    handleItemNum();
  }, [cart]);

  const addToCart = (addedItem) => {
    //If addedItem is already in cart, find index and update it's quantity; Otherwise push addedItem to cart.
    let index = cart.findIndex(e => e.name === addedItem.name);
    if (index > -1) {
      const updatedCart = cart.map ((item) => {
        if (item.name === addedItem.name) {
          if ((cart[index].quantity + addedItem.quantity) >= 99) {
            return {...item, quantity: 99 }
          } else {
            return {...item, quantity: cart[index].quantity + addedItem.quantity }
          }
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart(prevState => [...prevState, addedItem]);
    }
  }

  const handleItemNum = () => {
      var sum = 0;
      for (var i = 0; i < cart.length; i++) {
          sum += cart[i].quantity;
      }
      setItemNum(sum);
  }

  const editCart = (checkoutCart) => {
    setCart(checkoutCart);
  }

  return (
    <>
      <header>
        <Link to="../home">
          <img className="logo" src={logo}/>
        </Link>
        <nav>
            <Link to="../home">Home</Link>
            <Link to="../store">Store</Link>
        </nav>


        <div className="cart-header">
          <div className="cart-icon">
          <Link to="../checkout">
            <img className="cart-icon-img" src={cartIcon}/>
          </Link>
            <div className="cart-num">{itemNum}</div>
          </div>

          <Link to="../checkout">
            <button className="btn-checkout">Go to Cart</button>
          </Link>
        </div>
      </header>

      <main>
        {name === "home" ? (
          <Homepage 
          />
        ) : name === "store" ? (
          <Storepage 
            addToCart={addToCart}
          />
        ) : name === "checkout" ? (
          <Checkout 
            cart={cart}
            editCart={editCart}
          />
        ) : (
          <Homepage />
        )}
      </main>

    </>
  )
}

export default App