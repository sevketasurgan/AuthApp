using AuthApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WorkTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkTask>>> GetWorkTasks()
        {
            return await _context.WorkTasks.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<WorkTask>> PostWorkTask(WorkTask workTask)
        {
            _context.WorkTasks.Add(workTask);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetWorkTasks", new {id = workTask.Id}, workTask);


        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkTask>> DeleteWorkTask(int id)
        {
            var workTask = await _context.WorkTasks.FindAsync(id);

            if (workTask != null) { 
                _context.WorkTasks.Remove(workTask);
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
