using Mapster;

namespace Todo.Helpers;

public static class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig<AppUser, UserDto>.NewConfig()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Email, src => src.Email)
            .Map(dest => dest.Mobile, src => src.PhoneNumber);
    }
}
