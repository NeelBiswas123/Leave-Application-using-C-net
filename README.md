# 📝 Leave Application System

A full-stack **Leave Management System** built with:
- 🔧 ASP.NET WebAPI (.NET 6)
- 🌐 React (with React Bootstrap)
- 🗄️ SQL Server

---

## 🔐 Features

- Employee leave request submission via React frontend.
- Admin-only dashboard to:
  - View all leave applications
  - Accept or reject requests
- Authentication flow using **JWT**:
  - Admin must log in to access dashboard
  - Secured protected routes with token validation
- Data stored and synced via SQL Server backend

---
### Db logics
create a db with name LeaveManagementDb ( otherwise if u want custom name then create it and change the connectionstrings in applicationsettings.json file ( inside leavemanagementsystemwebapi folder) 
-> after that create two tables  1. Leave Application ( LeaveId as Pk and int , EmployeeId as Fk and int, FromDate as datetime, Todate as datetime, Reason as nvarchar, status as nvarchar, appliedon as datetime.now)
                                  2. Employees ( EmployeeId as PK and int,,, Name, Email , Role as nvarchar) 
                                  or
          if u want to put custom tables name do it and chnage it with ur name in AppDbCOntext.cs ( in leavemanagementsystem / data folder)

          
## 🧰 Tech Stack

| Layer         | Tech                         |
| ------------- | ---------------------------- |
| Frontend      | React, React Bootstrap, Axios |
| Backend       | ASP.NET WebAPI (Minimal APIs) |
| Database      | SQL Server                   |
| Auth          | JWT, Role-based authorization |
| UI Features   | Responsive navbar, dark mode, toast notifications |

---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/NeelBiswas123/Leave-Application-using-C-net.git
   cd Leave-Application-using-C-net
