import React, { useContext } from 'react';
import { Route, redirect } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import { Navigate } from 'react-router-dom/dist';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/log_in" />;
};

export default PrivateRoute;
