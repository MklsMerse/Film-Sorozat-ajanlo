namespace FilmFokuszBackEnd.DTOs
{
    public class LoggedUser
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; }

        public int? Permission { get; set; }

        public string ProfilePicturePath { get; set; }

        public string Token { get; set; }
    }
}
