import http from "./httpService";
import JWTDecode from "jwt-decode";
import { toast } from "react-toastify";

export const signup = async user => {
  const {
    data: { token },
  } = await http.post('http://localhost:5000/api/users/register', user);
  localStorage.setItem("token", token);
  setToken(token);

};

export const login = async user => {
  const {
    data: { token },
  } = await http.post('http://localhost:5000/api/users/login', user);
  localStorage.setItem("token", token);
  setToken(token);
   // Decode the token to extract the necessary information
   const decodedToken = JWTDecode(token);
   return {
     isAdmin: decodedToken.isAdmin,
   };
};


export const logout = () => {
  localStorage.removeItem("token");
  toast.success("התנתקת בהצלחה");
  console.log("LogOut successfully!");
  setTimeout(() => {
    return (window.location = "/");
  }, 2000);
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return JWTDecode(token);
  } catch {
    return null;
  }
};

export const loadUserDataFromToken = async () => {
  const tokenCookie = localStorage.getItem("token");
  if (tokenCookie) {
    const userData = await JWTDecode(tokenCookie);
    return { userData, isAuthenticated: true };
  }
  return { userData: null, isAuthenticated: false };
};

export const getJWT = () => localStorage.getItem("token");

export const getUsers = () => http.get('http://localhost:5000/api/users/');

// Helper functions
const setToken = (token) => {
  localStorage.setItem("token", token);
  scheduleTokenExpiration();
};

const getToken = () => localStorage.getItem("token");

const removeToken = () => {
  localStorage.removeItem("token");
};

const scheduleTokenExpiration = () => {
  const token = getToken();
  if (token) {
    const decodedToken = JWTDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    setTimeout(removeToken, timeUntilExpiration);
  }
};