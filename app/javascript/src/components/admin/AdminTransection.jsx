import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "../../utils/api";
import { Box } from "@mui/material";
let rows = [];

export default function AdminTransection() {
  function createData(id, amount, transaction_type, created_at, user) {
    return {
      id,
      amount,
      transaction_type,
      created_at,
      user,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/admin/transactions_history");
      rows = response?.data.map((loan) =>
        createData(
          loan.attributes.id,
          loan.attributes.amount,
          loan.attributes.transaction_type,
          loan.attributes.created_at,
          loan.attributes.user
        )
      );
    };

    fetchData();
  }, []);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">transaction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="right">{row.user}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.transaction_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
