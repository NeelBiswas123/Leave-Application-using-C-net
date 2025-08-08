import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7030', 
});

// Login function( changed axios.post line with api not axios cause axios bydefault gets 5000 route but i've 7030  and it's not reusable and need manually add headers for every call)
export const login = async (username, password) => {
  const res = await api.post('/auth/login', { username, password });
  localStorage.setItem('token', res.data.token);
  api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;


  const token = localStorage.getItem('token');
    console.log(new Date().toLocaleTimeString())
  console.log("1Tok:",token)
};

// Fetch user function
export const fetchUser = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};





//saving the authtoken (otherwise when dashboard load it gets restarted) dont need now to save in console printout
// export const setAuthHeader = () => {
//   const token = localStorage.getItem('token');

//   console.log(new Date().toLocaleTimeString())
//   console.log("Tok:",token)
//   if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
// };
