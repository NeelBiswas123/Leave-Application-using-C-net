
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeDashboard from "../pages/EmployeeDashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplyLeave from '../pages/ApplyLeave';
import MyLeaves from '../pages/MyLeaves';
import AdminDashboard from '../pages/AdminDashboard';
import EmployeeDetails from '../pages/EmployeeDetails';
import LoginForm from '../pages/Login';


const AppRoutes = () => (
    <div>
            
  <Routes>
    <Route path="/" element={<EmployeeDashboard />} />
    <Route path="/apply-leave" element={<ApplyLeave />} />
    <Route path="/my-leaves" element={<MyLeaves />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/employee-details" element={<EmployeeDetails />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
    </div>
);

export default AppRoutes;
