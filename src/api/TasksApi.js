export const fetchTasks = async ({ queryKey }) => {
    const [userId, role] = queryKey;
    const response = await fetch(`/api/tasks?userId=${userId}&role=${role}`);
    
    if (!response.ok) {
      throw new Error("Error while fetching tasks.");
    }
    return response.json();
  };
  
export const addTask = async (taskData) => {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("An error occurred while adding the task.");
    }
    return response.json();
};
  

export const updateTask = async (taskId, updatedData) => {
    const response = await fetch(`/api/tasks/update/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("An error occurred while updating the task.");
    }
    return response.json();
};
  
export const deleteTask = async (taskId) => {
  const response = await fetch(`/api/tasks/delete/${taskId}`, {
      method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error while deleting task.");
  }
  };
  