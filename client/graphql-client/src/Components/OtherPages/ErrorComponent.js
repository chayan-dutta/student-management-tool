import { BiUnlink } from "react-icons/bi";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./ErrorComponent.css";
import AuthContext from "../../store/AuthProvider";

const ErrorComponent = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const reLoginHandler = () => {
    authCtx.isAuthenticated = false;
    authCtx.userDetails = { name: "", role: "" };
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };

  return (
    <>
      <div className="my-header">
        <h2>Student Management Tool</h2>
      </div>
      <div className="errorModule">
        <div className="errorIcon">
          <BiUnlink color="red" fontSize="40px" />
        </div>
        <div className="errorMsg">
          Oops! Looks like your session has been expired. Please Login again
        </div>
        <Button
          variant="contained"
          onClick={reLoginHandler}
          style={{ marginTop: "20px" }}
        >
          Log in
        </Button>
      </div>
    </>
  );
};

export default ErrorComponent;
