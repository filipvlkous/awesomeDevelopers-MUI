import { Chip } from "@mui/material";

const departmentColors = {
  Marketing: "#0000FF",
  It: "#FF4233",
  Sales: "#33FF35",
  Managment: "#E1AD29",
  Accounting: "#BE29E1",
} as const;

export default function DepartmentChip({ name }: { name: string }) {
  const colorChipBg =
    departmentColors[name as keyof typeof departmentColors] || "#79767A";

  return (
    <Chip
      data-testid="Chip"
      label={name}
      sx={{
        backgroundColor: colorChipBg,
        color: "#fff",
      }}
    />
  );
}
