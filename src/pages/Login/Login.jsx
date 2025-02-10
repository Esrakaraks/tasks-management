import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tc,setTc] = useState(null);
    const mutation = useMutation({      
        mutationFn: () => loginUser(tc),
        onSuccess: (data) => {
            dispatch(login(data))
            navigate(`/tasks?userId=${data.id}&role=${data.role}`);
        },
        onError: (error) => {
          alert(error.message || 'Login failed');
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();       
    }


  return (
    <Box className="login">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="TC No"
          variant="outlined"
          fullWidth
          margin="normal"
          value={tc}
          onChange={(e) => setTc(e.target.value)}
          inputProps={{ maxLength: 11 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
