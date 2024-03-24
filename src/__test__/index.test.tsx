import { render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import Index from "../components/index"; // Assuming your component file is named Index.tsx
import { Provider } from "react-redux";
// import { store } from "../Redux/Store";
import { StoreEnhancer, UnknownAction } from "redux";
import {
  EnhancedStore,
  ThunkDispatch,
  Tuple,
  configureStore,
} from "@reduxjs/toolkit";
import { DataState } from "../Redux/DataSlice";
import dataSlice from "./testStore";

let store: EnhancedStore<
  DataState,
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<DataState, undefined, UnknownAction>;
      }>,
      StoreEnhancer
    ]
  >
>;
describe("Index component", () => {
  beforeEach(() => {
    store = createTestStore();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Index />
      </Provider>
    );
  });

  test("removes selected rows when remove button is clicked", async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Index />
      </Provider>
    );

    const checkbox = getByTestId("CustomCheckbox");
    const removeButton = getByText("Remove");
    fireEvent.click(checkbox);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(getByText("Visitor managment")).toBeInTheDocument();
    });
  });
});

export function createTestStore() {
  const store = configureStore({
    reducer: dataSlice,
  });
  return store;
}
