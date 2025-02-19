export const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Yetkilendirme hatası! Giriş yapmalısınız.");
  }

  const response = await fetch("/api/auth/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
    throw new Error("Login failed. ID Number is incorrect.");
  }

  const data = await response.json();  
  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed. Check your Tc.");
  }

  return response.json();
};
