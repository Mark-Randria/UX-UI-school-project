import axios from "axios";
import { BASE_URL } from "./constant/url";
// import { useNavigate } from "react-router-dom";

let login = async (identity, password) => {
  const response = await axios.post(BASE_URL + "/users/login", {
    identity,
    password,
  });
  if (response.data) {
    console.log(response.data);
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

let logout = () => {
  removeToken();
};

let signup = async (
  username,
  email,
  password,
  avatar
) => {
  return axios.post(BASE_URL + "/users/signup", {
    username,
    email,
    password,
    avatar,
  });
};

let isLogged = () => {
  let token = getToken();

  if (!token) {
    return false;
  } else {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
  }

  return true;
};

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let removeToken = ()=> {
  localStorage.removeItem("token");
};

let getToken = () => {
  return localStorage.getItem("token");
};

export const AuthService = {
  login,
  saveToken,
  logout,
  isLogged,
  signup,
};