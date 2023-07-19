import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import StudentForm from "../Components/StudentForm";

const findByText = (text, options) => {
  const allElements = screen.queryAllByText(text, options);
  debugger;
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

  test("renders the form fields", async () => {
    render(<StudentForm />);

    // Check if the form fields are rendered
    const rollNoInput = screen.getByTestId("rollno");
    const nameInput = screen.getByTestId("name");
    const dobInput = screen.getByLabelText("Date of Birth");
    const maleRadio = screen.getByTestId("male");
    const femaleRadio = screen.getByTestId("female");
    const otherRadio = screen.getByTestId("other");
    const cityInput = screen.getByTestId("city");
    const courseSelect = screen.getByTestId("course");
    const gradeSelect = screen.getByTestId("grade");
    const submitButton = screen.getByTestId("submit");

    expect(rollNoInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();
    expect(otherRadio).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(courseSelect).toBeInTheDocument();
    expect(gradeSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("displays error messages for invalid inputs", () => {
    render(<StudentForm />);

    const rollInput = screen.getByTestId("rollno");
    fireEvent.change(rollInput, { target: { value: "0" } });
    fireEvent.blur(rollInput);
    expect(screen.getByTestId("roll-error-message")).toBeInTheDocument();

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "ab" } });
    fireEvent.blur(nameInput);
    expect(screen.getByTestId("name-error-message")).toBeInTheDocument();

    // const cityInput = screen.getByTestId("city").querySelector("input");
    // fireEvent.change(cityInput, { target: { value: "" } });
    // fireEvent.blur(cityInput);
    // expect(screen.getByTestId("address-error-message")).toBeInTheDocument();
  });

  test("submits the form when all inputs are valid", () => {
    const modifiedStudentData = jest.fn();
    render(<StudentForm modifiedStudentData={modifiedStudentData} />);

    const rollInput = screen.getByTestId("rollno");
    fireEvent.change(rollInput, { target: { value: "123" } });

    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "Chayan" } });

    const cityInput = screen.getByTestId("city").querySelector("input");
    fireEvent.change(cityInput, { target: { value: "Kolkata" } });

    const dobInput = screen.getByLabelText("Date of Birth");

    console.log(dobInput);
    const changeEvent = { target: { value: "2020-01-01" } };
    dobInput.props.onChange(changeEvent);
    //fireEvent.input(dobInput, { target: { value: "2020-01-01" } });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    expect(modifiedStudentData).toHaveBeenCalledTimes(1);
    expect(modifiedStudentData).toHaveBeenCalledWith({
      rollNo: 123,
      name: "Chayan",
      dateOfBirth: "2020-01-01",
      address: "Kolkata",
      gender: "Male",
      course: "B. Tech",
      grade: "A+",
    });
  });
});
