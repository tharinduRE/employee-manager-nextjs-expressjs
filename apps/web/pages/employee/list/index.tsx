import GridIcon from "@mui/icons-material/GridView";
import TableIcon from "@mui/icons-material/TableRows";
import { Alert, Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { deleteOne, getEmployeeList } from "../../../api";
import ConfirmationDialog from "../../../components/confirmDialog";
import GridView from "../../../components/gridView";
import { TableView } from "../../../components/tableView";
import { RootState } from "../../../store";

export default function EmployeeListPage() {
  const router = useRouter();
  const { view } = router.query;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {selectedEmployee,order,orderBy} = useSelector(
    (state: RootState) => state.employee
  );
  
  const { data: data, error } = useSWR(`employees-${orderBy}-${order}`, () => getEmployeeList(order,orderBy), {
    revalidateOnFocus: false,
  });


  const onEdit = (row: any) => {
    dispatch({ type: "EMPLOYEE_SELECTED", payload: row });
    router.push(`/employee/edit/${row._id}`);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const onDeleteButton = (row: any) => {
    dispatch({ type: "EMPLOYEE_SELECTED", payload: row });
    setOpenConfirmDialog(true);
  };

  const onCloseConfirmationDialog = () => {
    setOpenConfirmDialog(false);
  };

  const onDelete = async () => {
    try {
      await deleteOne(selectedEmployee?._id);
      dispatch({ type: "EMPLOYEE_SELECTED", payload: null });
      enqueueSnackbar(`Successfully Deleted Employee`, { variant: "success" });
      mutate("employees");
    } catch (error) {
      enqueueSnackbar("Error Occured while deleteing", { variant: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  if (error)
    return <Alert severity="error">Error Occured during fetching data</Alert>;
  return (
    <div>
      <Box sx={{ display: "flex" }} marginBottom={4}>
        <Box sx={{ ml: "auto" }}>
          <Link passHref href={`/employee/add`}>
            <Button variant="contained">Add Employee</Button>
          </Link>
          <IconButton
            aria-label="grid"
            color="primary"
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { view: view === "grid" ? "" : "grid" },
              })
            }
          >
            {view === "grid" ? <TableIcon /> : <GridIcon />}
          </IconButton>
        </Box>
      </Box>
      {view == "grid" ? (
        <GridView data={data?.data} onEdit={onEdit} onDelete={onDeleteButton} />
      ) : (
        <TableView
          data={data?.data}
          onEdit={onEdit}
          onDelete={onDeleteButton}
        />
      )}
      <ConfirmationDialog
        open={openConfirmDialog}
        keepMounted={false}
        onClose={onCloseConfirmationDialog}
        id="confirmDialog"
        onAccept={onDelete}
      >
        Confirm Delete ?{" "}
      </ConfirmationDialog>
    </div>
  );
}
