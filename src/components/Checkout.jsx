import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Checkout({ cart, editCart }) {
    const SHIPPING_FEE = 2.99;
    const TAX_FEE = 0.13;

    const [checkoutCart, setCheckoutCart] = useState(cart);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

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
            const newArray = checkoutCart.map((item, i) => {
                if (i === index) {
                    return {...item, quantity: checkoutCart[index].quantity - 1}
                }
                return item;
            }); 
            handleEditCart(newArray);
        }
    }

    const handleIncrease = (index) => {
        const newArray = checkoutCart.map((item, i) => {
            if (i === index) {
                return {...item, quantity: checkoutCart[index].quantity + 1}
            }
            return item;
        }); 
        handleEditCart(newArray);
    }

    const handleDelete = (index) => {
        const newArray = checkoutCart.filter((item, i) => i !== index);
        handleEditCart(newArray);
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

    return (
        <>
            {checkoutCart.length <= 0 ? (
                <>
                    <h1>Your Thift Cart is empty...</h1>
                    <Link to="../store">
                        <button className="btn-welcome" >Start Shopping</button>
                    </Link>
                </>
            ) : (
                <>
                    <div className="checkout-cart">
                        <h2>Cart ({checkoutCart.length})</h2>
                        <ul>
                            {checkoutCart.map((item, index) => (
                                <li key={item.id}>
                                    <div>[{item.id}]{item.name}</div>
                                    <div>{money.format(item.price)}</div>
                                    <button className="btn-quantity" onClick={() => handleDecrease(index)}>-</button>
                                    {item.quantity}
                                    <button className="btn-quantity"onClick={() => handleIncrease(index)}>+</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </li>
                            ))} 
                        </ul>                        
                    </div>

                    <div className="summary">
                        <h2>Summary</h2>
                        <span className="subtotal">Subtotal: {money.format(subtotal)}</span>
                        <br />
                        <span className="shipping">Shipping: {money.format(shipping)}</span>
                        <br />
                        <span className="tax">Tax (13%): {money.format(tax)}</span>
                        <br/>
                        <span className="tax">Order Total: {money.format(total)}</span>                        
                        <hr />
                        <button>Place your order</button>
                    </div>
                </>
            )}
        </>
    )
};

export default Checkout;