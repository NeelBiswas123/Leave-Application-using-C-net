using LeaveMangementSystemWebAPI.Data;
using LeaveMangementSystemWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LeaveMangementSystemWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public LeaveController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
       

        [HttpGet]
        //public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        public async Task<ActionResult<IEnumerable<LeaveApplication>>> GetLeaveDetails()
        {
            if (_appDbContext.LeaveApplications == null)
            {
                return NotFound("!Error 404, No Data Found");
            }
            return await _appDbContext.LeaveApplications.ToListAsync(); // it's good but also loading employees when it's running but showing only leave as mentioned
        }



        //to get specific emp's leave details
        [HttpGet("by-employee/{id}")]
        public async Task<ActionResult<LeaveApplication>> GetLeaveofId(int id)
            //public async Task<ActionResult<IEnumerable<LeaveApplication>>> GetLeavesByEmployeeId(int id) recommened t use Ienumerable but still working without it ( maybe anyframeworks cause trouble then use this line not prev one)
        {
            if (_appDbContext.LeaveApplications == null)
            {
                return NotFound();
            }

            var leaves = await _appDbContext.LeaveApplications
            .Where(l => l.EmployeeId == id)
               .ToListAsync();

            if (leaves == null || leaves.Count == 0)
            {
                return NotFound($"No leave applications found for Employee ID {id}");
            }

            return Ok(leaves);
        }


        //for adding employee
        //[HttpPost]
        //public async Task<ActionResult<LeaveApplication>> PostLeave(LeaveApplication leaveApplicaiton) //  LeaveApplication is method paramenters (more explaination in last msg of https://copilot.microsoft.com/shares/YGNHGh4Kpdvf7zmXer9Z1)
        //{

        //    _appDbContext.LeaveApplications.Add(leaveApplicaiton);
        //    await _appDbContext.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetLeaveofId), new { id = leaveApplicaiton.LeaveId }, leaveApplicaiton);



        //}

        //the prev one is good but shows error in _appDbcontext.leaveapplicaotns.add(leaveapplicaiton) line if emp id not exists 
        [HttpPost]
        public async Task<ActionResult<LeaveApplication>> PostLeave(LeaveApplication leaveApplicaiton)
        {
            // Defensive null check for Employees DbSet
            if (_appDbContext.Employees == null)
            {
                return StatusCode(500, "Employee table is not available.");
            }

            // 💡 Check if EmployeeId exists in Employees table
            var employeeExists = await _appDbContext.Employees
                .AnyAsync(e => e.EmployeeId == leaveApplicaiton.EmployeeId);

            if (!employeeExists)
            {
                return NotFound($"Employee with ID {leaveApplicaiton.EmployeeId} not found.");
            }

            // If valid, proceed with insertion
            _appDbContext.LeaveApplications.Add(leaveApplicaiton);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLeaveofId), new { id = leaveApplicaiton.LeaveId }, leaveApplicaiton);
        }



        //approve the leave ( with leaveid)
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveLeaveApplication(int id)
        {
            if (_appDbContext.LeaveApplications == null) //to ensure dbset  is connected
            {
                return NotFound("LeaveApplications  not found .");
            }

            var leaveApplication = await _appDbContext.LeaveApplications.FindAsync(id); //finding leave application with id

            if (leaveApplication == null)
            {
                return NotFound($"No LeaveApplication found with LeaveId {id}");
            }

            leaveApplication.Status = "Approved";

            _appDbContext.Entry(leaveApplication).State = EntityState.Modified; //tells EF core status has changed track it(otherwise db update , insert wont work properly) 


            try
            {
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
              
                return StatusCode(500, "Concurrency issue found while updating the leave status.");
            }

            return Ok($"Leave application with  Leave ID {id} has been approved.");
        }
        
        
        //reject the leave (using leave id)
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectLeaveApplication(int id)
        {
            if (_appDbContext.LeaveApplications == null)
            {
                return NotFound("LeaveApplications  not found.");
            }

            var leaveApplication = await _appDbContext.LeaveApplications.FindAsync(id);

            if (leaveApplication == null)
            {
                return NotFound($"No LeaveApplication found with LeaveId {id}");
            }

            leaveApplication.Status = "Rejected";

            _appDbContext.Entry(leaveApplication).State = EntityState.Modified;

            try
            {
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Concurrency issue while updating the leave status.");
            }

            return Ok($"Leave application with  Leave ID {id} has been rejected.");
        }






    }
}
