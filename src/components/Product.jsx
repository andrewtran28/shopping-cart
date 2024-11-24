import { useState } from 'react';

function Product({ name, img, price, id, addProduct }) {
    const [quantity, setQuantity] = useState(1);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        trailingZeroDisplay: 'stripIfInteger',
    });

    const handleQuantityChange = (e) => {
        if (e.target.value <= 0) {
            setQuantity(0);
        } else if (e.target.value > 99) {
            setQuantity(99);
        } else {
            setQuantity(Number(e.target.value));
        }
    }

    const handleDecrease = () => {
        if (quantity <= 0) {
            setQuantity(0);
        } else {
            setQuantity(Number(quantity) - 1);
        }
    }

    const handleIncrease = () => {
        if (quantity < 0) {
            setQuantity(0);
        } else if (quantity >= 99) {
            setQuantity(99);
        }
        else {
            setQuantity(Number(quantity) + 1);
        }
    }

    const handleAddToCart = () => {
        if(quantity > 0) {
            addProduct({name, img, price, quantity, id});
        }
    }

    return (
        <div className="item">
            <img className="item-img" src={img}/>
            <span className="item-name">{name}</span>
            <div className="item-price">{formatter.format(price)}</div>
            <div className="item-quantity">
                <label>Quantity: </label>
                <button className="btn-quantity" onClick={handleDecrease}>-</button>
                <input className="input-quantity" type="number" min='0' max='99' value={quantity} onChange={handleQuantityChange} />
                <button className="btn-quantity" onClick={handleIncrease}>+</button>
            </div>
            <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
            <div className="item-SKU">SKU: {String(id).padStart(4, '0')}</div>
        </div>
    )
}

export default Product;