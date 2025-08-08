import React, { useState, useEffect } from "react";
import { getEmployees } from "../services/api"; 
import Table from "react-bootstrap/Table";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch employees!", { position: "top-right" });
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      <h3 className="text-center my-3">Employee Details</h3>

      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={emp.id || index}>
                <td>{index + 1}</td>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Loading Employee data...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeDashboard;
