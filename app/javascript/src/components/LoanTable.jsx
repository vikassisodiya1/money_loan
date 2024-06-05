import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "../utils/api";
let rows = [];

export default function LoanTable() {
  function createData(
    id,
    amount,
    interest_rate,
    total_loan_amount,
    state,
    paid,
    created_at
  ) {
    return {
      id,
      amount,
      interest_rate,
      total_loan_amount,
      state,
      paid,
      created_at,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/loan");
      console.log(response);
      rows = response?.data.map((loan) =>
        createData(
          loan.id,
          loan.attributes.amount,
          loan.attributes.interest_rate,
          loan.attributes.total_loan_amount,
          loan.attributes.state,
          loan.attributes.paid,
          loan.attributes.created_at
        )
      );
      console.log(rows);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Interest Rate</TableCell>
            <TableCell align="right">Total Loan Amount</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
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
              <TableCell align="right">{row.interest_rate}</TableCell>
              <TableCell align="right">{row.total_loan_amount}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.paid}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
