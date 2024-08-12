using AuthApp.Server.Models; // Kullanıcı modelinizin bulunduğu namespace
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AuthApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public RegisterController(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Email and Password are required.");
            }

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Password = model.Password
            };

            // Kullanıcıyı oluştur (Şifre burada hashlenir)
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Token oluşturma işlemi burada yapılabilir
                return Ok(new { message = "User created successfully." });
            }

            return BadRequest(result.Errors);
        }
    }

    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
