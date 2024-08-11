using AuthApp.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AccountContext _context;
        
        public LoginController(AccountContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if(user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Email and Password are required.");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(U => U.Email == user.Email);

            if (existingUser == null)
            {
                //_context.Users.Add(user);
                //await _context.SaveChangesAsync(); // For registration purposes
                return BadRequest("User does not exist.");
            }
             else if (existingUser != null && user.Password == existingUser.Password && user.Email == existingUser.Email)
            {
                return Ok(new { message = "User exists." });
            }

            return Unauthorized();
            
            
        }
    }
}
