using Newtonsoft.Json;
using System;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace AdminWPFApp
{
    public partial class DeleteUserWindow : Window
    {
        private readonly HttpClient _httpClient;
        private string _token;
        private ObservableCollection<UserDto> _users;

        public DeleteUserWindow(string token)
        {
            InitializeComponent();
            _token = token;
            _httpClient = new HttpClient();
            _users = new ObservableCollection<UserDto>();
            UsersDataGrid.ItemsSource = _users;
            LoadUsers();
        }

        private async void LoadUsers()
        {
            try
            {
                // Feltételezzük, hogy a backend GET végpontja így érhető el:
                // GET http://localhost:5104/api/User/EmailName?token=...
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/User/EmailName?token={_token}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var users = JsonConvert.DeserializeObject<UserDto[]>(json);
                    _users.Clear();
                    foreach (var user in users)
                    {
                        _users.Add(user);
                    }
                }
                else
                {
                    var errorText = await response.Content.ReadAsStringAsync();
                    MessageBox.Show($"Hiba a felhasználók betöltésekor: {response.StatusCode} - {errorText}");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba: " + ex.Message);
            }
        }

        private async void DeleteUserButton_Click(object sender, RoutedEventArgs e)
        {
            if (UsersDataGrid.SelectedItem is UserDto selectedUser)
            {
                var result = MessageBox.Show($"Biztosan törlöd a {selectedUser.Name} nevű felhasználót?", "Megerősítés", MessageBoxButton.YesNo);
                if (result == MessageBoxResult.Yes)
                {
                    try
                    {
                        // Feltételezzük, hogy a backend DELETE végpontja:
                        // DELETE http://localhost:5104/api/User/{token}/{id}
                        var response = await _httpClient.DeleteAsync($"http://localhost:5104/api/User/{_token}/{selectedUser.Id}");
                        if (response.IsSuccessStatusCode)
                        {
                            MessageBox.Show("Felhasználó törölve.");
                            LoadUsers();
                        }
                        else
                        {
                            string errorMsg = await response.Content.ReadAsStringAsync();
                            MessageBox.Show("Hiba: " + errorMsg);
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Hiba: " + ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show("Kérlek válassz egy felhasználót törlésre!");
            }
        }
    }
}
