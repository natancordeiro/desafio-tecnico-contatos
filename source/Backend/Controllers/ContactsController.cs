using Contacts.Api.Data;
using Contacts.Api.Dtos;
using Contacts.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Api.Controllers;

[ApiController]
[Route("contacts")]
[Produces("application/json")]
public class ContactsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Contact>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Contact>>> GetAll()
    {
        var contacts = await _context.Contacts
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .ToListAsync();

        return Ok(contacts);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Contact), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Contact>> GetById(int id)
    {
        var contact = await _context.Contacts
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);

        if (contact is null)
            return NotFound(new { message = "Contato não encontrado." });

        return Ok(contact);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Contact), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Contact>> Create([FromBody] CreateContactRequest request)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailAlreadyExists = await _context.Contacts
            .AnyAsync(c => c.Email.ToLower() == normalizedEmail);

        if (emailAlreadyExists)
            return Conflict(new { message = "Já existe um contato cadastrado com este e-mail." });

        var contact = new Contact
        {
            Name = request.Name.Trim(),
            Email = normalizedEmail,
            Phone = request.Phone.Trim()
        };

        await _context.Contacts.AddAsync(contact);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateContactRequest request)
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

        if (contact is null)
            return NotFound(new { message = "Contato não encontrado." });

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailAlreadyExists = await _context.Contacts
            .AnyAsync(c => c.Id != id && c.Email.ToLower() == normalizedEmail);

        if (emailAlreadyExists)
            return Conflict(new { message = "Já existe outro contato cadastrado com este e-mail." });

        contact.Name = request.Name.Trim();
        contact.Email = normalizedEmail;
        contact.Phone = request.Phone.Trim();

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

        if (contact is null)
            return NotFound(new { message = "Contato não encontrado." });

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}