import { gql } from "@apollo/client";

export const Delete_Student = gql`
  mutation ($id: UUID!) {
    removeStudent(studentId: $id)
  }
`;

export const Update_Student1 = gql`
  mutation UpdateStudent($updatedStudentData: StudentInput!) {
    updateStdent(updatedStudent: $updatedStudentData) {
      id
      rollNo
      name
      course
      address
      dateOfBirth
      gender
      grade
    }
  }
`;

export const Update_Student = gql`
  mutation UpdateStudent($input: StudentInput!) {
    updateStdent(updatedStudent: $input) {
      id

      rollNo

      name

      course

      address

      dateOfBirth

      gender

      grade
    }
  }
`;

export const ADD_Student = gql`
  mutation ($newStudent: CreateStudentInput!) {
    addNewStudent(studentInput: $newStudent) {
      id
      rollNo
      name
      dateOfBirth
      gender
      address
      course
      grade
    }
  }
`;
