﻿using DataAccessLayer.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.DatabaseContext
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) {  }

        public DbSet<Student> student_details { get; set; }
    }
}
