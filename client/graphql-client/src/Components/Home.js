import { useContext, useEffect } from "react";
import "./Home.css";
import StudentList from "./StudenLists";

import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import AuthContext from "../store/AuthProvider";
import Unauthorised from "./Authentication/Unauthorised";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx?.isAuthenticated;
  const { loading, error, data } = useQuery(GET_ALL_Student);

  const logOutHandler = () => {
    authCtx.isAuthenticated = false;
    localStorage.removeItem("LoggedInUser");
  };

  if (isLoggedIn) {
    return (
      <div>
        <div className="my-header">
          <h2>Student Management Tool</h2>
          <div>
            <Link to="/add-student">
              <Button variant="contained">Add Student</Button>
            </Link>
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={logOutHandler}
            >
              Log Out
            </Button>
          </div>
        </div>
        <div className="my-body" data-testid="st-details">
          <StudentList studentData={data} />
        </div>
      </div>
    );
  } else {
    return <Unauthorised />;
  }
};

export default Home;
