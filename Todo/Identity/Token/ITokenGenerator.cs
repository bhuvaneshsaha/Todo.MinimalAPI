using Todo.Core.Models;

namespace Todo.Identity.Token
{
    public interface ITokenGenerator
    {
        Task<string> GenerateToken(AppUser user);
    }
}
