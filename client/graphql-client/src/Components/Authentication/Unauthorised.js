import { Link } from "react-router-dom";

const Unauthorised = () => {
  return (
    <div>
      <p> you are not authorized. Please login to access the contents. </p>
      <Link to="/">Log In</Link>
    </div>
  );
};

export default Unauthorised;
