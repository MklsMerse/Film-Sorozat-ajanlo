using FilmFokuszBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using FilmFokuszBackEnd.DTOs;

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

    }
}
