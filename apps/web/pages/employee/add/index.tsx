import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EmployeeForm from "../../../components/form";

export default function EmployeeAdd() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", marginX: "auto" }}
      maxWidth={512}
    >
      <Grid container columns={2}>
        <Typography variant="h5">Add New Employee</Typography>
        <Box sx={{ ml: "auto", marginBottom: "2rem" }}>
          <Link href={`/employee/list`} passHref>
            <Button variant="contained">List View</Button>
          </Link>
        </Box>
      </Grid>
      <EmployeeForm />
    </Box>
  );
}
