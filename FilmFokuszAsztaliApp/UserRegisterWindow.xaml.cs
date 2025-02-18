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
    /// <summary>
    /// Interaction logic for UserRegisterWindow.xaml
    /// </summary>
    public partial class UserRegisterWindow : Window
    {
        private HttpClient client;
        private string token;
        public UserRegisterWindow(HttpClient httpClient, string authToken)
        {
            InitializeComponent();
            client = httpClient;
            token = authToken;
        }

        private async void btnRegister_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(tbxLoginName.Text) ||
                    string.IsNullOrWhiteSpace(pbxPassword.Password) ||
                    string.IsNullOrWhiteSpace(tbxFullName.Text) ||
                    string.IsNullOrWhiteSpace(tbxEmail.Text) ||
                    string.IsNullOrWhiteSpace(tbxPermissionId.Text) ||
                    string.IsNullOrWhiteSpace(tbxActive.Text))
                {
                    MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                string salt = MainWindow.GenerateSalt();
                string hashedPassword = MainWindow.CreateSHA256(pbxPassword.Password + salt);


                var newUser = new
                {
                    LoginNev = tbxLoginName.Text,
                    HASH = hashedPassword,
                    SALT = salt,
                    Name = tbxFullName.Text,
                    Email = tbxEmail.Text,
                    PermissionId = int.Parse(tbxPermissionId.Text),
                    Active = int.Parse(tbxActive.Text),
                    ProfilePicturePath = "default.jpg"
                };


                string jsonUser = JsonSerializer.Serialize(newUser, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
                var content = new StringContent(jsonUser, Encoding.UTF8, "application/json");


                var response = await client.PostAsync($"api/User/{token}", content);
                response.EnsureSuccessStatusCode();

                MessageBox.Show("Felhasználó sikeresen hozzáadva!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
