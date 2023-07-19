import { render, screen, fireEvent } from "@testing-library/react";
import StudentForm from "../Components/StudentForm";
import userEvent from "@testing-library/user-event";

const findByText = (text, options) => {
  const allElements = screen.queryAllByText(text, options);
  return allElements.find((element) => element.getAttribute("role") === "span");
};

describe("Student Form Tests", () => {
  test("Number of buttons", async () => {
    render(<StudentForm />);
    const btnList = await screen.findAllByRole("button");
    expect(btnList).toHaveLength(2);
  });

  test("Roll number must be a number", async () => {
    render(<StudentForm />);
    const rollNo = await screen.findByPlaceholderText("Enter Roll No");
    expect(rollNo).toHaveAttribute("type", "number");
  });

  test("displays error messages for invalid inputs", () => {
    render(<StudentForm />);

    const rollInput = screen.getByTestId("rollno");
    fireEvent.change(rollInput, { target: { value: "0" } });
    fireEvent.blur(rollInput);
    expect(findByText("Roll Number cannot be zero(0)")).toBeInTheDocument();

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "ab" } });
    fireEvent.blur(nameInput);
    expect(
      findByText("This Field is Required and should have at least 3 characters")
    ).toBeInTheDocument();

    const cityInput = screen.getByTestId("city").querySelector("input");
    fireEvent.change(cityInput, { target: { value: "" } });
    fireEvent.blur(cityInput);
    screen.debug();
    expect(
      findByText("Address is required and it should have at least 3 characters")
    ).toBeInTheDocument();
  });

  test("submits the form when all inputs are valid", () => {
    const modifiedStudentData = jest.fn();
    render(<StudentForm modifiedStudentData={modifiedStudentData} />);

    const rollInput = screen.getByTestId("rollno");
    fireEvent.change(rollInput, { target: { value: "123" } });

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const cityInput = screen.getByTestId("city").querySelector("input");
    fireEvent.change(cityInput, { target: { value: "New York" } });

    const dobInput = screen.getByTestId("dob").querySelector("input");
    fireEvent.change(dobInput, { target: { value: "2020-01-01" } });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    expect(modifiedStudentData).toHaveBeenCalledTimes(1);
    expect(modifiedStudentData).toHaveBeenCalledWith({
      rollNo: 123,
      name: "John Doe",
      dateOfBirth: "2020-01-01",
      address: "New York",
      gender: undefined,
      course: "B. Tech",
      grade: "A+",
    });
  });
});
