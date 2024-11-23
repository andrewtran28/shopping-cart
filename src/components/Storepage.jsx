import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Product from './Product';

function Storepage({ updateCart }) {
    const NUM_ITEMS = 6;
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/', { mode: 'cors'})
            .then(response => response.json())
            .then(data => setProducts(data))
            .then(() => setStore(GetProducts()));
    }, [products.length]);

    const randomNumber = () => {
        const NUM_PRODUCTS = 20; //Total products in Fake Store API
        return Math.floor(Math.random() * NUM_PRODUCTS);
    }

    const GetProducts = () => { 
        let stack = [];
        let indexStack = [];
    
        for (var i = 0; i < NUM_ITEMS; i++) {
            var index = randomNumber();
    
            //Re-choose index if stack already has this number
            while (indexStack.includes(index)) {
              index = randomNumber();
            }

            let product = {
                name: products[index].title,
                img: products[index].image,
                price: `${products[index].price}`,
                key: products[index].id,
            }  
    
            indexStack[i] = index;
            stack[i] = product;
        }

        return stack;
    }

    const handleDataFromProduct = (productData) => {
        console.log(productData);
        updateCart(productData);
    }

    return (
        <>
            <h1>This is the Store Page</h1>
            {store.map((item) => {        
                return (
                    <Product
                        name={item.name}
                        img={item.img}
                        price={item.price}
                        key={item.key}
                        sendDataToParent={handleDataFromProduct}
                    /> 
                );
            })}          
        </>
    )
}

export default Storepage;