using System;
using System.Collections.Generic;

namespace FilmFokuszBackEnd.Models;

public partial class User
{
    public int Id { get; set; }

    public string? LoginNev { get; set; }

    public string? Hash { get; set; }

    public string? Salt { get; set; }

    public string? Name { get; set; }

    public int PermissionId { get; set; }

    public bool Active { get; set; }

    public string Email { get; set; } = null!;

    public string? ProfilePicturePath { get; set; }

    public virtual ICollection<FilmVelemenyek> FilmVelemenyeks { get; set; } = new List<FilmVelemenyek>();

    public virtual ICollection<SorozatVelemenyek> SorozatVelemenyeks { get; set; } = new List<SorozatVelemenyek>();
}
