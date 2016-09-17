using Classroom.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Classroom.API.Infrastructure
{
    public class ClassroomDataContext : DbContext
    {
        public ClassroomDataContext() : base("ClassroomManager")
        {

        }

        public IDbSet<Models.Student> Students { get; set; }
        public IDbSet<Models.Project> Projects { get; set; }
        public IDbSet<Models.Assignment> Assignments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Compound Key
            modelBuilder.Entity<Assignment>()
                        .HasKey(a => new { a.StudentId, a.ProjectId });
            
            //A Project has Many assignments
            modelBuilder.Entity<Project>()
                        .HasMany(p => p.Assignments)
                        .WithRequired(a => a.Project)
                        .HasForeignKey(a => a.ProjectId);

            //A Student has Many assignments
            modelBuilder.Entity<Student>()
                        .HasMany(s => s.Assignments)
                        .WithRequired(a => a.Student)
                        .HasForeignKey(a => a.StudentId);
        }
    }
}