using AuthApp.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthApp.Server
{
    public class AccountContext : IdentityDbContext<User>
    {
        public AccountContext(DbContextOptions<AccountContext> options) : base(options) { }

        //public DbSet<User> Users { get; set; }
    }
}
