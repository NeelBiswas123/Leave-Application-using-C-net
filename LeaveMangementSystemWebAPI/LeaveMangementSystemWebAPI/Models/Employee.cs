using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveMangementSystemWebAPI.Models
{
    public class Employee
    {

       
        
        public int EmployeeId { get; set; }

        public string Name { get; set; }
            public string Email { get; set; }
            public string Role { get; set; } //Emp or Admin
        }
}
