import { useState, useEffect } from "react";
import Product from "./Product";
import GetProducts from "./GetProducts";
import '../styles/Storepage.css';

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
          setStore(GetProducts(products, NUM_ITEMS));
        }
      });
  }, [products.length]);

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
