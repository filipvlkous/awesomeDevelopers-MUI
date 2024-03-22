import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { setRows } from "../Redux/DataSlice";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Visitor",
    minWidth: 50,
    maxWidth: 200,
    flex: 1,
  },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "department",
    headerName: "Department",
    minWidth: 150,
  },
];

export default function Index() {
  const nbRows = useSelector((state: RootState) => state.rows);
  const dispatch = useDispatch<AppDispatch>();

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]); // Define a function to get the IDs of selected items

  const removeRow = () => dispatch(setRows(deleteRows()));

  const deleteRows = () => {
    // filter metoda O(n)
    let foundItems = nbRows.filter(
      (item) => !rowSelectionModel.includes(item.id)
    );

    return foundItems;
  };

  return (
    <Box
      sx={{
        width: "97%",
        backgroundColor: "white",
        boxShadow: 2,
        borderRadius: 2,
      }}
      p={2}
    >
      <Typography variant="h4" sx={{ paddingBottom: 1 }}>
        Visitor managment
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Checkbox sx={{ paddingLeft: "12px" }} />
        <Button
          color="error"
          onClick={removeRow}
          variant="contained"
          sx={{ borderRadius: 25, color: "white" }}
          size="small"
        >
          Remove
        </Button>
      </Stack>
      <DataGrid
        sx={{ border: "none" }}
        rows={nbRows}
        columns={columns}
        hideFooter
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel: any) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
}
