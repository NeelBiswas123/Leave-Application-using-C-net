
import axios from 'axios';

const API_BASE = 'https://localhost:7030/api'; // API root

export const getEmployees = () => axios.get(`${API_BASE}/employee`);

export const getLeaveRequests = (data) =>
  axios.get(`${API_BASE}/leave`, data);

export const applyLeave = (data) =>
  axios.post(`${API_BASE}/leave`, data);

export const getMyLeaves = (employeeId) =>
  axios.get(`${API_BASE}/leave/by-employee/${employeeId}`);

export const approveLeave = (leaveId) =>
  axios.put(`${API_BASE}/leave/${leaveId}/approve`);

export const rejectLeave = (leaveId) =>
  axios.put(`${API_BASE}/leave/${leaveId}/reject`);
