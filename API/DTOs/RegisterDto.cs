using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Le prénom est requis.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Le nom est requis.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "L'email est requis.")]
    [EmailAddress(ErrorMessage = "L'email n'est pas valide.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Le mot de passe est requis.")]
    public string Password { get; set; } = string.Empty;
}