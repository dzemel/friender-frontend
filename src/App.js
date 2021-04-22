import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import FrienderApi from "./FrienderApi";
import AuthContext from "./AuthContext";
import Routes from "./Routes";
import NavBar from "./NavBar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currUser, setCurrUser] = useState(null);

  function setLocalStorage(token) {
    localStorage.setItem("token", token);
    return localStorage.getItem("token");
  }

  useEffect(() => {
    if (token) {
      FrienderApi.token = token;
      const decodedToken = decodeToken(token);
      async function settingCurrUser() {
        let userData = await FrienderApi.getCurrentUser(decodedToken.username);
        setCurrUser(userData);
      }
      settingCurrUser();
      setLocalStorage(token);
    } else {
      setCurrUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  async function signup(fData) {
    try {
      const response = await FrienderApi.signup(fData);
      setToken(response.token);
      return response;
    } catch (err) {
      return err;
    }
  }

  async function login(fData) {
    try {
      const response = await FrienderApi.login(fData);
      setToken(response.token);
      return response;
    } catch (err) {
      return err;
    }
  }

  function logout() {
    setToken(null);
  }

  return (
    <div>
      <AuthContext.Provider value={{ login, signup, currUser, setCurrUser }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <Routes />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
