import { useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [cart, setCart] = useState([]); //useState may be old data from cart update.

    return (
      <>
        <h1>Welcome to Thrift City!</h1>

        <Link to="store">
            <button className="btn-welcome" >Start Shopping</button>
        </Link>
      </>
    );
  };
  
  export default Homepage;