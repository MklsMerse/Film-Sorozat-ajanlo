using System;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows;
using Newtonsoft.Json;

namespace AdminWPFApp
{
    public partial class MainWindow : Window
    {
        private readonly HttpClient _httpClient;

        public MainWindow()
        {
            InitializeComponent();
            _httpClient = new HttpClient();
        }
        private bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

           
            string pattern = @"^[^@\s]+@[^@\s]+\.(com|hu)$";
            return Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);
        }
        private async void RegisterButton_Click(object sender, RoutedEventArgs e)
        {
            if (!IsValidEmail(EmailTextBox.Text))
            {
                MessageBox.Show("Kérlek, érvényes e-mail címet adj meg!");
                return;
            }

            if (PasswordBox.Password != ConfirmPasswordBox.Password)
            {
                MessageBox.Show("A jelszó és a megerősítés nem egyezik!");
                return;
            }

            var registerDto = new
            {
                FullName = FullNameTextBox.Text,
                Username = UsernameTextBox.Text,
                Email = EmailTextBox.Text,
                Password = PasswordBox.Password,
                ProfilePicture = "" // vagy base64, ha van kép
            };

            var json = JsonConvert.SerializeObject(registerDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync("http://localhost:5104/api/User/register-admin", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Admin regisztráció sikeres!");
                }
                else
                {
                    string errorMsg = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Hiba: " + errorMsg);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            var loginDto = new
            {
                Username = LoginUsernameTextBox.Text,
                Password = LoginPasswordBox.Password
            };

            var json = JsonConvert.SerializeObject(loginDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                // login-admin végpont (vagy a neked megfelelő bejelentkezési URL)
                var response = await _httpClient.PostAsync("http://localhost:5104/api/User/login-admin", content);
                if (response.IsSuccessStatusCode)
                {
                    // Itt olvassuk ki a válasz JSON-t
                    string result = await response.Content.ReadAsStringAsync();

                    // Deszerializáljuk a bejelentkezett user adatait
                    var loggedUser = JsonConvert.DeserializeObject<LoggedUser>(result);

                    MessageBox.Show("Bejelentkezés sikeres!");

                    // Megnyitjuk az AdminDashboard ablakot, átadva a user nevét és a tokent
                    var adminDashboard = new AdminDashboard(loggedUser.Name, loggedUser.Token);
                    adminDashboard.Show();

                    // (Opcionálisan bezárhatod a bejelentkezési ablakot, ha külön ablakban van)
                    // this.Close();
                }
                else
                {
                    string errorMsg = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Bejelentkezési hiba: " + errorMsg);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }


    }
}
