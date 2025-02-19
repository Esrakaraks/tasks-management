import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",  
    tc: "",    
    role: "user", 
  });

  const mutation = useMutation({
    mutationFn: () => registerUser(userData),  
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      alert(error.message || "Failed register.");
    },
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Box className="form-container">
    <Typography variant="h6" style={{ marginTop: "10px" }} gutterBottom>
      Sign up
    </Typography>
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="TCNo"
        name="tc"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userData.tc}
        onChange={handleChange}
        inputProps={{ maxLength: 11 }}
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel> Select Role</InputLabel>
        <Select name="role" value={userData.role} onChange={handleChange}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth size="large">
        Sign up
      </Button>
    </Box>
    <Typography variant="body2" style={{ marginTop: "10px" }}>
      Do you have a account?{" "}
      <Button color="secondary" onClick={() => navigate("/login")}>
        Login
      </Button>
    </Typography>
  </Box>
  
  );
};

export default Register;
