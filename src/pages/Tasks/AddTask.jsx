import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { addTask } from "../../api/TasksApi";
import { useSelector } from "react-redux";

const AddTaskModal = ({ users }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [addTaskData, setAddTaskData] = useState({
    title: "",
    description: "",
    selectedUserId: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    selectedUserId: false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setAddTaskData({
        title: "",
        description: "",
        selectedUserId: user?.role === "admin" ? "" : user.id,
      });
      setOpen(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTaskData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!addTaskData.title.trim()) newErrors.title = true;
    if (!addTaskData.description.trim()) newErrors.description = true;
    if (user?.role === "admin" && !addTaskData.selectedUserId) newErrors.selectedUserId = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({
      title: addTaskData?.title,
      description: addTaskData?.description,
      userId: user?.role === "admin" ? addTaskData?.selectedUserId : user.id,
      role: user?.role,
    });
  };

  return (
    <>
      <Button className="addTask-button" variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Task
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={addTaskData?.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={errors.title}
              helperText={errors.title ? "Title is required!" : ""}
            />
            <TextField
              name="description"
              label="Description"
              value={addTaskData?.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={errors.description}
              helperText={errors.description ? "Description is required!" : ""}
            />
            {user?.role === "admin" && users?.length > 0 && (
              <FormControl fullWidth margin="normal" error={errors.selectedUserId}>
                <InputLabel>Select user</InputLabel>
                <Select
                  name="selectedUserId"
                  value={addTaskData?.selectedUserId}
                  onChange={handleChange}
                >
                  {users
                    .filter((u) => u.role === "user")
                    .map((u) => (
                      <MenuItem key={u.id} value={u.id}>
                        {u.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.selectedUserId && (
                  <Typography color="error">Admin must select a user!</Typography>
                )}
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskModal;
