import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import EmployeeForm from "../../../components/form";
import type { RootState } from '../../../store';

export default function EmployeeEdit() {
  const router = useRouter();
  const { id } = router.query;

  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee)
  
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", marginX: "auto" }}
      maxWidth={512}
    >
       <Grid container columns={2}>
        <Typography variant="h5">Edit Employee</Typography>
        <Box sx={{ ml: "auto", marginBottom: "2rem" }}>
          <Link href={`/employee/list`} passHref>
            <Button variant="contained">List View</Button>
          </Link>
        </Box>
      </Grid>
      <EmployeeForm employee={selectedEmployee} />
    </Box>
  );
}
