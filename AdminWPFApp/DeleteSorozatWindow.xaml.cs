using Newtonsoft.Json;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace AdminWPFApp
{
    public partial class DeleteSorozatWindow : Window
    {
        private readonly HttpClient _httpClient;
        private readonly string _token;
        private ObservableCollection<SorozatDto> _sorozatok;

        public DeleteSorozatWindow(string token)
        {
            InitializeComponent();
            _httpClient = new HttpClient();
            _token = token;
            _sorozatok = new ObservableCollection<SorozatDto>();
            SorozatDataGrid.ItemsSource = _sorozatok;
            LoadSorozatok();
        }

        private async void LoadSorozatok()
        {
            try
            {
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/Sorozatok/{_token}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var sorozatok = JsonConvert.DeserializeObject<SorozatDto[]>(json);
                    _sorozatok.Clear();
                    foreach (var sorozat in sorozatok)
                    {
                        _sorozatok.Add(sorozat);
                    }
                }
                else
                {
                    MessageBox.Show("Hiba történt a sorozatok betöltésekor!");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (LoadSorozatok): " + ex.Message);
            }
        }

        private async void DeleteSorozat_Click(object sender, RoutedEventArgs e)
        {
            if (SorozatDataGrid.SelectedItem is SorozatDto selectedSorozat)
            {
                var result = MessageBox.Show($"Biztosan törlöd a '{selectedSorozat.Cim}' című sorozatot?", "Megerősítés", MessageBoxButton.YesNo);
                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        var response = await _httpClient.DeleteAsync($"http://localhost:5104/api/Sorozatok/delete-sorozat/{_token}/{selectedSorozat.SorozatId}");
                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Sorozat sikeresen törölve.");
                            LoadSorozatok();
                        }
                        else
                        {
                            string errorMsg = await response.Content.ReadAsStringAsync();
                            MessageBox.Show("Hiba: " + errorMsg);
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Hiba (DeleteSorozat): " + ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show("Kérlek válassz egy sorozatot törlésre!");
            }
        }
    }
}
