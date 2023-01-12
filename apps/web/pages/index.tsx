import { Button } from "@mui/material";
import Link from "next/link";

export default function Web() {
  return (
    <Link href={'/employee/list'} passHref><Button variant='contained'>Go To List</Button></Link>
  );
}
