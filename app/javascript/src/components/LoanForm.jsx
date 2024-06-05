import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { post } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoanForm = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const fetchData = async () => {
      const response = await post("/loan",{state: 'requested', amount: amount});
      navigate('/home')
    };
    fetchData();
  };

  return (
    <div>
      <h1>Request Loan</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="amount">Loan Amount:</FormLabel>
          <TextField
            id="amount"
            label="Loan Amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            inputProps={{ min: 100 }}
            placeholder="Enter your loan amount"
            required
          />
        </FormControl>
        <Button variant="contained" type="submit" color="primary">
          Submit Loan Request
        </Button>
      </form>
    </div>
  );
};

export default LoanForm;
