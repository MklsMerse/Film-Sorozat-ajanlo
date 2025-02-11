using System;
using System.Collections.Generic;

namespace FilmFokuszBackEnd.Models;

public partial class FilmVelemenyek
{
    public int VelemenyId { get; set; }

    public int FelhasznaloId { get; set; }

    public int? FilmId { get; set; }

    public string VelemenySzoveg { get; set; } = null!;

    public decimal Ertekeles { get; set; }

    public DateTime HozzaszolasDatum { get; set; }

    public virtual User Felhasznalo { get; set; } = null!;

    public virtual Filmek? Film { get; set; }
}
