import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

let rows = [];

const AdminLoanTable = () => {
  const { me } = useContext(AuthContext);
  function createData(
    id,
    amount,
    interest_rate,
    total_loan_amount,
    state,
    paid,
    user
  ) {
    return {
      id,
      amount,
      interest_rate,
      total_loan_amount,
      state,
      paid,
      user,
    };
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/admin/loan_history");
      rows = response?.data.map((loan) =>
        createData(
          loan.id,
          loan.amount,
          loan.interest_rate,
          loan.total_loan_amount,
          loan.state,
          loan.attributes.paid,
          loan.attributes.user
        )
      );
      console.log("rows", rows);
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
            <TableCell align="right">User</TableCell>
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
              <TableCell align="right">{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminLoanTable;
