import { useContext, useEffect } from "react";
import "./Home.css";
import StudentList from "./StudenLists";

import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import AuthContext from "../store/AuthProvider";
import ErrorComponent from "./ErrorComponent";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_ALL_Student);
  const navigate = useNavigate();

  const role = authCtx.userDetails.role;

  const logOutHandler = () => {
    authCtx.isAuthenticated = false;
    authCtx.userDetails = { name: "", role: "" };
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };

  if (error) {
    console.log("Error", error);
    return <ErrorComponent />;
  }

  return (
    <div>
      <div className="my-header">
        <h2>Student Management Tool</h2>
        <div>
          {role !== "Student" && (
            <Link to="/add-student">
              <Button variant="contained">Add Student</Button>
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
      <div className="my-body" data-testid="st-details">
        <StudentList studentData={data} />
      </div>
    </div>
  );
};

export default Home;
