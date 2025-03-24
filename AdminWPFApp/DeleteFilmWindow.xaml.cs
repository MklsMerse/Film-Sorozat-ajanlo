using Newtonsoft.Json;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows;

namespace AdminWPFApp
{
    public partial class DeleteFilmWindow : Window
    {
        private readonly HttpClient _httpClient;
        private readonly string _token;
        private ObservableCollection<FilmDto> _films;

        public DeleteFilmWindow(string token)
        {
            InitializeComponent();
            _token = token;
            _httpClient = new HttpClient();
            _films = new ObservableCollection<FilmDto>();
            FilmsDataGrid.ItemsSource = _films;
            LoadFilms();
        }

        private async void LoadFilms()
        {
            try
            {
                // GET kéréssel kérjük le a filmek listáját.
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/Filmek/{_token}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var films = JsonConvert.DeserializeObject<FilmDto[]>(json);
                    _films.Clear();
                    foreach (var film in films)
                    {
                        _films.Add(film);
                    }
                }
                else
                {
                    MessageBox.Show("Hiba történt a filmek betöltésekor!");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (LoadFilms): " + ex.Message);
            }
        }

        private async void DeleteFilmButton_Click(object sender, RoutedEventArgs e)
        {
            if (FilmsDataGrid.SelectedItem is FilmDto selectedFilm)
            {
                var result = MessageBox.Show($"Biztosan törlöd a '{selectedFilm.Cim}' című filmet?", "Megerősítés", MessageBoxButton.YesNo);
                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        // DELETE végpont: http://localhost:5104/api/Filmek/delete-film/{_currentToken}/{selectedFilm.FilmId}
                        var url = $"http://localhost:5104/api/Filmek/delete-film/{_token}/{selectedFilm.FilmId}";
                        var response = await _httpClient.DeleteAsync(url);
                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Film törölve.");
                            LoadFilms();
                        }
                        else
                        {
                            string errorMsg = await response.Content.ReadAsStringAsync();
                            MessageBox.Show("Hiba: " + errorMsg);
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Hiba (DeleteFilm): " + ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show("Kérlek válassz egy filmet törlésre!");
            }
        }

    }
}
