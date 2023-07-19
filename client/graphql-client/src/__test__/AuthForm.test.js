import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "../Components/Authentication/AuthForm";

describe("AuthForm component", () => {
  test("renders AuthForm with proper labels and placeholders", () => {
    render(<AuthForm purpose="Submit" />);

    const usernameLabel = screen.getByLabelText("Username");
    const passwordLabel = screen.getByLabelText("Password");
    const usernameInput = screen.getByPlaceholderText("Enter username here");
    const passwordInput = screen.getByPlaceholderText("Enter password here");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("allows users to input text in username and password fields", () => {
    render(<AuthForm purpose="Submit" />);

    const usernameInput = screen.getByPlaceholderText("Enter username here");
    const passwordInput = screen.getByPlaceholderText("Enter password here");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });

  test("calls onSubmitHandler with correct data when the form is submitted", () => {
    const mockSubmitHandler = jest.fn();
    render(<AuthForm purpose="Submit" onSubmitHandler={mockSubmitHandler} />);

    const usernameInput = screen.getByPlaceholderText("Enter username here");
    const passwordInput = screen.getByPlaceholderText("Enter password here");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    expect(mockSubmitHandler).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});
