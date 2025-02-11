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
} from "@mui/material";
import { updateTask } from "../../api/TasksApi";
import { useSelector } from "react-redux";

const EditTask = ({ open, handleClose, task, users }) => {
  const user = useSelector((state) => state.user.user);
  const [editData, setEditData] = useState({
    id: task?.id,
    title: task?.title,
    description: task?.description,
    status: task?.status,
    userId: task?.userId,
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
  };

  const handleStatusChange = () => {
    setEditData((prev) => ({
      ...prev,
      status: prev.status === "Completed" ? "InComplete" : "Completed",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      taskId: editData.id,
      updatedData: { ...editData, role: user.role },
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
                checked={editData.status === "Completed"}
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
          />

          <TextField
            name="description"
            label="Description"
            value={editData?.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {user?.role === "admin" &&  users?.length > 0 && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Select user</InputLabel>
              <Select
                name="userId"
                value={editData.userId}
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
