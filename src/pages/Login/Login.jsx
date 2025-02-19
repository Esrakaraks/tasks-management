import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tc,setTc] = useState("");
    const mutation = useMutation({      
        mutationFn: () => loginUser(tc),
        onSuccess: (data) => {
            dispatch(login(data))
            navigate(`/tasks?userId=${data.user.id}&role=${data.user.role}`);
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
    <Box className="form-container">
      <Typography variant="h6" style={{ marginTop: "10px" }} gutterBottom>
        Sign In
      </Typography>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="TC No"
        variant="outlined"
        fullWidth
        margin="normal"
        value={tc || ""}
        onChange={(e) => setTc(e.target.value)}
        inputProps={{ maxLength: 11 }}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth size="large">
        Login
      </Button>
    </Box>
    <Typography variant="body2" style={{ marginTop: "10px" }}>
        Do you want to register?
        <Button color="secondary"  onClick={() => navigate("/Register")}>
          Register
        </Button>
    </Typography>
  </Box>
  
  );
};

export default Login;
