import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    
    // If token exists, show the child component (Dashboard)
    // If not, redirect to Login
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;