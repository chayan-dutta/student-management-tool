import { gql } from "@apollo/client";

export const Delete_Student = gql`
  mutation ($id: UUID!) {
    removeStudent(studentId: $id)
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

export const Register_User = gql`
  mutation ($newUser: UserInput!) {
    registerNewUser(user: $newUser)
  }
`;

export const Login_User = gql`
  mutation ($username: String!, $password: String!) {
    userLogin(username: $username, password: $password)
  }
`;
