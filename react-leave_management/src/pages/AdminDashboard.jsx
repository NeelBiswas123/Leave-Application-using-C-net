import React from "react";
import { useState, useEffect } from "react";
import { approveLeave, rejectLeave , getLeaveRequests} from "../services/api";
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const handleApprove = (id) => approveLeave(id);
//   const handleReject = (id) => rejectLeave(id);



const AdminDashboard = () => {
  const [data, setData] = useState([]);

  const [activeId, setActiveId] = useState(null);


useEffect(() => {
  getLeaveRequests()
    .then((response) => {
    //   console.log("Leave requests fetched:", response);
      setData(response.data); // or response if not using Axios
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}, []);



 const handleApprove = async (leaveId) => {
  try {
    await approveLeave(leaveId);
    toast.success("Leave Request changed to accepted!", { position: "top-right" });
    const updated = await getLeaveRequests();
    setData(updated.data); // refresh table

  } catch (error) {
    toast.error("Form was not changed as accepted!", { position: "top-right" });
    console.error(error);
  }
};



const handleReject = async (leaveId) => {
  try {
    await rejectLeave(leaveId);
    toast.warn("Leave Request changed to rejected!", { position: "top-right" });
    const updated = await getLeaveRequests();
    setData(updated.data); 

  } catch (error) {
    toast.error("Form was not changed as rejected!", { position: "top-right" });
    console.error(error);
  }
};


// const handleReject = async (leaveId) => {
//   try {
//     const response = await rejectLeave(leaveId);
//     console.log('Leave rejected:', response.data);
//     // Optionally refresh UI or show rejection message
//     toast.error("Form has  Submitted as rerjected !", {
//       position: "top-right"
//     })
//   } catch (error) {
//     console.error('Error rejecting leave:', error);
//     // Optionally show error feedback to user
//     toast.error("Form has not Submitted as rejected Try again !!", {
//       position: "top-right"
//     })
//   }
// };




  return (
    <div>
     
      <ToastContainer />
      {/* <h3 className='my-3 text-center'> Employee Details</h3> */}
      <div className='d-flex  align-items-center my-3'>
         <div className='flex-grow-1 text-center'>
          <h3 className='mb-0'>Employee Leave Details</h3>
        </div>
        {/* <button className='btn btn-primary'> Employee Details</button> */}
       <Link to="/employee-details">
        <Button variant="secondary" size="lg">Employee Details</Button>
      </Link>
      </div>


        <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Leave Id</th>
                        <th>Employee Id</th>
                        <th>From date</th>
                        <th>To date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Applied on</th>
                        <th> Remarks</th>
                        
                    </tr>
                </thead>
    
<tbody>
  {data && data.length > 0 ? (
    data.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.leaveId}</td>
        <td>{item.employeeId}</td>
        <td>{item.fromDate}</td>
        <td>{item.toDate}</td>
        <td>{item.reason}</td>
        <td>{item.status}</td>
        <td>{item.appliedOn}</td>
        <td className={activeId === item.id ? "bg-success text-white" : ""}>
          <button className="btn btn-primary" onClick={() => handleApprove(item.leaveId)}>Approve</button>&nbsp;
          <button className="btn btn-danger" onClick={() => handleReject(item.leaveId)}>Reject</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={9} className="text-center">Loading...</td>
    </tr>
  )}
</tbody>
 





            </Table>
    </div>
  );
};

export default AdminDashboard;
