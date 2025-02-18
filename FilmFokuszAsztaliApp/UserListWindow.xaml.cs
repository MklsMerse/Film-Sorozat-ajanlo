using FilmFokuszBackEnd.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace FilmFokuszAsztaliApp
{
    public partial class UserListWindow : Window
    {
        public HttpClient client;
        public string token;

        public UserListWindow()
        {
            InitializeComponent();
        }

        protected override async void OnContentRendered(EventArgs e)
        {
            base.OnContentRendered(e);
            await LoadUsers();
        }

        private async Task LoadUsers()
        {
            try
            {
                var response = await client.GetAsync($"api/User/EmailName{token}");
                response.EnsureSuccessStatusCode();
                string jsonResponse = await response.Content.ReadAsStringAsync();

                List<EmailNameDTO> users = JsonSerializer.Deserialize<List<EmailNameDTO>>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                userListView.ItemsSource = users;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a felhasználók betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
