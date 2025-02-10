import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";
import { addTask } from "../../api/TasksApi";
import { useSelector } from "react-redux";

const AddTaskModal = ({users}) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [addTaskData, setAddTaskData] = useState({
    title: "",
    description: "",
    selectedUserId:  "",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setAddTaskData({
        title: "",
        description: "",
        selectedUserId: user.role === "admin" ? "" : user.id,
      });
      setOpen(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title: addTaskData.title,
      description: addTaskData.description,
      userId: user.role === "admin" ? addTaskData.selectedUserId : user.id,
      role: user.role,
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
      Add New Task
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={addTaskData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={addTaskData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {user.role === "admin" && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Select user</InputLabel>
                <Select
                  name="selectedUserId"
                  value={addTaskData.selectedUserId}
                  onChange={handleChange}
                >
                  {
                    users
                      .filter((u) => u.role === "user")
                      .map((u) => (
                        <MenuItem key={u.id} value={u.id}>
                          {u.name}
                        </MenuItem>
                      ))
                  }
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
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
