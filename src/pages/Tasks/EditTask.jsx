import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { updateTask } from "../../api/TasksApi";
import { useSelector } from "react-redux";

const EditTask = ({ open, handleClose, task, users }) => {
  const user = useSelector((state) => state.user.user);
  const [editData, setEditData] = useState({
    id: task?.id,
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "InComplete",
    userId: task?.userId || "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    userId: false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, updatedData }) => updateTask(taskId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      handleClose();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleStatusChange = () => {
    setEditData((prev) => ({
      ...prev,
      status: prev.status === "Completed" ? "InComplete" : "Completed",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!editData.title.trim()) newErrors.title = true;
    if (!editData.description.trim()) newErrors.description = true;
    if (user?.role === "admin" && !editData.userId) newErrors.userId = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate({
      taskId: editData.id,
      updatedData: { ...editData, role: user?.role },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editData?.status === "Completed"}
                onChange={handleStatusChange}
                color="primary"
              />
            }
            label="Task Completed?"
          />

          <TextField
            name="title"
            label="Title"
            value={editData?.title}
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
            value={editData?.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            error={errors.description}
            helperText={errors.description ? "Description is required!" : ""}
          />

          {user?.role === "admin" && users?.length > 0 && (
            <FormControl fullWidth margin="normal" error={errors.userId}>
              <InputLabel>Select user</InputLabel>
              <Select
                name="userId"
                value={editData?.userId}
                onChange={handleChange}
              >
                {users
                  ?.filter((u) => u.role === "user")
                  .map((u) => (
                    <MenuItem key={u.id} value={u?.id}>
                      {u.name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.userId && (
                <Typography color="error">Admin must select a user!</Typography>
              )}
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTask;
