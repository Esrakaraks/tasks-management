export const fetchUsers = async () => {
  const response = await fetch("/api/auth/users");
  
  if (!response.ok) {
    throw new Error("Error while fetching users");
  }
  return response.json();
};



export const loginUser = async (tc) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tc }),
  });

  if (!response.ok) {
    throw new Error("Login failed. ID Number is incorrect..");
  }

  return response.json();
};
