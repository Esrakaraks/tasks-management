import React, { useState } from "react";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../../api/TasksApi";
import { fetchUsers } from "../../api/AuthApi";
import { List, ListItem, ListItemText, Checkbox, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddTaskModal from "./AddTask";
import EditTask from "./EditTask";

const Tasks = () => {
  const queryClient = useQueryClient();
  const user = useSelector(state => state.user.user);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: tasks} = useQuery({
    queryKey: [user?.id, user?.role],
    queryFn: fetchTasks,
    enabled: !!user && !!user.role
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!user && user.role === "admin",
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });


  return (
    <Box className='Tasks-container'>
      {<AddTaskModal users={users } />}
      <List>
        {tasks?.map(task => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.status === "Completed"}
              color="primary"
            />
            <ListItemText
              primary={task.title}
              secondary={task.description}
            />
            {(user.role === "admin" || user.id === task.userId) && (
              <IconButton onClick={() => setSelectedTask(task)} color="primary">
                <EditIcon />
                {selectedTask && <EditTask open={!!selectedTask} handleClose={() => setSelectedTask(null)} task={selectedTask} users={users} />}
              </IconButton>
            )}
            {(user.role === "admin" || user.id === task.userId) && (
              <IconButton onClick={() => deleteMutation.mutate(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Tasks;
