using Newtonsoft.Json;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace AdminWPFApp
{
    public partial class AddFilmWindow : Window
    {
        private readonly HttpClient _httpClient;
        private readonly string _token;

        // Megengedett műfajok (kisbetűs formában az összehasonlításhoz)
        private readonly string[] allowedGenres = new string[]
        {
            "horror", "sci-fi", "kaland", "dokumentumfilm", "akció", "dráma", "thriller", "romantikus", "vígjáték", "animáció"
        };

        public AddFilmWindow(string token)
        {
            InitializeComponent();
            _token = token;
            _httpClient = new HttpClient();
        }

        private async void AddFilmButton_Click(object sender, RoutedEventArgs e)
        {
            // Összeolvasás
            string cim = CimTextBox.Text;         // bármi megadható
            string leiras = LeirasTextBox.Text;     // bármi megadható
            string megjelenesiDatum = DatumTextBox.Text;
            string mufaj = MufajTextBox.Text;
            string rendezo = RendezoTextBox.Text;
            string szereplok = SzereplokTextBox.Text;
            string ertekelesStr = ErtekelesTextBox.Text;
            string filmUrl = FilmUrlTextBox.Text;

            // Műfaj validáció
            if (!string.IsNullOrWhiteSpace(mufaj))
            {
                string lowerGenre = mufaj.Trim().ToLower();
                bool isAllowed = false;
                foreach (var genre in allowedGenres)
                {
                    if (lowerGenre == genre)
                    {
                        isAllowed = true;
                        break;
                    }
                }
                if (!isAllowed)
                {
                    MessageBox.Show("Hiba a műfaj megadásánál! Csak az alábbi műfajok megengedettek: horror, sci-fi, kaland, dokumentumfilm, akció, Dráma, thriller, romantikus, vígjáték, animáció");
                    return;
                }
            }
            else
            {
                MessageBox.Show("A műfaj mező nem lehet üres!");
                return;
            }

            // Értékelés validáció: csak 1 és 5 között
            if (!int.TryParse(ertekelesStr, out int ertekeles) || ertekeles < 1 || ertekeles > 5)
            {
                MessageBox.Show("Hiba: Értékelés 1 és 5 között lévő számot kell megadni!");
                return;
            }

            // Film URL validáció: ellenőrizzük, hogy érvényes URL-e (HTTP/HTTPS)
            if (!Uri.TryCreate(filmUrl, UriKind.Absolute, out Uri uriResult) ||
                !(uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps))
            {
                MessageBox.Show("Hiba: Kérlek, érvényes URL-t adj meg a Film URL-hez!");
                return;
            }

            // Összeállítjuk a film adatokat
            var film = new
            {
                Cim = cim,
                Leiras = leiras,
                MegjelenesiDatum = megjelenesiDatum,
                Mufaj = mufaj,
                Rendezo = rendezo,
                Szereplok = szereplok,
                Ertekeles = ertekeles,
                FilmUrl = filmUrl
            };

            string json = JsonConvert.SerializeObject(film);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync($"http://localhost:5104/api/Filmek/{_token}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Film hozzáadása sikeres!");
                    this.Close();
                }
                else
                {
                    string errorMsg = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Hiba a film hozzáadásakor: " + errorMsg);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }

    }
}
