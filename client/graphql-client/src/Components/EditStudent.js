import { Link, useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import StudentForm from "./StudentForm";
import { Update_Student } from "../GraphQLOperations/Mutations";
import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import "./EditStudent.css";
import { Button } from "@mui/material";
import AuthContext from "../store/AuthProvider";
import Unauthorised from "./Authentication/Unauthorised";

const EditStudent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isAuthenticated;
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const navigate = useNavigate();
  let studentData = location.state.studentDetails;
  const [updateStudentDetails, setUpdateStudentDetails] = useState(studentData);

  const [updateStudent, { loading, error }] = useMutation(Update_Student, {
    refetchQueries: [{ query: GET_ALL_Student }],
  });

  const onStudentModification = (modifiedStudent) => {
    setUpdateStudentDetails(modifiedStudent);
    console.log("Modified student", modifiedStudent);
    updateStudent({
      variables: {
        input: modifiedStudent,
      },
    })
      .then((response) => {
        console.log("Student updated:", response.data.updateStudent);
        MySwal.fire({
          title: "Student Data Updated Successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Okay",
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  const logOutHandler = () => {
    authCtx.isAuthenticated = false;
    authCtx.userDetails = { name: "", role: "" };
    navigate("/login");
    localStorage.removeItem("jwtToken");
  };

  return (
    <>
      <div className="my-header">
        <h2> Edit Student </h2>
        <div>
          <Link to="/">
            <Button variant="contained">Go To Home</Button>
          </Link>
          <Button
            variant="contained"
            onClick={logOutHandler}
            style={{ marginLeft: "10px" }}
          >
            Log Out
          </Button>
        </div>
      </div>
      <StudentForm
        studentData={updateStudentDetails}
        modifiedStudentData={onStudentModification}
      />
    </>
  );
};

export default EditStudent;
