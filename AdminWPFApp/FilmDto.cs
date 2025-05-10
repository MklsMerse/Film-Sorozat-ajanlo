using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminWPFApp
{
    public class FilmDto
    {
        public int FilmId { get; set; }
        public string Cim { get; set; }
        public string Leiras { get; set; }
        public string MegjelenesiDatum { get; set; }
        public string Mufaj { get; set; }
        public string Rendezo { get; set; }
        public string Szereplok { get; set; }
        public int Ertekeles { get; set; }
        public string FilmUrl { get; set; }
    }

}
