import GridIcon from "@mui/icons-material/GridView";
import TableIcon from "@mui/icons-material/TableRows";
import { Alert, Box, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { deleteOne, getEmployeeList } from "../../../api";
import ConfirmationDialog from "../../../components/confirmDialog";
import GridView from "../../../components/gridView";
import { TableView } from "../../../components/tableView";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { EMPLOYEE_SELECTED } from "../../../store/reducers/employee";

export default function EmployeeListPage() {
  const router = useRouter();
  const { view } = router.query;
  
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {selectedEmployee,order,orderBy} = useAppSelector((state)=>state.employee)
  
  const { data: data, error } = useSWR(`employees-${orderBy}-${order}`, () => getEmployeeList(order,orderBy), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
  });
  
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onEdit = (row: any) => {
    dispatch({ type: EMPLOYEE_SELECTED, payload: row });
    router.push(`/employee/edit/${row._id}`);
  };

  const onDelete = (row: any) => {
    dispatch({ type: EMPLOYEE_SELECTED, payload: row });
    setOpenConfirmDialog(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteOne(selectedEmployee?._id);
      dispatch({ type: EMPLOYEE_SELECTED, payload: null });
      mutate(`employees-${orderBy}-${order}`)
      enqueueSnackbar(`Successfully Deleted Employee`, { variant: "success" });
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
        <GridView data={data?.data} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <TableView
          data={data?.data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      <ConfirmationDialog
        open={openConfirmDialog}
        keepMounted={false}
        onClose={() => setOpenConfirmDialog(false)}
        id="confirmDialog"
        onAccept={onDeleteConfirmation}
      >
        Confirm Delete ?{" "}
      </ConfirmationDialog>
    </div>
  );
}
