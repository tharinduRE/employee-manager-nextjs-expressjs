import GridIcon from "@mui/icons-material/GridView";
import TableIcon from "@mui/icons-material/TableRows";
import {
  Box,
  Button, IconButton
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getEmployeeList } from "../../../api";
import GridView from "../../../components/gridView";
import { TableView } from "../../../components/tableView";

export default function EmployeeListPage() {
  const router = useRouter();
  const { view } = router.query;

  const { data: data, error } = useSWR(`employees`, getEmployeeList);
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
       <GridView data={data?.data} />
        ) : (
        <TableView data={data?.data} />
      )}
    </div>
  );
}