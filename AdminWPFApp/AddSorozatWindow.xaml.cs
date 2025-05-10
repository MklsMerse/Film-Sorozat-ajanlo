using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media.Animation;

namespace AdminWPFApp
{
    public partial class AddSorozatWindow : Window
    {
        private readonly string _token;
        private readonly HttpClient _httpClient;

        public AddSorozatWindow(string token)
        {
            InitializeComponent();
            _token = token;
            _httpClient = new HttpClient();
        }

        private async void AddSorozat_Click(object sender, RoutedEventArgs e)
        {
            // Ellenőrzés: Műfaj csak az alábbi lehet
            string[] allowedGenres = { "horror", "sci-fi", "kaland", "akció", "dráma", "thriller", "romantikus", "vígjáték", "animáció" };
            if (!Array.Exists(allowedGenres, genre => genre.Equals(MufajTextBox.Text, StringComparison.OrdinalIgnoreCase)))
            {
                MessageBox.Show("Hiba a műfaj megadásánál! Csak az alábbi műfajok engedélyezettek:\n" + string.Join(", ", allowedGenres));
                return;
            }

            // Ellenőrzés: Értékelés csak 1 és 5 között lehet
            if (!int.TryParse(ErtekelesTextBox.Text, out int ertekeles) || ertekeles < 1 || ertekeles > 5)
            {
                MessageBox.Show("Hiba: Értékelés 1 és 5 között lévő szám kell legyen!");
                return;
            }

            // Ellenőrzés: Sorozat URL egy érvényes link legyen
            if (!Uri.IsWellFormedUriString(SorozatUrlTextBox.Text, UriKind.Absolute))
            {
                MessageBox.Show("Hiba: A Sorozat URL érvénytelen!");
                return;
            }

            // **Ellenőrzés: ÉvadokSzama csak szám lehet, és 1 és 99 között kell lennie**
            if (!int.TryParse(EvadokSzamaTextBox.Text, out int evadokSzama) || evadokSzama < 1 || evadokSzama > 99)
            {
                MessageBox.Show("Évadok Száma: Csak szám fogadható el! Illetve a 0 szám vagy 99-től nagyobb szám nem elfogadható.");
                return;
            }

            // Új sorozat objektum létrehozása
            var newSorozat = new
            {
                Cim = CimTextBox.Text,
                Leiras = LeirasTextBox.Text,
                MegjelenesiDatum = MegjelenesiDatumTextBox.Text,
                Mufaj = MufajTextBox.Text,
                Rendezo = RendezoTextBox.Text,
                Szereplok = SzereplokTextBox.Text,
                Ertekeles = ertekeles,
                SorozatUrl = SorozatUrlTextBox.Text,
                EvadokSzama = evadokSzama // Már csak 1 és 99 közötti szám lehet
            };

            try
            {
                var json = JsonConvert.SerializeObject(newSorozat);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                // POST végpont meghívása
                var response = await _httpClient.PostAsync($"http://localhost:5104/api/Sorozatok/{_token}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sorozat sikeresen hozzáadva!");
                    this.Close();
                }
                else
                {
                    string errorMsg = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Hiba: " + errorMsg);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (AddSorozat_Click): " + ex.Message);
            }
        }
    }
}
