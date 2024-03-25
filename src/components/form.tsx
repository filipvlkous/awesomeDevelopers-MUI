import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RestoreIcon from "@mui/icons-material/Restore";
import { useDispatch, useSelector } from "react-redux";
import { DataObj, addRow } from "../Redux/DataSlice";
import { RootState } from "../Redux/Store";
import { useRef, useState } from "react";

const variants = ["Marketing", "It", "Sales", "Managment", "Accounting"];
/**
+ * Component that renders the form for adding new visitors
+ * @returns {JSX.Element} The form component
+ */
export default function Form() {
  // reference to form element
  const formRef = useRef<HTMLFormElement>(null);
  // array of existing visitors from redux store
  const nbRows = useSelector((state: RootState) => state.rows);
  // function to dispatch actions to redux store
  const dispatch = useDispatch();
  // state that holds the checked value of the checkbox
  const [checked, setChecked] = useState(false);

  /**
   * Handle form submission by creating a new visitor object and dispatching action to add it to the redux store
   * @param {React.FormEvent} e Event object
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if the checkbox is not checked, do not submit the form
    if (checked === false) return;

    const formEle = e.target as HTMLFormElement;

    const formData = new FormData(formEle);

    /**
     * Generate a unique id for the new visitor
     * @returns {number} The unique id
     */
    const generateUniqueId = (): number => {
      const randomNumber = getRandom();
      // check if the id is unique from existing visitors
      const isUnique = nbRows.every((item) => item.id !== randomNumber);
      // if the id is unique, return it, otherwise call the function again
      return isUnique ? randomNumber : generateUniqueId();
    };

    const uniqueId = generateUniqueId();

    // create a new visitor object with form values and the unique id
    const data: DataObj = {
      id: uniqueId,
      name: formData.get("Name") as string,
      email: formData.get("Email") as string,
      department: formData.get("Department") as string,
    };
    // dispatch action to add the new visitor to the redux store
    dispatch(addRow(data));
    // reset the checked state to false
    setChecked(false);
    // reset the form
    formRef.current?.reset();
  };

  return (
    <Box
      width={"95%"}
      sx={{ backgroundColor: "white" }}
      borderRadius={2}
      boxShadow={2}
      p={2}
    >
      <Typography variant="h6">Add new visitor</Typography>
      <Typography variant="subtitle1" fontWeight={"light"}>
        Fill name, email adress, and department
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ paddingTop: 2 }}
        ref={formRef}
      >
        <Stack spacing={3}>
          <TextField
            data-testid="Name"
            type="input"
            name="Name"
            label="Name"
            placeholder="John"
            color="secondary"
            focused
          />
          <TextField
            data-testid="Email"
            type="email"
            name="Email"
            label="Email"
            placeholder="john@email.com"
            required
            color="secondary"
            focused
          />
          <TextField
            type="option"
            data-testid="Department"
            name="Department"
            id="outlined-select-currency"
            label="Department"
            defaultValue="Marketing"
            color="secondary"
            select
            focused
          >
            {variants.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Checkbox
              data-testid="Checkbox"
              checked={checked}
              value={checked}
              sx={{ paddingLeft: "12px" }}
              required
              onClick={() => {
                setChecked(!checked);
              }}
            />
            <Typography>I agree to be added to the table</Typography>
          </Stack>

          <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              sx={{ borderRadius: 25 }}
              size="medium"
              type="reset"
              onClick={() => setChecked(false)}
            >
              Reset form
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              sx={{ borderRadius: 25, width: 200 }}
              size="medium"
              type="submit"
            >
              Add new visitor
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

const getRandom = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  return randomNumber;
};
