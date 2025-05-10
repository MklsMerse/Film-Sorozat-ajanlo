using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;

namespace AdminWPFApp
{
    public partial class AddUserWindow : Window
    {
        private readonly HttpClient _httpClient;
        private readonly string _adminToken;

        public AddUserWindow(string adminToken)
        {
            InitializeComponent();
            _adminToken = adminToken;
            _httpClient = new HttpClient();
        }

        private async void AddUserButton_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(FullNameTextBox.Text) ||
               string.IsNullOrWhiteSpace(UsernameTextBox.Text) ||
               string.IsNullOrWhiteSpace(EmailTextBox.Text) ||
               string.IsNullOrWhiteSpace(PasswordBox.Password) ||
               string.IsNullOrWhiteSpace(ConfirmPasswordBox.Password))
            {
                MessageBox.Show("Az összes mezőt töltsd ki!");
                return;
            }

            if (PasswordBox.Password != ConfirmPasswordBox.Password)
            {
                MessageBox.Show("A jelszó és a megerősítés nem egyezik!");
                return;
            }

            if (FullNameTextBox.Text.Trim().Equals(UsernameTextBox.Text.Trim(), StringComparison.OrdinalIgnoreCase))
            {
                MessageBox.Show("A Teljes Név és a Felhasználónév nem lehet ugyanaz!");
                return;
            }

            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|hu)$";
            string email = EmailTextBox.Text;

            if (!Regex.IsMatch(email, emailPattern))
            {
                MessageBox.Show("Kérlek, adj meg egy érvényes email címet!");
                return;
            }
         
            if (email.ToLower().EndsWith("@gmail.hu"))
            {
                MessageBox.Show("A gmail.hu domain nem érvényes.");
                return;
            }

            string password = PasswordBox.Password;
            string passwordPattern = @"^(?=.*[A-Z])(?=.*[!@#$%^&*()\[\]{};:'\""<>,.?\\/|\\^~_+=-]).{8,}$";

            if (!Regex.IsMatch(password, passwordPattern))
            {
                MessageBox.Show("A jelszónak minimum 8 karakterből kell állnia, tartalmaznia kell egy nagybetűt és egy speciális karaktert.");
                return;
            }

            var newUser = new
            {
                FullName = FullNameTextBox.Text,
                Username = UsernameTextBox.Text,
                Email = EmailTextBox.Text,
                Password = PasswordBox.Password,
                ProfilePicture = ""
            };

            string json = JsonConvert.SerializeObject(newUser);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {
                // Feltételezzük, hogy a backend regisztrációs végpontja: 
                // POST http://localhost:5104/api/User/register-admin
                // Ha szükséges, a token is query paraméterként átadható, pl.: ?token=...
                var response = await _httpClient.PostAsync($"http://localhost:5104/api/User/register?token={_adminToken}", content);
                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Felhasználó hozzáadása sikeres!");
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
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }
    }
}
