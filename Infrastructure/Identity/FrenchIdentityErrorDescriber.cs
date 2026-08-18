using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class FrenchIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError DefaultError() => new()
    {
        Code = nameof(DefaultError),
        Description = "Une erreur inconnue s'est produite."
    };

    public override IdentityError DuplicateEmail(string email) => new()
    {
        Code = nameof(DuplicateEmail),
        Description = $"L'email '{email}' est déjà utilisé."
    };

    public override IdentityError DuplicateUserName(string userName) => new()
    {
        Code = nameof(DuplicateUserName),
        Description = $"Le nom d'utilisateur '{userName}' est déjà pris."
    };

    public override IdentityError InvalidEmail(string? email) => new()
    {
        Code = nameof(InvalidEmail),
        Description = $"L'email '{email}' n'est pas valide."
    };

    public override IdentityError PasswordTooShort(int length) => new()
    {
        Code = nameof(PasswordTooShort),
        Description = $"Le mot de passe doit contenir au moins {length} caractères."
    };

    public override IdentityError PasswordRequiresNonAlphanumeric() => new()
    {
        Code = nameof(PasswordRequiresNonAlphanumeric),
        Description = "Le mot de passe doit contenir au moins un caractère non alphanumérique."
    };

    public override IdentityError PasswordRequiresDigit() => new()
    {
        Code = nameof(PasswordRequiresDigit),
        Description = "Le mot de passe doit contenir au moins un chiffre ('0'-'9')."
    };

    public override IdentityError PasswordRequiresLower() => new()
    {
        Code = nameof(PasswordRequiresLower),
        Description = "Le mot de passe doit contenir au moins une lettre minuscule ('a'-'z')."
    };

    public override IdentityError PasswordRequiresUpper() => new()
    {
        Code = nameof(PasswordRequiresUpper),
        Description = "Le mot de passe doit contenir au moins une lettre majuscule ('A'-'Z')."
    };

    public override IdentityError PasswordRequiresUniqueChars(int uniqueChars) => new()
    {
        Code = nameof(PasswordRequiresUniqueChars),
        Description = $"Le mot de passe doit contenir au moins {uniqueChars} caractères distincts."
    };

    public override IdentityError InvalidUserName(string? userName) => new()
    {
        Code = nameof(InvalidUserName),
        Description = $"Le nom d'utilisateur '{userName}' n'est pas valide, il ne peut contenir que des lettres ou des chiffres."
    };
}