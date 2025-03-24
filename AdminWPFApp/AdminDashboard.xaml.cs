using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace AdminWPFApp
{
    /// <summary>
    /// Az AdminDashboard ablak felelős az admin funkciók megjelenítéséért:
    /// - Felhasználók listázása és módosítása
    /// - Filmek listázása
    /// - Új felhasználó hozzáadása
    /// - Felhasználó törlése
    /// </summary>
    public partial class AdminDashboard : Window
    {
        private readonly HttpClient _httpClient;
        private readonly string _currentToken;

        // Felhasználók és filmek kollekciója
        private ObservableCollection<UserDto> _users;
        private ObservableCollection<FilmDto> _films;
        private ObservableCollection<SorozatDto> _series;

        public AdminDashboard(string username, string token)
        {
            InitializeComponent();

            _currentToken = token;
            UsernameTextBlock.Text = username;

            _httpClient = new HttpClient();

            // Felhasználók DataGrid-hez
            _users = new ObservableCollection<UserDto>();
            UsersDataGrid.ItemsSource = _users;

            // Filmek DataGrid-hez (a backend FilmekController GET végpontja nagy F-vel "Filmek")
            _films = new ObservableCollection<FilmDto>();
            FilmsDataGrid.ItemsSource = _films;

            _series = new ObservableCollection<SorozatDto>();
            SorozatoksDataGrid.ItemsSource = _series;

            // Kezdeti adatok betöltése
            RefreshSeries();
            RefreshFilms();
            RefreshUsers();
        }


        private async Task RefreshSeries()
        {
            try
            {
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/Sorozatok/{_currentToken}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var series = JsonConvert.DeserializeObject<SorozatDto[]>(json);

                    _series.Clear();
                    foreach (var s in series)
                    {
                        _series.Add(s);
                    }
                }
                else
                {
                    MessageBox.Show("Hiba történt a sorozatok betöltésekor!");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (RefreshSeries): " + ex.Message);
            }
        }


        private bool IsValidSeasonCount(int evadokSzama)
        {
            return evadokSzama >= 1 && evadokSzama <= 99;
        }


        private bool Mufajok(string genre)
        {
            var validGenres = new List<string> { "sci-fi", "horror", "kaland", "akció", "animáció", "romantikus", "thriller", "vígjáték", "dráma" };
            return validGenres.Contains(genre.ToLower());
        }
        /// <summary>
        /// Sorozatok módosításának mentése az adatbázisba
        /// </summary>
        private async void SaveSeries_Click(object sender, RoutedEventArgs e)
        {
            try
            {

                foreach (var sorozat in _series)
                {
                    if (!IsValidSeasonCount(sorozat.EvadokSzama))
                    {
                        MessageBox.Show("Évadok száma csak szám lehet, 1 és 99 között!");
                        return;
                    }

                    if (!Mufajok(sorozat.Mufaj))
                    {
                        MessageBox.Show("Műfajnál ezek a műfajok fogadhatóak el: sci-fi, horror, kaland, akció, animáció, romantikus, thriller, vígjáték, dráma.");
                        return;
                    }

                    if (!IsValidUrl(sorozat.SorozatUrl))
                    {
                        MessageBox.Show("Hibás formátum, kérjük link formátumot adjon meg!");
                        return;
                    }

                    var json = JsonConvert.SerializeObject(sorozat);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"http://localhost:5104/api/Sorozatok/{_currentToken}", content);
                    if (!response.IsSuccessStatusCode)
                    {
                        string error = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Hiba a sorozat (ID={sorozat.SorozatId}) mentésekor: {error}");
                    }
                }
                MessageBox.Show("Módosítások sikeresen mentve!");
                await RefreshSeries();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (SaveSeries): " + ex.Message);
            }
        }


        private async void RefreshSeries_Click(object sender, RoutedEventArgs e)
        {
            await RefreshSeries();
        }

        /// <summary>
        /// Frissíti a felhasználók listáját a backend GET végpontról.
        /// Várható URL: http://localhost:5104/api/User/EmailName?token={_currentToken}
        /// </summary>
        private async Task RefreshUsers()
        {
            try
            {
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/User/EmailName?token={_currentToken}");
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
                    MessageBox.Show("Hiba történt a felhasználók betöltésekor!");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (RefreshUsers): " + ex.Message);
            }
        }

        /// <summary>
        /// Frissíti a filmek listáját a backend GET végpontról.
        /// Várható URL: http://localhost:5104/api/Filmek/{_currentToken}
        /// </summary>
        private async Task RefreshFilms()
        {
            try
            {
                var response = await _httpClient.GetAsync($"http://localhost:5104/api/Filmek/{_currentToken}");
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
                MessageBox.Show("Hiba (RefreshFilms): " + ex.Message);
            }
        }

        /// <summary>
        /// Mentés gomb eseménykezelője a felhasználók módosításához.
        /// Küld PUT kérést a backendhez a URL: http://localhost:5104/api/User/{_currentToken}
        /// </summary>
        private async void SaveUsers_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (var user in _users)
                {
                    if (!IsValidEmail(user.Email))
                    {
                        MessageBox.Show("Módosítás sikertelen: érvényes email címet adjon meg.");
                        return;
                    }

                    if (!IsValidPermissionId(user.PermissionId))
                    {
                        MessageBox.Show("Módosítás sikertelen: A PermissionId 1 (User) vagy 2 (Admin) lehet!");
                        return;
                    }

                    var updatedUser = new
                    {
                        Id = user.Id,
                        LoginNev = user.LoginNev,
                        Hash = user.Hash,
                        Salt = user.Salt,
                        Name = user.Name,
                        PermissionId = user.PermissionId,
                        Active = user.Active == true, 
                        Email = user.Email,
                    };

                    var json = JsonConvert.SerializeObject(updatedUser);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = await _httpClient.PutAsync($"http://localhost:5104/api/User/{_currentToken}", content);
                    if (!response.IsSuccessStatusCode)
                    {
                        string error = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Hiba a felhasználó (ID={user.Id}) mentésekor: {error}");
                    }
                }
                MessageBox.Show("Módosítások sikeresen mentve!");
                await RefreshUsers();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (SaveUsers): " + ex.Message);
            }
        }

        private bool IsValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return false;
            return (email.EndsWith(".com") || email.EndsWith(".hu")) && !email.Contains("gmail.hu");
        }

        private bool IsValidPermissionId(int permissionId)
        {
            return permissionId == 1 || permissionId == 2;
        }



        private bool IsValidDateFormat(string date)
        {
            DateTime temp;
            return DateTime.TryParseExact(date, "yyyy-MM-ddTHH:mm:ss", null, System.Globalization.DateTimeStyles.None, out temp);
        }

        private bool IsValidGenre(string genre)
        {
            var validGenres = new List<string> { "sci-fi", "horror", "kaland", "dokumentumfilm", "akció", "animáció", "romantikus", "thriller", "vígjáték", "dráma" };
            return validGenres.Contains(genre.ToLower());
        }

        private bool IsValidUrl(string url)
        {
            var urlPattern = @"^(https?|ftp)://[^\s/$.?#].[^\s]*$";
            var regex = new System.Text.RegularExpressions.Regex(urlPattern);

            return regex.IsMatch(url);
        }
        /// <summary>
        /// Mentés gomb eseménykezelője a filmek módosításához.
        /// Küld PUT kérést a backendhez a URL: http://localhost:5104/api/Filmek/{_currentToken}
        /// </summary>
        private async void SaveFilms_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (var film in _films)
                {
                    if (!IsValidDateFormat(film.MegjelenesiDatum))
                    {
                        MessageBox.Show("Helytelen a megjelenési dátum formátuma! A helyes formátum: yyyy-MM-ddTHH:mm:ss");
                        return;
                    }

                    if (!IsValidGenre(film.Mufaj))
                    {
                        MessageBox.Show("Műfajnál ezek a műfajok fogadhatóak el: sci-fi, horror, kaland, dokumentumfilm, akció, animáció, romantikus, thriller, vígjáték, dráma.");
                        return;
                    }

                    if (!IsValidUrl(film.FilmUrl))
                    {
                        MessageBox.Show("Hibás formátum, kérjük link formátumot adjon meg!");
                        return;
                    }

                    var json = JsonConvert.SerializeObject(film);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    // PUT kérés a végpontra: http://localhost:5104/api/Filmek/{_currentToken}
                    var response = await _httpClient.PutAsync($"http://localhost:5104/api/Filmek/{_currentToken}", content);
                    if (!response.IsSuccessStatusCode)
                    {
                        string error = await response.Content.ReadAsStringAsync();
                        MessageBox.Show($"Hiba a film (FilmId={film.FilmId}) mentésekor: {error}");
                    }
                }
                MessageBox.Show("Módosítások sikeresen mentve!");
                await RefreshFilms();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba (SaveFilms): " + ex.Message);
            }
        }



        /// <summary>
        /// Frissítés gomb eseménykezelője a felhasználók listájához.
        /// </summary>
        private async void RefreshUsers_Click(object sender, RoutedEventArgs e)
        {
            await RefreshUsers();
        }

        /// <summary>
        /// Frissítés gomb eseménykezelője a filmek listájához.
        /// </summary>
        private async void RefreshFilms_Click(object sender, RoutedEventArgs e)
        {
            await RefreshFilms();
        }

        /// <summary>
        /// TabControl lapváltás eseménykezelője.
        /// Ha a "Új felhasználó hozzáadása" lapra vált, megnyitja az AddUserWindow-t, majd visszaállítja a "Felhasználó Listázása" lapot.
        /// </summary>
        private void MainTabControl_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (MainTabControl.SelectedItem is TabItem selectedTab)
            {
                if (selectedTab.Header?.ToString() == "Új felhasználó hozzáadása")
                {
                    var addUserWindow = new AddUserWindow(_currentToken);
                    addUserWindow.ShowDialog();
                    MainTabControl.SelectedIndex = 0;
                }
            }
        }


        private void OpenAddSorozatWindow_Click(object sender, RoutedEventArgs e)
        {
            var addSorozatWindow = new AddSorozatWindow(_currentToken);
            addSorozatWindow.ShowDialog();
        }

        /// <summary>
        /// "Új felhasználó hozzáadása" gomb eseménykezelője.
        /// </summary>
        private void OpenAddUserWindow_Click(object sender, RoutedEventArgs e)
        {
            var addUserWindow = new AddUserWindow(_currentToken);
            addUserWindow.ShowDialog();
        }

        /// <summary>
        /// "Új film hozzáadása" gomb eseménykezelője.
        /// Megnyitja az AddFilmWindow ablakot.
        /// </summary>
        private void OpenAddFilmWindow_Click(object sender, RoutedEventArgs e)
        {
            var addFilmWindow = new AddFilmWindow(_currentToken);
            addFilmWindow.ShowDialog();
        }

        private void OpenDeleteFilmWindow_Click(object sender, RoutedEventArgs e)
        {
            var deleteFilmWindow = new DeleteFilmWindow(_currentToken);
            deleteFilmWindow.ShowDialog();
        }

        private void OpenDeleteSorozatWindow_Click(object sender, RoutedEventArgs e)
        {
            var deleteSorozatWindow = new DeleteSorozatWindow(_currentToken);
            deleteSorozatWindow.ShowDialog();
        }


        /// <summary>
        /// "Felhasználó törlése" ablak megnyitása gomb eseménykezelője.
        /// </summary>
        private void OpenDeleteUserWindow_Click(object sender, RoutedEventArgs e)
        {
            var deleteUserWindow = new DeleteUserWindow(_currentToken);
            deleteUserWindow.ShowDialog();
        }

        /// <summary>
        /// Kijelentkezés gomb eseménykezelője.
        /// Bezárja az AdminDashboard ablakot.
        /// </summary>
        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
