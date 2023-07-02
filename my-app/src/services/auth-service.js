import axios from "axios";
import { BASE_URL } from "./constant/url";
// import { useNavigate } from "react-router-dom";

let login = async (username, password) => {
  const response = await axios.get(
    BASE_URL + `/comptes?username=${username}&password=${password}`,
    {
      username,
      password,
    }
  );
  let user = response.data[0];
  if (user) {
    const expirationTime = Date.now() + 60 * 60 * 1000;
    const FakeToken = {
      user: user.username,
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

let signup = async (username, email, password) => {
  axios
    .post(
      BASE_URL + "/comptes",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        const expirationTime = Date.now() + 60 * 60 * 1000;
        const FakeToken = {
          user: username,
          token: "fake-token",
          expiresAt: expirationTime,
        };
        sessionStorage.setItem("token", JSON.stringify(FakeToken));
      }
    })
    .catch((error) => {
      return error;
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
