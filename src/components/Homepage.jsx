import { Link } from 'react-router-dom';
import Carousel from './Carousel';

function Homepage() {
    return (
      <>
        <h1>Welcome to Thrift City!</h1>

        <Link to="../store">
            <button className="btn-welcome" >Start Shopping</button>
        </Link>
        <br /> <hr /> <br />
        <Carousel />
        <br /> <hr />
        <p>
          <h2>Frequently asked questions (FAQ)</h2>
          <span><strong>Is this a real e-commerce site that sells goods?</strong></span><br />
          <span>No. This site site uses the <a href="https://fakestoreapi.com/">Fake Store API</a> to display data that mimics an online web-store. No credentials are being exchanged for any real products. </span> <br /> <br/>

          <span><strong>Is there a limit to my order?</strong></span><br />
          <span>All products can be ordered but with limited max quantity of 99 for each product.</span> <br /> <br/>

          <span><strong>Is there international shipping? Are there any shipping costs?</strong></span><br />
          <span>We ship all items worldwide. We charge a shipping fee of CAD$2.99 for each product. </span> <br /> <br/>

          <span><strong>Are there taxes on purchases?</strong></span><br />
          <span>Yes, a 13% GST/HST tax is applied on the entire order including shipping. </span>
        </p>

      </>
    );
  };
  
  export default Homepage;