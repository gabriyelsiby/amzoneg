import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

// Example for Vercel: VITE_API_URL=https://amzoneg-ce356peuw-gabriyel-sibys-projects-72d0d689.vercel.app/api

const API = axios.create({
  baseURL,
  withCredentials: true, // needed if using cookies
});

export const signup = (data) => API.post("/users/signup", data);
export const login = (data) => API.post("/users/login", data);
export const googleLogin = (credential) => API.post("/users/google-login", { credential });

export default API;
