import React, { createContext, useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";
import { get } from "../utils/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  const [me, setMe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }

    const fetchData = async () => {
      const response = await get("/profile");
      console.log(response.data.attributes);
      setMe(response.data.attributes);
    };

    fetchData();
  }, []);

  const register = async (firstName, lastName, email, password, isAdmin) => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      admin: isAdmin,
    };

    try {
      const response = await axiosInstance.post("/signup", { user: params });
      console.log(response);
      const { token } = response.headers.authorization;
      localStorage.setItem("token", token);
      setAuth(token);
      window.location.href = "/home";
    } catch (error) {
      console.error("registrations failed", error);
    }
  };

  const login = async (email, password, remember) => {

    const params = { email: email, password: password, remember: remember };

    try {
      const response = await axiosInstance.post("/login", { user: params });
      const token = response.headers?.authorization;

      localStorage.setItem("token", token);
      setAuth(token);
      window.location.href = "/home";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axiosInstance.delete("/logout", config);
    } catch (error) {
      console.error("Logut failed", error);
    }
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, me, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
