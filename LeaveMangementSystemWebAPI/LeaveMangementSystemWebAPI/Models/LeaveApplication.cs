using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeaveMangementSystemWebAPI.Models
{
    public class LeaveApplication
    {
        [Key]
        public int LeaveId { get; set; }

        
        public int EmployeeId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; } // "Pending", "Approved", "Rejected"
        public DateTime AppliedOn { get; set; } = DateTime.Now;
        public Employee? Employee { get; set; } // this will not update in db cause it's mapper with employee (to connect)
    }


}
