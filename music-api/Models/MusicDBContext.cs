using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicApps.Models
{
    public class MusicDBContext : DbContext
    {
        public MusicDBContext(DbContextOptions<MusicDBContext> options):base(options)
        {

        }

        public DbSet<Artist> Artists{ get; set; }
    }
}
