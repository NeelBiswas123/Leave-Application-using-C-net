// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import { default as BootstrapNavbar } from 'react-bootstrap/Navbar';
// // import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';


// // const Navbar = () => (
  
// //   <div>
  
// //     <BootstrapNavbar bg="dark" data-bs-theme="dark">
// //         <Container>
// //           <BootstrapNavbar.Brand href="/">Leave Management System</BootstrapNavbar.Brand>
// //           <Nav className="me-auto">
// //             <Nav.Link href="/">Home</Nav.Link>
      
// //             {/* <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
// //             <Nav.Link as={Link} to="/login">Login</Nav.Link> */}

            
// //           </Nav>
// //         </Container>
// //       </BootstrapNavbar>
// //   </div>
// // );
// // export default Navbar;



//after logged in logout button not showing
// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token'); // Adjust if using sessionStorage or cookies
//   const isLoggedIn= !! token;
//   const handleLoginClick = () => {

//     if (token) {
//       navigate('/');
//     } else {
//       navigate('/login');
//     }
  
//   }
 
  

  


//   return (
//     <div>
//       <BootstrapNavbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <BootstrapNavbar.Brand href="/">Leave Management System</BootstrapNavbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="/">Home</Nav.Link>
            
//             <Nav.Link onClick={handleLoginClick}>Admin</Nav.Link>
//             <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
//           </Nav>
//         </Container>
//       </BootstrapNavbar>
//     </div>
//   );
// };

// export default Navbar;





import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BootstrapNavbar } from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import axios from 'axios';


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;





  const logout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token'); // Clear the token
      delete axios.defaults.headers.common['Authorization']; // for del jwt token from axios req
      toast.success('Logged out successfully!');
      // navigate('/'); // Redirect to / page
      setTimeout(() => {
        navigate('/');
      }, 1000); 
    } else {
      navigate('/login'); // Redirect to login
    }
  };

  

  const handleAdminClick = () => {
    if (isLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <ToastContainer />
      <BootstrapNavbar bg="dark" data-bs-theme="dark">
        <Container>
          <BootstrapNavbar.Brand href="/">Leave Management System</BootstrapNavbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={handleAdminClick}>Admin</Nav.Link>
          </Nav>
          <Nav>

            <Nav.Link onClick={logout}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Nav.Link>
          </Nav>

        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
