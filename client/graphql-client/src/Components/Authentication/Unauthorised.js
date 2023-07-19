import { Link } from "react-router-dom";

const Unauthorised = () => {
  return (
    <div data-testid="unauthorised-component">
      <p> You are not authorized. Please login to access the contents. </p>
      <Link to="/">Log In</Link>
    </div>
  );
};

export default Unauthorised;
