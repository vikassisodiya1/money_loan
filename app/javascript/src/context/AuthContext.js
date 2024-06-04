import React, { createContext, useState, useEffect } from "react";

import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
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
    console.log({
      email: email,
      password: password,
    });

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
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axiosInstance.delete("/logout", config);

      const token = response.headers?.authorization;
      console.log(response);

      // const { token } = response.data;
      localStorage.setItem("token", token);
      setAuth({ token });
    } catch (error) {
      console.error("Login failed", error);
    }
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
