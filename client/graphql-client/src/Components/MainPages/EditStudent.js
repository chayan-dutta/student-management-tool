import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import StudentForm from "../UI/StudentForm";
import { Update_Student } from "../../GraphQLOperations/Mutations";
import { GET_ALL_Student } from "../../GraphQLOperations/Queries";
import "./EditStudent.css";
import Header from "../MainPages/Header";

const EditStudent = () => {
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

  return (
    <>
      <Header title="Edit Student" isEditOrAddPage={true} />
      <StudentForm
        studentData={updateStudentDetails}
        modifiedStudentData={onStudentModification}
      />
    </>
  );
};

export default EditStudent;
