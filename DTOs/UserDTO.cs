namespace FilmFokuszBackEnd.DTOs
{
    public class UserDTO
    {
        public string LoginNev { get; set; }
        public string HASH { get; set; }
        public string SALT { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int PermissionId { get; set; }
        public int Active { get; set; }
        public string ProfilePicturePath { get; set; }
    }
}
