import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import trashIcon from '../assets/delete.png';
import '../styles/Checkout.css';

function Checkout({ cart, editCart }) {
    const [checkoutCart, setCheckoutCart] = useState(cart);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const SHIPPING_FEE = 2.99;
    const TAX_FEE = 0.13;
    const dialog = document.querySelector("dialog");
    const money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        trailingZeroDisplay: 'stripIfInteger',
    });

    useEffect(() => {
       handleEditCart(checkoutCart);
       handleSubtotal();
    }, [checkoutCart])

    const handleEditCart = (newCart) => {
        setCheckoutCart(newCart)
        editCart(checkoutCart);
    }

    const handleDecrease = (index) => {
        if(checkoutCart[index].quantity === 1) {
            handleDelete(index);
            return;
        } else {
            const newCart = checkoutCart.map((item, i) => {
                if (i === index) {
                    return {...item, quantity: checkoutCart[index].quantity - 1}
                }
                return item;
            }); 
            handleEditCart(newCart);
        }
    }

    const handleIncrease = (index) => {
        const newCart = checkoutCart.map((item, i) => {
            if (i === index) {
                return {...item, quantity: checkoutCart[index].quantity + 1}
            }
            return item;
        }); 
        handleEditCart(newCart);
    }

    const handleDelete = (index) => {
        const newCart = checkoutCart.filter((item, i) => i !== index);
        handleEditCart(newCart);
    };

    const handleSubtotal = () => {
        var shippingSum = SHIPPING_FEE * checkoutCart.length
        var subtotalSum = 0;
        for (var i = 0; i < checkoutCart.length; i++) {
            subtotalSum += checkoutCart[i].price * checkoutCart[i].quantity;
        }
        setSubtotal(subtotalSum);
        setShipping(shippingSum);
        setTax((shippingSum + subtotalSum) * TAX_FEE);
        setTotal((subtotalSum + shippingSum) * (1 + TAX_FEE));
    }

    const handlePlaceOrder = () => {
        let newCart = [];
        handleEditCart(newCart);
    }

    return (
        <div className="checkout">
            {checkoutCart.length <= 0 ? (
                <div className="checkout-empty">
                    <h1>Your cart is empty...</h1>

                    <Link to="../store">
                        <button className="btn-welcome" >Start Shopping</button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="checkout-cart">
                        <h2>Cart ({checkoutCart.length})</h2>
                        <ul>
                            {checkoutCart.map((item, index) => (
                                <li className="checkout-item" key={item.id}>
                                    <img className="checkout-img" src={item.img} />
                                    <div className="item-info">
                                        <div className="checkout-name">
                                            {item.name}
                                            <br />
                                            <div className="checkout-id">SKU: {String(item.id).padStart(4, '0')}</div>
                                        </div>
                                        <div className="item-cost">
                                            <div className="checkout-price">{money.format(item.price)}</div>
                                            <div className="checkout-quantity">
                                                <button className="btn-quantity" onClick={() => handleDecrease(index)}>-</button>
                                                    <div className="quantity-number">{item.quantity}</div>
                                                <button className="btn-quantity"onClick={() => handleIncrease(index)}>+</button>
                                                <img className="img-delete" src={trashIcon} onClick={() => handleDelete(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))} 
                        </ul>                        
                    </div>

                    <div className="checkout-summary">
                        <h2>Summary</h2>
                        <span className="summary-text">Subtotal:<div>{money.format(subtotal)}</div></span> <br />
                        <span className="summary-text">Shipping: <div>{money.format(shipping)}</div></span> <br />
                        <span className="summary-text">Tax (13%): <div>{money.format(tax)}</div></span> <br/>
                        <span className="summary-text order-total">Order Total: <div>{money.format(total)}</div></span>                        
                        <br />
                        <hr />
                        <br />
                        <button className="place-order" onClick={() => handlePlaceOrder()}>Place your order</button>
                    </div>
                </>
            )}
        </div>
    )
};

export default Checkout;