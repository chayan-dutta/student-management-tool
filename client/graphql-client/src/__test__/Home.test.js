import { render, screen } from "@testing-library/react";
import Home from "../Components/Home";

describe("Tests of Home component", () => {
  test("No of buttons", async () => {
    render(<Home />);
    const buttonList = await screen.findAllByRole("Button");
    expect(buttonList).toHaveLength(2);
  });
});
