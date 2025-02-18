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
    /// Interaction logic for UserEditWindow.xaml
    /// </summary>
    public partial class UserEditWindow : Window
    {
        private HttpClient client;
        private string token;
        private List<UserDTO> users;
        public UserEditWindow(HttpClient httpClient, string authToken)
        {
            InitializeComponent();
            client = httpClient;
            token = authToken;
            LoadUsers();
        }

        private async void LoadUsers()
        {
            try
            {
                var response = await client.GetAsync($"api/User/EmailName{token}");
                response.EnsureSuccessStatusCode();
                string jsonResponse = await response.Content.ReadAsStringAsync();
                users = JsonSerializer.Deserialize<List<UserDTO>>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                cbxUsers.ItemsSource = users;
                cbxUsers.DisplayMemberPath = "Name";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a felhasználók betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void cbxUsers_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbxUsers.SelectedItem is UserDTO selectedUser)
            {
                tbxFullName.Text = selectedUser.Name;
                tbxPermissionId.Text = selectedUser.PermissionId.ToString();
                tbxActive.Text = selectedUser.Active.ToString();
                tbxProfilePicturePath.Text = selectedUser.ProfilePicturePath;
            }
        }

        private async void btnSave_Click(object sender, RoutedEventArgs e)
        {
            if (cbxUsers.SelectedItem is UserDTO selectedUser)
            {
                try
                {
                    selectedUser.Name = tbxFullName.Text;
                    selectedUser.PermissionId = int.Parse(tbxPermissionId.Text);
                    selectedUser.Active = int.Parse(tbxActive.Text);
                    selectedUser.ProfilePicturePath = tbxProfilePicturePath.Text;

                    if (!string.IsNullOrWhiteSpace(pbxNewPassword.Password))
                    {
                        string salt = MainWindow.GenerateSalt();
                        selectedUser.SALT = salt;
                        selectedUser.HASH = MainWindow.CreateSHA256(pbxNewPassword.Password + salt);
                    }

                    string jsonUser = JsonSerializer.Serialize(selectedUser);
                    var content = new StringContent(jsonUser, Encoding.UTF8, "application/json");

                    var response = await client.PutAsync($"api/User/{token}", content);
                    response.EnsureSuccessStatusCode();

                    MessageBox.Show("Felhasználó adatai sikeresen módosítva!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    Close();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private void btnCancel_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
