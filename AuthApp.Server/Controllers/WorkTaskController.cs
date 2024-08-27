using AuthApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;


namespace AuthApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkTaskController : ControllerBase
    {
        //private readonly UserManager<User> _userManager;

        private readonly ApplicationDbContext _context;

        public WorkTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkTask>>> GetWorkTasks()
        {
            var userEmailClaim = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;

            return await _context.WorkTasks
                .Where(task => task.IsDeleted == false)
                .Where(task=>task.CreatedByUserId == userEmailClaim || task.AssignedToUserId == userEmailClaim)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<WorkTask>> PostWorkTask(WorkTask workTask)
        {
            var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;


            if (userIdClaim == null)
            {
                return Unauthorized();

            }
          
            workTask.CreatedByUserId = userIdClaim;
            workTask.IsDeleted = false;

            _context.WorkTasks.Add(workTask);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetWorkTasks", new {id = workTask.Id}, workTask);


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkTask>> DeleteWorkTask(int id)
        {
            var workTask = await _context.WorkTasks.FindAsync(id);

            if (workTask != null) { 
                //_context.WorkTasks.Remove(workTask);
                workTask.IsDeleted = true;
                await _context.SaveChangesAsync();
                return Ok(workTask);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
