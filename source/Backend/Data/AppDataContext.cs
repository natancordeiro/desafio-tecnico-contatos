using Contacts.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Contact> Contacts => Set<Contact>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(entity =>
        {
            entity.ToTable("Contacts");

            entity.HasKey(c => c.Id);

            entity.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(c => c.Phone)
                .IsRequired()
                .HasMaxLength(20);

            entity.HasIndex(c => c.Email)
                .IsUnique();
        });

        base.OnModelCreating(modelBuilder);
    }
}