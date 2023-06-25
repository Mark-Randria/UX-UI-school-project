import axios from "axios";
import { BASE_URL } from "./constant/url";
// import { useNavigate } from "react-router-dom";

let login = async (identity, password) => {
  const response = await axios.get(
    BASE_URL + `/comptes?identity=${identity}&password=${password}`,
    {
      identity,
      password,
    }
  );
  let user = response.data[0];
  if (user) {
    const expirationTime = Date.now() + 15 * 5 * 1000;
    const FakeToken = {
      user: user.identity,
      token: "fake-token",
      expiresAt: expirationTime,
    };
    sessionStorage.setItem("token", JSON.stringify(FakeToken));
  }
  return user;
};

let logout = () => {
  removeToken();
};

let signup = async (username, email, password, avatar) => {
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
    const parsedToken = JSON.parse(token);
    const expirationTime = parsedToken.expiresAt;

    const currentTime = Date.now();
    if (currentTime > expirationTime) {
      removeToken();
      return false;
    }
  }

  return true;
};

let saveToken = (token) => {
  sessionStorage.setItem("token", token);
};

let removeToken = () => {
  sessionStorage.removeItem("token");
};

let getToken = () => {
  return sessionStorage.getItem("token");
};

export const AuthService = {
  login,
  saveToken,
  logout,
  isLogged,
  signup,
};
