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

        [HttpGet("/EmailName{token}")]
        public async Task<IActionResult> GetUserData(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        var users = await cx.Users.Select(u => new
                        {
                            u.Id,
                            u.LoginNev,
                            u.Hash,
                            u.Salt,
                            u.Name,
                            u.PermissionId,
                            u.Active,
                            u.Email,
                            u.ProfilePicturePath
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
            // Ellenőrizzük, hogy létezik-e a token, és a PermissionId == 9 jogosultság rendben van-e
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        // Megkeressük a meglévő felhasználót az adatbázisban az Id alapján
                        var existingUser = await cx.Users.FindAsync(updatedUser.Id);
                        if (existingUser == null)
                        {
                            return NotFound("A megadott felhasználó nem található.");
                        }

                        // Frissítjük a mezőket a bejövő adatok alapján
                        existingUser.LoginNev = updatedUser.LoginNev;
                        existingUser.Hash = updatedUser.Hash;
                        existingUser.Salt = updatedUser.Salt;
                        existingUser.Name = updatedUser.Name;
                        existingUser.PermissionId = updatedUser.PermissionId;
                        existingUser.Active = updatedUser.Active;
                        existingUser.Email = updatedUser.Email;
                        existingUser.ProfilePicturePath = updatedUser.ProfilePicturePath;

                        // Elmentjük a változtatásokat
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
                return BadRequest("Nincs jogod hozzá!");
            }
        }

        [HttpDelete("{token}/{id}")]
        public async Task<IActionResult> Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
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
