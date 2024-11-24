import { Link } from 'react-router-dom';

function Homepage() {
    return (
      <>
        <h1>Welcome to Thrift City!</h1>
        <p>The thrift store that changes every time you visit.</p>
        <Link to="../store">
            <button className="btn-welcome" >Start Shopping</button>
        </Link>
      </>
    );
  };
  
  export default Homepage;