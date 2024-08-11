using AuthApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthApp.Server
{
    public class AccountContext : DbContext
    {
        public AccountContext(DbContextOptions<AccountContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
