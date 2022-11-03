import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addOne, updateOne } from "../../api";
import { Employee } from "../../interfaces/employee";
import { useSnackbar } from 'notistack';

export default function EmployeeForm({ employee }: { employee?: Employee }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, handleChange, values, touched, errors ,isSubmitting} = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      number: "",
      email: "",
      gender: "M",
      ...employee,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      first_name: yup
        .string()
        .required("First name required.")
        .matches(/^[A-Za-z]+$/, "Must be only alphabets")
        // .min(6, "Must be exactly 6 characters")
        .max(10, "Must be less than 10 characters"),
      last_name: yup
        .string()
        .required("Last name required.")
        .matches(/^[A-Za-z]+$/, "Must be only alphabets")
        .min(6, "Must be exactly 6 characters")
        .max(10, "Must be less than 10 characters"),
      number: yup
        .string()
        .required("Phone Number required.")
        .matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/, "Must be a valid number"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: async(values) => {
      const emp = (employee) ? await updateOne(values) :  await addOne(values)
      dispatch({ type: "EMPLOYEE_SELECTED", payload: emp.data });
      enqueueSnackbar(employee ?"Employee Updated." :  "Employee Saved.",{key : emp?.data?._id,variant:'success'})
    },
  });

  return (
    <Box
      boxShadow={3}
      borderRadius={2}
      padding={4}
      marginX={16}
      sx={{ mx: "auto", display: "flex" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={16}>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              First Name
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="filled-basic"
                  label=""
                  variant="filled"
                  name="first_name"
                  onChange={handleChange}
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                  value={values.first_name}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Last Name{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="filled-basic"
                  label=""
                  variant="filled"
                  name="last_name"
                  onChange={handleChange}
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                  value={values?.last_name}
                />
              </FormControl>{" "}
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Email{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="filled-basic"
                  label=""
                  variant="filled"
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  value={values?.email}
                />
              </FormControl>{" "}
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Phone{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  id="filled-basic"
                  label=""
                  variant="filled"
                  name="number"
                  onChange={handleChange}
                  value={values?.number}
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item spacing={2} columns={6}>
            <Grid item xs={2}>
              Gender{" "}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="age"
                  onChange={handleChange}
                  value={values?.gender}
                  error={touched.gender && Boolean(errors.gender)}
                  // helperText={touched.gender && errors.gender}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            sx={{ ml: "auto", marginTop: "2rem" }}
            type="submit"
            disabled={isSubmitting}
          >
            {employee ? "Save" : "Add"}
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
