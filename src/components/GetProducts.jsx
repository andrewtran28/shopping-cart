function GetProducts (products, numItems) {
    const NUM_PRODUCTS = 20; //Total products in Fake Store API

    const randomNumber = () => {
        return Math.floor(Math.random() * NUM_PRODUCTS);
      };
    
    let stack = [];
    let indexStack = [];

    for (var i = 0; i < numItems; i++) {
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
}

export default GetProducts;