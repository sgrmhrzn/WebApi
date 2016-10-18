using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using IMS.Core;

namespace IMS.Data
{

    public class AbDataContext : DbContext
    {


        public AbDataContext(): base("AbDataContext")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<personDes> personDetails { get; set; }
        public DbSet<contact_detail> contactDetails { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<contact_detail>()
            .HasKey(e => e.person_id);

            modelBuilder.Entity<personDes>()
            .HasRequired(s => s.contact_detail)
            .WithRequiredPrincipal(ad => ad.personDetails);
                

            // modelBuilder.Entity<personDes>()
            //.HasRequired(e => e.contact_detail)
            //.WithRequiredDependent(e => e.personDetails);
        }
    }
}