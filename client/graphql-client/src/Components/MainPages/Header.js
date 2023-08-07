import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext } from "react";

import "./Header.css";
import AuthContext from "../../store/AuthProvider";

const Header = ({ role, isEditOrAddPage = false }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logOutHandler = () => {
    authCtx.isAuthenticated = false;
    authCtx.userDetails = { name: "", role: "" };
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };

  return (
    <div className="my-header">
      <h2>Student Management Tool</h2>
      <div>
        {role !== "Student" && !isEditOrAddPage && (
          <Link to="/add-student">
            <Button variant="contained">Add Student</Button>
          </Link>
        )}
        {isEditOrAddPage && (
          <Link to="/">
            <Button variant="contained">Go To Home</Button>
          </Link>
        )}
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          onClick={logOutHandler}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
