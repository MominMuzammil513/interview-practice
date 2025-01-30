import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Register a user
export const registerUser = async (data) => {
  try {
    const response = await API.post("/user/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Login a user
export const loginUser = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};