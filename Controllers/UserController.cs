using FilmFokuszBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using FilmFokuszBackEnd.DTOs;
using System.Linq;
using System.Threading.Tasks;

namespace FilmFokuszBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPut("admin-update/{token}")]
        public async Task<IActionResult> AdminUpdateUser(string token, [FromBody] User updatedUser)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                var currentUser = Program.LoggedInUsers[token];
                if (currentUser.PermissionId == 2)
                {
                    // Ugyanaz a logika, mint a Put("{token}")-ben
                    try
                    {
                        using (var cx = new FilmfokuszContext())
                        {
                            var existingUser = await cx.Users.FindAsync(updatedUser.Id);
                            if (existingUser == null)
                            {
                                return NotFound("A megadott felhasználó nem található.");
                            }
                            // Frissítés
                            existingUser.LoginNev = updatedUser.LoginNev;
                            // ... és így tovább

                            await cx.SaveChangesAsync();
                            return Ok("A felhasználó adatai módosítva (admin).");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.InnerException?.Message ?? ex.Message);
                    }
                }
                else
                {
                    return BadRequest("Nincs jogod hozzá (nem admin)!");
                }
            }
            else
            {
                return BadRequest("Érvénytelen token!");
            }
        }


        [HttpPost("login-admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginDTO loginDTO)
        {
            using (var cx = new FilmfokuszContext())
            {
                try
                {
                    // 1) Első lépés: megkeressük a usert a felhasználónév alapján
                    var user = await cx.Users
                        .FirstOrDefaultAsync(u => u.LoginNev == loginDTO.Username);

                    if (user == null || !user.Active)
                    {
                        return BadRequest("Hibás név vagy jelszó/inaktív felhasználó!");
                    }

                    // 2) Ellenőrizzük, hogy PermissionId = 2-e (admin)
                    if (user.PermissionId != 2)
                    {
                        return BadRequest("Nincs jogosultság a WPF alkalmazáshoz (admin)!");
                    }

                    // 3) A jelszót ugyanúgy hash-eljük, mint a regisztrációnál:
                    //    password + user.Salt -> CreateSHA256
                    string hash = Program.CreateSHA256(loginDTO.Password + user.Salt);

                    if (hash != user.Hash)
                    {
                        return BadRequest("Hibás név vagy jelszó/inaktív felhasználó!");
                    }

                    // 4) Ha minden stimmel, generálunk egy tokent és eltároljuk
                    string token = Guid.NewGuid().ToString();
                    lock (Program.LoggedInUsers)
                    {
                        Program.LoggedInUsers[token] = user;
                    }

                    // 5) A profilképet Base64 stringgé konvertáljuk, hogy a kliens is megjeleníthesse
                    string base64Picture = user.ProfilePicturePath != null && user.ProfilePicturePath.Length > 0
                        ? Convert.ToBase64String(user.ProfilePicturePath)
                        : "";

                    // 6) Visszaküldjük a LoggedUser DTO-t
                    return Ok(new LoggedUser
                    {
                        Name = user.Name,
                        Email = user.Email,
                        Permission = user.PermissionId,
                        ProfilePicturePath = base64Picture, // string, base64
                        Token = token
                    });
                }
                catch (Exception ex)
                {
                    return BadRequest("Hiba történt: " + ex.Message);
                }
            }
        }



        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto dto)
        {
            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    // Ellenőrizzük, hogy nincs-e már ilyen email
                    if (cx.Users.Any(u => u.Email == dto.Email))
                        return BadRequest("Az e-mail cím már foglalt.");

                    // Generálunk salt-ot és hash-t
                    string salt = Program.GenerateSalt();
                    // A jelszó tárolásánál: password + salt
                    string hash = Program.CreateSHA256(dto.Password + salt);

                    // Ha nincs profilkép, üres tömb
                    byte[] profilePictureData = string.IsNullOrEmpty(dto.ProfilePicture)
                        ? new byte[0]
                        : Convert.FromBase64String(dto.ProfilePicture);

                    var user = new User
                    {
                        Name = dto.FullName,
                        LoginNev = dto.Username,
                        Email = dto.Email,
                        Hash = hash,
                        Salt = salt,
                        ProfilePicturePath = profilePictureData,
                        Active = true,
                        PermissionId = 2  // Admin
                    };

                    cx.Users.Add(user);
                    await cx.SaveChangesAsync();
                    return Ok("Admin regisztráció sikeres.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }


        [HttpGet("EmailName")]
        public async Task<IActionResult> GetUserData([FromQuery] string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                var currentUser = Program.LoggedInUsers[token];
                // Csak az adminok (PermissionId == 2) férhetnek hozzá
                if (currentUser.PermissionId == 2)
                {
                    try
                    {
                        using (var cx = new FilmfokuszContext())
                        {
                            var users = await cx.Users.Select(u => new
                            {
                                u.Id,
                                u.LoginNev,
                                u.Name,
                                u.PermissionId,
                                u.Active,
                                u.Email,
                                u.Hash,
                                u.Salt
                            }).ToListAsync();
                            return Ok(users);
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.InnerException?.Message);
                    }
                }
                else
                {
                    return BadRequest("Nincs jogod hozzá!");
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá!");
            }
        }




        [HttpPost("{token}")]
        public async Task<IActionResult> Post(string token, [FromBody] User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.Users.Add(user);
                        await cx.SaveChangesAsync();
                        return Ok("Felhasználó hozzáadva.");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message ?? ex.Message);
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá!");
            }
        }


        [HttpPut("{token}")]
        public async Task<IActionResult> Put(string token, [FromBody] User updatedUser)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                var currentUser = Program.LoggedInUsers[token];
                // Ha 9 vagy 2 a PermissionId, engedélyezzük
                if (currentUser.PermissionId == 9 || currentUser.PermissionId == 2)
                {
                    try
                    {
                        using (var cx = new FilmfokuszContext())
                        {
                            var existingUser = await cx.Users.FindAsync(updatedUser.Id);
                            if (existingUser == null)
                            {
                                return NotFound("A megadott felhasználó nem található.");
                            }

                            // Frissítjük a mezőket
                            existingUser.LoginNev = updatedUser.LoginNev;
                            existingUser.Hash = updatedUser.Hash;
                            existingUser.Salt = updatedUser.Salt;
                            existingUser.Name = updatedUser.Name;
                            existingUser.PermissionId = updatedUser.PermissionId;
                            existingUser.Active = updatedUser.Active;
                            existingUser.Email = updatedUser.Email;
                            existingUser.ProfilePicturePath = updatedUser.ProfilePicturePath;

                            await cx.SaveChangesAsync();
                            return Ok("A felhasználó adatai módosítva.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.InnerException?.Message ?? ex.Message);
                    }
                }
                else
                {
                    return BadRequest("Nincs jogod hozzá (PermissionId != 9 vagy 2)!");
                }
            }
            else
            {
                return BadRequest("Érvénytelen token!");
            }

        }

        [HttpDelete("{token}/{id}")]
        public async Task<IActionResult> Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                var currentUser = Program.LoggedInUsers[token];
                // Engedélyezzük a törlést, ha a felhasználó PermissionId 9 vagy 2
                if (currentUser.PermissionId == 9 || currentUser.PermissionId == 2)
                {
                    try
                    {
                        using (var cx = new FilmfokuszContext())
                        {
                            var user = await cx.Users.FindAsync(id);
                            if (user == null)
                            {
                                return NotFound("A megadott felhasználó nem található.");
                            }
                            cx.Users.Remove(user);
                            await cx.SaveChangesAsync();
                            return Ok("A felhasználó adatai törölve.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.InnerException?.Message ?? ex.Message);
                    }
                }
                else
                {
                    return BadRequest("Nincs jogod hozzá!");
                }
            }
            else
            {
                return BadRequest("Nincs jogod hozzá!");
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    if (cx.Users.Any(u => u.Email == dto.Email))
                        return BadRequest("Az e-mail cím már foglalt.");

                    // Generáljunk salt-ot és hash-t a jelszóhoz
                    string salt = Program.GenerateSalt();
                    string hash = Program.CreateSHA256(dto.Password + salt);
                    byte[] profilePictureData;
                    if (string.IsNullOrEmpty(dto.ProfilePicture))
                    {
                        // Mivel a backendben nincs defaultuser.png, ha a felhasználó nem tölt fel képet, 
                        // akkor üres értéket adunk vissza.
                        profilePictureData = new byte[0];
                    }
                    else
                    {
                        // A kliens Base64 kódolt stringet küld a képről
                        profilePictureData = Convert.FromBase64String(dto.ProfilePicture);
                    }


                    // Létrehozzuk a User entitást
                    var user = new User
                    {
                        Name = dto.FullName,          // Teljes név
                        LoginNev = dto.Username,      // Felhasználónév
                        Email = dto.Email,
                        Hash = hash,
                        Salt = salt,
                        ProfilePicturePath = profilePictureData,
                        Active = true,
                        PermissionId = 1
                    };

                    cx.Users.Add(user);
                    await cx.SaveChangesAsync();
                    return Ok("Regisztráció sikeres.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }



        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            using (var cx = new FilmfokuszContext())
            {
                var user = cx.Users.FirstOrDefault(u => u.LoginNev == loginDto.Username);
                if (user == null)
                {
                    return BadRequest("Nincs ilyen felhasználó!");
                }
                string hash = Program.CreateSHA256(loginDto.Password + user.Salt);
                if (hash == user.Hash)
                {
                    var userDto = new
                    {
                        Id = user.Id,
                        FullName = user.Name,
                        Username = user.LoginNev,
                        Email = user.Email,
                        ProfilePicture = user.ProfilePicturePath
                    };
                    return Ok(userDto);
                }
                else
                {
                    return BadRequest("Hibás jelszó!");
                }
            }
        }


    }
}
