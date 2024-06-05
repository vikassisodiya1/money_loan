import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { put } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props) => {
  const [open, setOpen] = useState(false);
  const [interestRate, setInterestRate] = useState(interest_rate);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { id, amount, state, interest_rate, NewState,isDesable, ButtonText } = props;

  const handleSubmit = (event, state) => {
    event.preventDefault(); // Prevent default form submission
    handleClose();
    let params = {};
    if (state.includes("rejected")) {
      params = { state: state };
    } else {
      params = {
        state: state,
        interest_rate: interestRate,
      };
    }
    const fetchData = async () => {
      const response = await put(`/loan/${id}`, params);
      navigate("/home");
    };
    fetchData();
  };

  return (
    <div>
      <Button variant="text" color="primary" onClick={handleOpen}>
        Approve
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            padding: "20px",
            maxWidth: "500px",
            margin: "auto",
            marginTop: "10%",
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            outline: "none",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Loan Request Status
          </h1>
          <form onSubmit={(e) => handleSubmit(e, `${NewState}`)}>
            <FormControl fullWidth margin="normal">
              <FormLabel htmlFor="amount">Loan Amount:</FormLabel>
              <TextField
                id="amount"
                type="number"
                value={amount}
                inputProps={{ min: 100 }}
                required
                sx={{ marginBottom: "20px" }}
              />
              <FormLabel htmlFor="interest_rate">Interest Rate:</FormLabel>
              <TextField
                id="interest_rate"
                type="number"
                value={interestRate}
                disabled={isDesable}
                onChange={(event) => setInterestRate(event.target.value)}
                inputProps={{ min: 1, step: 0.01 }}
                required
                sx={{ marginBottom: "20px" }}
              />
            </FormControl>
            <Button variant="text" type="submit" color="primary" fullWidth>
              `{ButtonText}`
            </Button>
            <Button
              variant="text"
              onClick={(e) => handleSubmit(e, "rejected")}
              color="primary"
              fullWidth
            >
              Reject
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
