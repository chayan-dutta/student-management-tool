import { gql } from "@apollo/client";

export const GET_ALL_Student = gql`
  query GetAllStudents {
    allStudents {
      rollNo
      id
      name
      dateOfBirth
      gender
      address
      course
      grade
    }
  }
`;
