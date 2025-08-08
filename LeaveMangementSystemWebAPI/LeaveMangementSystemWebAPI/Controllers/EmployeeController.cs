using LeaveMangementSystemWebAPI.Data;
using LeaveMangementSystemWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LeaveMangementSystemWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeController(AppDbContext appDbContext )
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_appDbContext.Employees == null)
            {
                return NotFound("!Error 404, No Data Found");
            }
            return await _appDbContext.Employees.ToListAsync(); // it's good but also loading leaveapplication(cause of appDbcontext) when it's running but showing only employees as mentioned 
        }

        //to get specific emp details
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_appDbContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _appDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound("Can't Find the Employee");
            }
            return employee;
        }



        //for adding employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployees(Employee employee)
        {

            _appDbContext.Employees.Add(employee);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, employee);



        }




        //for deleting emp
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployees(int id)
        {

            if (_appDbContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _appDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();


            string name = employee.Name ?? "Unknown";

            return Ok($"Employee with id {id} and name {name} deleted successfully.");
        }

    }
}
