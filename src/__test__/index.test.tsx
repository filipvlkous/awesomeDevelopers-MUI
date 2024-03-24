import { render, fireEvent, waitFor } from "@testing-library/react";
import Index from "../components/index"; // Assuming your component file is named Index.tsx
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

describe("Index component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Index />
      </Provider>
    );
  });

  test("handleSelectAll selects all rows when no rows are selected", async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <Index />
      </Provider>
    );

    // Simulate clicking on the custom checkbox to select all
    fireEvent.click(getByTestId("CustomCheckbox"));

    // Check if all rows are selected
    expect(getByTestId("CustomCheckbox")).toHaveProperty("checked", true);

    // Click the remove button
    // fireEvent.click(queryByText("Remove"))

    // Wait for state update
    await waitFor(() => {});

    // Check if all rows are removed
    expect(queryByText("Remove")).not.toBeInTheDocument();
    // Add assertion for `rowSelectionModel` containing expected IDs
  });
  //   it('removes selected rows when "Remove" button is clicked', () => {
  //     const { getByText, getByLabelText } = render(
  //       <Provider store={store}>
  //         <Index />
  //       </Provider>
  //     );
  //     const removeButton = getByText("Remove");

  //     // Check a row
  //     const firstRowCheckbox = getByLabelText("Checkbox");
  //     fireEvent.click(firstRowCheckbox);

  //     // Click "Remove" button
  //     fireEvent.click(removeButton);

  //     // Verify the row is removed
  //     expect(firstRowCheckbox).not.toBeInTheDocument();
  //   });
});
