import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EmployeeDashboard = () => (
//   <div>
//     <h2 className='text-center'>Welcome, Employee!</h2>
//     <Link  to="/apply-leave"><Button className='d-flex justify-content-center align-items-center' variant="primary" size="md">Apply for Leave</Button></Link>
//     <Link to="/my-leaves"><Button className='d-flex justify-content-center align-items-center' variant="secondary" size="md">View My Leaves</Button></Link>
//   </div>


<div >


     <div style={{ backgroundImage: "url('https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg?_gl=1*1hqsiga*_ga*MTMzNzM1MzMwNC4xNzUzNDI1MTU4*_ga_8JE65Q40S6*czE3NTM0MjUxNTckbzEkZzEkdDE3NTM0MjUxNjYkajUxJGwwJGgw')", alt:"nature img", 
     height: "95vh", width: "100%", backgroundSize: "cover"}}>
    
  
        
        {/* <img src="https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg?_gl=1*1hqsiga*_ga*MTMzNzM1MzMwNC4xNzUzNDI1MTU4*_ga_8JE65Q40S6*czE3NTM0MjUxNTckbzEkZzEkdDE3NTM0MjUxNjYkajUxJGwwJGgw" alt="nature img" /> */}
    
    {/* <h2  style={{ textAlign: 'center', paddingTop: "5px",  color: '#ffffffff' }}>Welcome, Employee!</h2> */}

    <h2 className="text-center py-4 " style={{ color: '#ffffffff' }}>Welcome, Employee!</h2>
    <div className="d-flex  align-items-center justify-content-center gap-3 "style={{ height: '50vh' }}>
      <Link to="/apply-leave">
        <Button variant="primary" size="lg">Apply for Leave</Button>
      </Link>
      <Link to="/my-leaves">
        <Button variant="secondary" size="lg">View My Leaves</Button>
      </Link>

      
    </div>

  </div>

</div>

);
export default EmployeeDashboard;