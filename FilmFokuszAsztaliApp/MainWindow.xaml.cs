﻿using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FilmFokuszAsztaliApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        public static string uId = "";
        static int SaltLength = 64;

        public static string GenerateSalt()
        {
            Random random = new Random();
            string karakterek = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string salt = "";
            for (int i = 0; i < SaltLength; i++)
            {
                salt += karakterek[random.Next(karakterek.Length)];
            }
            return salt;
        }

        public static string CreateSHA256(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
                return sBuilder.ToString();
            }
        }

        public static HttpClient sharedClient = new HttpClient()
        {
            BaseAddress = new Uri("http://localhost:5104")
        };
        public MainWindow()
        {
            InitializeComponent();
        }

        private void OpenLoginWindow_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.client = sharedClient;
            loginWindow.ShowDialog();
            if (uId != "")
            {
                mItemFelhasznalok.IsEnabled = true;
                mItemBejelentkezes.IsEnabled = false;
            }
            else
            {
                MessageBox.Show("Sikertelen bejelentkezés!");
            }
        }

        private void OpenUserListWindow_Click(object sender, RoutedEventArgs e)
        {
            UserListWindow userListWindow = new UserListWindow();
            userListWindow.client = sharedClient;
            userListWindow.token = uId;
            userListWindow.ShowDialog();
        }

        private void OpenUserRegisterWindow_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(uId))
            {
                MessageBox.Show("Először jelentkezz be!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            UserRegisterWindow registerWindow = new UserRegisterWindow(sharedClient, uId);
            registerWindow.ShowDialog();
        }

        private void OpenUserEditWindow_Click(object sender, RoutedEventArgs e)
        {
            UserEditWindow userEditWindow = new UserEditWindow(sharedClient, uId);
            userEditWindow.ShowDialog();
        }
    }
}