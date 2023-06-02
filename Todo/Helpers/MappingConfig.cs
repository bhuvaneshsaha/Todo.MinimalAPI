using Mapster;

namespace Todo.Helpers;

public static class MappingConfig
{
    public static void Configure()
    {
        RegisterDtoToAppUserMapping();
        AppUserToUserDtoMapping();
    }

    private static void RegisterDtoToAppUserMapping()
    {
        TypeAdapterConfig<RegisterDto, AppUser>.NewConfig()
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.UserName, src => src.Email)
            .Map(dest => dest.Email, src => src.Email)
            .Map(dest => dest.PhoneNumber, src => src.Mobile);
    }

    private static void AppUserToUserDtoMapping()
    {
        TypeAdapterConfig<AppUser, UserDto>.NewConfig()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Email, src => src.Email)
            .Map(dest => dest.Mobile, src => src.PhoneNumber);
    }
}
