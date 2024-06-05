import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "../utils/api";
import BasicModal from "./admin/model";
import { Button } from "@mui/material";
let rows = [];

export default function LoanTable() {
  function createData(
    id,
    amount,
    interest_rate,
    total_loan_amount,
    state,
    paid,
    created
  ) {
    return {
      id,
      amount,
      interest_rate,
      total_loan_amount,
      state,
      paid,
      created,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/loan");
      rows = response?.data.map((loan) =>
        createData(
          loan.id,
          loan.attributes.amount,
          loan.attributes.interest_rate,
          loan.attributes.total_loan_amount,
          loan.attributes.state,
          loan.attributes.paid,
          loan.attributes.created
        )
      );
    };

    fetchData();
  }, []);

  const handleSubmit = (event, id, state) => {
    event.preventDefault(); // Prevent default form submission
    console.log(id, state);
    params = {
      state: state,
    };

    const fetchData = async () => {
      const response = await put(`/loan/${id}`, params);
      navigate("/home");
    };
    fetchData();
  };
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
              <TableCell align="right">{row.created}</TableCell>
              <TableCell align="right">
                {row.state == "rejected" || row.state == "closed" ? null : null}
                {row.state == "open" ? (
                  <Button
                    variant="text"
                    onClick={(e) => handleSubmit(e, row.id, "open")}
                    color="primary"
                    fullWidth
                  >
                    Pay
                  </Button>
                ) : null}
                {row.state == "approved" ? (
                  <BasicModal
                    id={row.id}
                    amount={row.amount}
                    isDesable={true}
                    ButtonText={"Confirm"}
                    NewState={"open"}
                    state={row.state}
                    interest_rate={row.interest_rate}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
