import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/form";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

describe("Form", () => {
  it("submits the form when all required fields are filled and the checkbox is checked", async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: "Add new visitor",
    });

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(checkbox.checked).toBe(false);
  });

  it("does not submit the form when the checkbox is not checked", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
      name: "Add new visitor",
    });

    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("john@example.com");
    expect(checkbox.checked).toBe(false);
  });

  //   test("does not submit the form when any required field is missing", () => {
  //     render(<Form />);
  //     const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  //     const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  //     const departmentInput = screen.getByLabelText(
  //       "Department"
  //     ) as HTMLInputElement;
  //     const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
  //     const submitButton = screen.getByRole("button", {
  //       name: "Add new visitor",
  //     });
  //     const resetButton = screen.getByRole("button", { name: "Reset form" });

  //     fireEvent.change(nameInput, { target: { value: "John" } });
  //     fireEvent.change(emailInput, { target: { value: "" } });
  //     fireEvent.change(departmentInput, { target: { value: "Marketing" } });
  //     fireEvent.click(checkbox);
  //     fireEvent.click(submitButton);

  //     expect(nameInput.value).toBe("John");
  //     expect(emailInput.value).toBe("");
  //     expect(departmentInput.value).toBe("Marketing");
  //     expect(checkbox.checked).toBe(false);
  //   });

  //   test("resets the form when the reset button is clicked", () => {
  //     render(<Form />);
  //     const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  //     const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  //     const departmentInput = screen.getByLabelText(
  //       "Department"
  //     ) as HTMLInputElement;
  //     const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
  //     const submitButton = screen.getByRole("button", {
  //       name: "Add new visitor",
  //     });
  //     const resetButton = screen.getByRole("button", { name: "Reset form" });

  //     fireEvent.change(nameInput, { target: { value: "John" } });
  //     fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  //     fireEvent.change(departmentInput, { target: { value: "Marketing" } });
  //     fireEvent.click(resetButton);

  //     expect(nameInput.value).toBe("");
  //     expect(emailInput.value).toBe("");
  //     expect(departmentInput.value).toBe("");
  //     expect(checkbox.checked).toBe(false);
  //   });
});
