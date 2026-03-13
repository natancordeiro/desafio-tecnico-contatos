using Contacts.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Contacts.AnyAsync())
            return;

        var contacts = new List<Contact>
        {
            new()
            {
                Name = "Ana Julia",
                Email = "ana.julia@email.com",
                Phone = "(11) 99999-9999"
            },
            new()
            {
                Name = "Bruno Lima",
                Email = "bruno.lima@email.com",
                Phone = "(21) 99999-9999"
            },
            new()
            {
                Name = "Carlos Mendes",
                Email = "carlos.mendes@email.com",
                Phone = "(31) 99999-9999"
            }
        };

        await context.Contacts.AddRangeAsync(contacts);
        await context.SaveChangesAsync();
    }
}