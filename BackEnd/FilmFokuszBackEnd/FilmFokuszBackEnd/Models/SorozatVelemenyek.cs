﻿using System;
using System.Collections.Generic;

namespace FilmFokuszBackEnd.Models;

public partial class SorozatVelemenyek
{
    public int VelemenyId { get; set; }

    public int FelhasznaloId { get; set; }

    public int? SorozatId { get; set; }

    public string VelemenySzoveg { get; set; } = null!;

    public decimal Ertekeles { get; set; }

    public DateTime HozzaszolasDatum { get; set; }

    public virtual User Felhasznalo { get; set; } = null!;

    public virtual Sorozatok? Sorozat { get; set; }
}
