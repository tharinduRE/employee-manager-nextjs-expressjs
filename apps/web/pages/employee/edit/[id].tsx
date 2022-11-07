import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { getEmployeeById } from "../../../api";
import EmployeeForm from "../../../components/form";
import type { RootState } from "../../../store";

export default function EmployeeEdit() {
  const router = useRouter();
  const { id } = router.query;

  const selectedEmployee = useSelector(
    (state: RootState) => state.employee.selectedEmployee
  );

  const { data: data, error } = useSWR(
    !selectedEmployee && id ? `employe-${id}` : null,
    () => getEmployeeById(String(id)),
    {
      revalidateOnFocus: false,
    }
  );

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
      {!data && !selectedEmployee ? (
        error ? (
          <Alert severity="error">No Matching Employee Found</Alert>
        ) : (
          <CircularProgress />
        )
      ) : (
        <EmployeeForm employee={selectedEmployee || data?.data} />
      )}
    </Box>
  );
}
