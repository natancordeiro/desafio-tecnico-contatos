using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Contacts.Api.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Contacts",
            columns: table => new
            {
                Id = table.Column<int>(type: "INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                Email = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                Phone = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Contacts", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Contacts_Email",
            table: "Contacts",
            column: "Email",
            unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Contacts");
    }
}