import { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { GET_ALL_Student } from "../GraphQLOperations/Queries";
import { Delete_Student } from "../GraphQLOperations/Mutations";
import StudentDetails from "./StudentDetails";
import AuthContext from "../store/AuthProvider";

const StudentList = ({ studentData }) => {
  console.log("Student Data", studentData);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [studentDataToBePassed, setStudentDataToBePassed] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const authCtx = useContext(AuthContext);

  const role = authCtx.userDetails.role;

  // Removing __typename that we received from graphQL by default.
  studentData = studentData?.allStudents.map((obj) => {
    const { __typename, ...rest } = obj;
    return rest;
  });

  const [deleteStudent, { loading, error }] = useMutation(Delete_Student, {
    refetchQueries: [{ query: GET_ALL_Student }],
  });

  const editHandler = (student) => {
    navigate("/edit-student", {
      state: {
        studentDetails: {
          ...student,
          dateOfBirth: student.dateOfBirth.toString().split("T")[0],
        },
      },
    });
  };

  const deleteHandler = (student) => {
    MySwal.fire({
      title: "Do you want to delete the student data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent({
          variables: { id: student.id },
        })
          .then((response) => {
            MySwal.fire({
              title: "Student Data Deleted Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch((error) => {
            console.error("Error deleting student:", error);
          });
      }
    });
  };

  const openStudentDetails = (student) => {
    setOpenDialog(true);
    setStudentDataToBePassed(student);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Roll No</th>
              <th scope="col">Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col">Course</th>
              <th scope="col">Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentData?.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>
                    <div
                      onClick={() => openStudentDetails(student)}
                      style={{ cursor: "pointer" }}
                    >
                      {student.name}
                    </div>
                  </td>
                  <td>{student.dateOfBirth.toString().split("T")[0]}</td>
                  <td>{student.gender}</td>
                  <td>{student.address}</td>
                  <td>{student.course}</td>
                  <td>{student.grade}</td>
                  {role !== "Student" && (
                    <td>
                      <BiEdit
                        color="blue"
                        fontSize="23px"
                        cursor="pointer"
                        onClick={() => editHandler(student)}
                      />
                    </td>
                  )}
                  {role !== "Student" && (
                    <td>
                      <FaTrash
                        color="red"
                        fontSize="20px"
                        cursor="pointer"
                        onClick={() => deleteHandler(student)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openDialog && (
        <StudentDetails
          studentData={studentDataToBePassed}
          onCloseDialog={closeDialog}
        />
      )}
    </>
  );
};

export default StudentList;
