import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import StudentForm from "./StudentForm";
import { ADD_Student } from "../GraphQLOperations/Mutations";
import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import "./CreateStudent.css";
import { Button } from "@mui/material";
import AuthContext from "../store/AuthProvider";
import Unauthorised from "./Authentication/Unauthorised";

const CreateStudent = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isAuthenticated;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [addStudent, { data, loading, error }] = useMutation(ADD_Student, {
    refetchQueries: [{ query: GET_ALL_Student }],
  });

  let student = {
    id: "59dd78cd-6dd2-4dd4-9e77-99d7c9966a23",
    rollNo: 0,
    name: "",
    dateOfBirth: null,
    gender: "Male",
    address: "",
    course: "B. Tech",
    grade: "A+",
  };

  const [studentDetails, setStudentDetails] = useState(student);

  const onNewStudentCreation = (addedStudentData) => {
    setStudentDetails(addedStudentData);
    console.log("Student to be added", addedStudentData);
    addStudent({
      variables: {
        newStudent: addedStudentData,
      },
    })
      .then((data) => {
        // Handle success if needed
        console.log("Student added successfully:", data);
        MySwal.fire({
          title: "Student Data Added Successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Great",
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/home");
          }
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error adding student:", error);
      });
  };

  const logOutHandler = () => {
    authCtx.isAuthenticated = false;
    localStorage.removeItem("LoggedInUser");
  };

  if (isLoggedIn) {
    return (
      <>
        <div className="my-header">
          <h2>Add Student</h2>
          <Link to="/home">
            <Button variant="contained">Go To Home</Button>
          </Link>
          <Link to="/">
            <Button variant="contained" onClick={logOutHandler}>
              Log Out
            </Button>
          </Link>
        </div>
        <StudentForm
          studentData={studentDetails}
          modifiedStudentData={onNewStudentCreation}
        />
      </>
    );
  } else {
    return <Unauthorised />;
  }
};

export default CreateStudent;
