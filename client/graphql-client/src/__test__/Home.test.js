import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../Components/Home";
import { GET_ALL_Student } from "../GraphQLOperations/Queries"; // Replace with the actual import for your GraphQL query
import AuthContext from "../store/AuthProvider";
import { MemoryRouter } from "react-router-dom";

// Define the mock response for the GraphQL query
const mockResponse = {
  data: {
    allStudents: [
      {
        id: "1",
        rollNo: "101",
        name: "Chayan",
        dateOfBirth: "2000-01-01",
        gender: "Male",
        address: "Kolkata",
        course: "B. Tech",
        grade: "A+",
      },
      {
        id: "2",
        rollNo: "102",
        name: "Sanjukta",
        dateOfBirth: "2004-03-15",
        gender: "Female",
        address: "Kolkata",
        course: "B. Sc",
        grade: "B",
      },
      // Add more student objects as needed for your test cases
    ],
  },
};

// Define the mock query
const mocks = [
  {
    request: {
      query: GET_ALL_Student,
    },
    result: mockResponse,
  },
];

describe("Home component", () => {
  test("renders student list when user is authenticated", async () => {
    // Mock AuthProvider to return isAuthenticated: true
    jest.mock("../store/AuthProvider", () => ({
      __esModule: true,
      useAuth: () => ({ isAuthenticated: true }), // Mock useAuth to return true
    }));

    render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );

    // Check if the loading state is shown (optional, if you have a loading indicator)
    const headerElement = screen.getByTestId("st-details");
    expect(headerElement).toBeInTheDocument();

    // Wait for the query to resolve and component to render the student list
    await waitFor(() => {
      // Check if the Add Student and Log Out buttons are rendered
      const addStudentButton = screen.getByText("Add Student");
      const logOutButton = screen.getByText("Log Out");
      expect(addStudentButton).toBeInTheDocument();
      expect(logOutButton).toBeInTheDocument();

      // Check if the student list is rendered
      const studentItem1 = screen.getByText("Chayan");
      const studentItem2 = screen.getByText("Sanjukta");
      expect(studentItem1).toBeInTheDocument();
      expect(studentItem2).toBeInTheDocument();
    });
  });

  test("renders Unauthorised component when user is not authenticated", () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </MockedProvider>
      </AuthContext.Provider>
    );

    // Check if the Unauthorised component is rendered
    const unauthorisedComponent = screen.getByTestId("unauthorised-component");
    expect(unauthorisedComponent).toBeInTheDocument();
  });
});
