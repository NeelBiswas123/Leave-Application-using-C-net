import { useState } from 'react';
import { applyLeave } from '../services/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyLeave = () => {

    const [formData, setFormData] = useState({
    employeeId: '',
    fromDate: '',
    toDate: '',
    reason: '',
    status: 'Pending'
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    };

    
    const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting",formData);
    if (!formData.reason.trim()) {
    alert("Please enter a reason before submitting.");
    return; //  Stops form from continuing
    }
    try {
        const response = await applyLeave(formData); // Using service from api.js
        console.log("res", response);
    //   alert('Leave applied successfully!');
    toast.success("Form Submitted !", {
      position: "top-right"
    });
      
      setFormData({

      });

    } catch (err) {
      console.error(err);
      
    //   alert('Failed to apply for leave. check the fields or fill the entire form before submit');
        toast.error("!! Failed to apply for leave. check  all the fields or fill the entire form before submit", {
        position: "top-right",
         
});
    }
  };




  return (
      <div style={{ display: "flex", justifyContent:"center", alignItems:"center", backgroundColor:"#D8CDA3", height:"95vh"}} >
        <ToastContainer />
    <div style={{width:"400px"}}>
        <h2 className='text-center mb-3'>Enter Leave Details</h2>

    {/* <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}> */}
    <Form onSubmit={handleSubmit} >

      {/* Inputs for EmpId, fromDate, toDate, reason */}
       <Form.Group className="mb-3 pl-3" >
        <Form.Label>Employee </Form.Label> 
        <Form.Label className='text-danger mx-4 '>**Mandatory </Form.Label>
        <Form.Control type="number" placeholder="Enter Employee Id" name="employeeId" value={formData.employeeId}
              onChange={handleChange}/>       
      </Form.Group>
       
       <Form.Group className="mb-3" >
        <Form.Label>FromDate</Form.Label>
        <Form.Control type="date" name="fromDate"
              value={formData.fromDate}
              onChange={handleChange} />       
      </Form.Group>
       
       
       <Form.Group className="mb-3" >
        <Form.Label>ToDate</Form.Label>
        <Form.Control type="date" name="toDate"
              value={formData.toDate}
              onChange={handleChange} />       
      
      
      </Form.Group>
       <Form.Group className="mb-3" >
        <Form.Label>Reason</Form.Label>
        <Form.Control type="text" placeholder="Reason" name="reason"
              value={formData.reason}
              onChange={handleChange} />       
      </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="Pending" disabled />
        </Form.Group>

        <Button  variant="primary" type="submit" >
            Submit
        </Button>


    </Form>
    </div>
    </div>
  );
};
export default ApplyLeave;