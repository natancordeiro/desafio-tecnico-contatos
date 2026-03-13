using System.ComponentModel.DataAnnotations;

namespace Contacts.Api.Dtos;

public class CreateContactRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "O nome deve ter entre 2 e 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "O e-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
    [StringLength(150, ErrorMessage = "O e-mail deve ter no máximo 150 caracteres.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    [RegularExpression(@"^[0-9()+\-\s]{8,20}$", ErrorMessage = "Informe um telefone válido.")]
    public string Phone { get; set; } = string.Empty;
}