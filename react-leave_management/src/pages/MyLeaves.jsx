import { useEffect, useState } from 'react';
import { getMyLeaves } from '../services/api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyLeaves = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [data, setData] = useState([]);


//   useEffect(() => {
//     getMyLeaves(101).then(res => setLeaves(res.data)); // Use actual employeeId
//   }, []);




const [employeeId, setEmployeeId] = useState('');
const [data, setData] = useState([]);

const handleSubmit = (e) => {
    
  e.preventDefault();

  getMyLeaves(employeeId).then(res => setData(res.data))
  .catch(error => {
      if (error.response && error.response.status === 404) {
        // setData([]); // no data found
       
        toast.error("!! Sorry, No Leave request or No Employee id found", {
                position: "top-right",
        });
      } else {
        console.error("Unexpected error:", error);
      
      }
    });
};


// const handleSubmit = (e) => {
//   e.preventDefault();
//   setSubmitted(true);

//   getMyLeaves(employeeId)
//     .then(res => {
//       setData(res.data);
//       setNoResults(res.data.length === 0);
//     })
//     .catch(error => {
//       if (error.response && error.response.status === 404) {
//         setData([]); // no data found
//         setNoResults(true); // show fallback message
//         alert("gg")
//       } else {
//         console.error("Unexpected error:", error);
//         // optionally show a general error alert or toast
//       }
//     });
// };



return (
  <div style={{backgroundColor:"#D8CDA3", height:"100vh"}}>
    <div style={{ display: "flex", justifyContent:"center", alignItems:"center" }} >
        <ToastContainer />
    <div style={{width:"100vh"}}>
        <h2 className='text-center mb-3'>Enter Leave Details</h2>
    
    
    <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3 d-flex gap-2 align-items-end">
  <Form.Control
    type="number"
    placeholder="Enter Employee Id"
    name="employeeId"
    value={employeeId}
     onChange={(e) => setEmployeeId(e.target.value)}

  />
  <Button variant="primary" type="submit">Submit</Button>
</Form.Group>

    </Form>
  

<h3 className='my-3'> Employee Details</h3>
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

    </div>

    </div>
)
};



export default MyLeaves;