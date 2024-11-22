import { useState } from 'react';

function Cart({}) {
    const [cart, setCart] = useState([]); //useState may be old data from cart update.

    //This Item object may need to be in Item.jsx instead
    const Item = () => {
        this.name = name;
        this.price = price;
        this. quantity = quantity;
    }

    const handleCart = (Item) => {
        if (cart.includes(Item.name)) {
            setCart(...prevState, item.quantity + Item.quantity) //This line needs re-work (look at CV-application)
            // Look for index that includes Item.name, update quantity at index.quantity.
            // cart.Item.quantity += Item.quantity;
        } else {
            setCart(...prevState, Item);
        }
    }

    return (
        <>
            <div className="Subtotal">
                ${subtotal}
            </div>
            <button className="btn-checkout">Go to Cart</button>
        </>
    )
}