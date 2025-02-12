using System;
using System.Collections.Generic;

namespace FilmFokuszBackEnd.Models;

public partial class Sorozatok
{
    public int SorozatId { get; set; }

    public string Cim { get; set; } = null!;

    public string Leiras { get; set; } = null!;

    public DateTime MegjelenesiDatum { get; set; }

    public string Mufaj { get; set; } = null!;

    public string Rendezo { get; set; } = null!;

    public string Szereplok { get; set; } = null!;

    public decimal Ertekeles { get; set; }

    public string SorozatUrl { get; set; } = null!;

    public int EvadokSzama { get; set; }
}
