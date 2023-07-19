import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the login component", () => {
  render(<App />);
  const logInComp = screen.getByLabelText("Username");
  expect(logInComp).toBeInTheDocument();
});
