import { Link } from 'react-router-dom';
import Carousel from './Carousel';

function Homepage() {
    return (
      <>
        <h1>Welcome to Thrift City!</h1>

        <Link to="../store">
            <button className="btn-welcome" >Start Shopping</button>
        </Link>
        <br />
        <hr />
        <Carousel />
      </>
    );
  };
  
  export default Homepage;