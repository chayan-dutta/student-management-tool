import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./Unauthorised.css";

const Unauthorised = () => {
  return (
    <div className="four-zero-three">
      <div className="four-zero-three__inner">
        <div className="four-zero-three__title">SORRY!!!</div>
        <div className="four-zero-three__desc">Access Denied</div>
        <div className="four-zero-three__content">
          You don't have permission to access this page.
        </div>

        <Link to="/">
          <Button variant="contained">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorised;
