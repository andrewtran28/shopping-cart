import { useState, useEffect } from "react";
import Product from "./Product";

function Storepage({ addToCart }) {
  const NUM_ITEMS = 20;
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .finally(() => {
        if (products.length !== 0) {
          setStore(getProducts());
        }
      });
  }, [products.length]);

  const randomNumber = () => {
    const NUM_PRODUCTS = 20; //Total products in Fake Store API
    return Math.floor(Math.random() * NUM_PRODUCTS);
  };

  const getProducts = () => {
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
        id: products[index].id,
      };

      indexStack[i] = index;
      stack[i] = product;
    }

    return stack;
  };

  const handleAddProduct = (productData) => {
    addToCart(productData);
  };

  return (
    <>
    <section className="storepage">
        {store.map((item) => {
            return (
            <Product
                name={item.name}
                img={item.img}
                price={item.price}
                id={item.id}
                key={item.id}
                addProduct={handleAddProduct}
            />
            );
        })}
    </section>

    </>
  );
}

export default Storepage;
