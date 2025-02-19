export const fetchTasks = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization error! You must log in");
  }

  const [userId, role] = queryKey;
  const response = await fetch(`/api/tasks?userId=${userId}&role=${role}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error while fetching tasks.");
  }
  return response.json();
};

export const addTask = async (taskData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization error! You must log in.");
  }

  const response = await fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("An error occurred while adding the task.");
  }
  return response.json();
};

export const updateTask = async (taskId, updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization error! You must log in..");
  }

  const response = await fetch(`/api/tasks/update/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("An error occurred while updating the task.");
  }
  return response.json();
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization error! You must log in..");
  }

  const response = await fetch(`/api/tasks/delete/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error while deleting task.");
  }
};