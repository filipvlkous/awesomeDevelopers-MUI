import { getByTestId, render, screen } from "@testing-library/react";
import DepartmentChip from "../components/department";

describe("DepartmentChip", () => {
  it("renders with correct background color for Marketing department", () => {
    render(<DepartmentChip name="Marketing" />);
    const chipElement = screen.getByTestId("Chip");
    expect(chipElement).toHaveStyle("background-color: #0000FF");
  });

  it("renders with correct background color for IT department", () => {
    render(<DepartmentChip name="It" />);
    const chipElement = screen.getByTestId("Chip");
    expect(chipElement).toHaveStyle("background-color: #FF4233");
  });

  // Add similar tests for other departments...

  it("renders with default background color for unknown department", () => {
    render(<DepartmentChip name="Unknown" />);
    const chipElement = screen.getByTestId("Chip");
    expect(chipElement).toHaveStyle("background-color: #79767A");
  });
});
