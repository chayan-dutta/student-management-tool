import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import StudentForm from "../UI/StudentForm";
import { ADD_Student } from "../../GraphQLOperations/Mutations";
import { GET_ALL_Student } from "../../GraphQLOperations/Queries";
import "./CreateStudent.css";
import AuthContext from "../../store/AuthProvider";
import Header from "./Header";

const CreateStudent = () => {
  const authCtx = useContext(AuthContext);
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
            navigate("/");
          }
        });
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error adding student:", error);
      });
  };

  return (
    <>
      <Header title="Add Student" isEditOrAddPage={true} />
      <StudentForm
        studentData={studentDetails}
        modifiedStudentData={onNewStudentCreation}
      />
    </>
  );
};

export default CreateStudent;
