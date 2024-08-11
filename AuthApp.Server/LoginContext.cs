using AuthApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthApp.Server
{
    public class LoginContext:DbContext
    {
        public LoginContext(DbContextOptions<LoginContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
