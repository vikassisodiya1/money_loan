import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import LogoutIcon from "@mui/icons-material/Logout";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { get } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeProvider } from "styled-components";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

let rows = [];
export default function AdminLoanRequest() {
  function createData(id, amount, state, user, created) {
    return {
      id,
      amount,
      state,
      user,
      created,
    };
  }

  const { me } = useContext(AuthContext);
  const defaultTheme = createTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await get("/admin/loan_requests");
      console.log(response);
      rows = response?.data.map((loan) =>
        createData(
          loan.id,
          loan.attributes.amount,
          loan.attributes.state,
          loan.attributes.user,
          loan.attributes.created
        )
      );
      console.log({ roe: rows });
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <Button color="inherit" variant="text">
              <LogoutIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell align="right">State</TableCell>
                        <TableCell align="right">Created At</TableCell>
                        <TableCell align="right">User name</TableCell>
                        <TableCell align="right">Not approved</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.amount}
                          </TableCell>
                          <TableCell align="right">{row.state}</TableCell>
                          <TableCell align="right">{row.created}</TableCell>
                          <TableCell align="right">{row.user}</TableCell>
                          <Button color="inherit" variant="text">
                            Approve`
                          </Button>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
