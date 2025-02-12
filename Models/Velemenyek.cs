using System;
using System.Collections.Generic;

namespace FilmFokuszBackEnd.Models;

public partial class Velemenyek
{
    public int VelemenyId { get; set; }

    public int FelhasznaloId { get; set; }

    public int? FilmId { get; set; }

    public int? SorozatId { get; set; }

    public string VelemenySzoveg { get; set; } = null!;

    public decimal Ertekeles { get; set; }
}
