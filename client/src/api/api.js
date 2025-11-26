import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // needed if using cookies
});

export const signup = (data) => API.post("/users/signup", data);
export const login = (data) => API.post("/users/login", data);
export const googleLogin = (credential) => API.post("/users/google-login", { credential });

export default API;
