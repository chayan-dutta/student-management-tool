import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import StudentList from "./UI/StudenLists";
import "./Home.css";
import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import AuthContext from "../store/AuthProvider";
import ErrorComponent from "./OtherPages/ErrorComponent";
import Header from "./MainPages/Header";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_ALL_Student);

  const role = authCtx.userDetails.role;

  if (error) {
    console.log("Error", error);
    return <ErrorComponent />;
  }

  return (
    <div>
      <Header role={role} />
      <div className="my-body" data-testid="st-details">
        <StudentList studentData={data} />
      </div>
    </div>
  );
};

export default Home;
