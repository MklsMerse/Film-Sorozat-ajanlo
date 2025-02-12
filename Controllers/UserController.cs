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

        public async Task<IActionResult> GetEmailName(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        return Ok(await cx.Users.Select(f => new EmailNameDTO { Email = f.Email, Name = f.Name }).ToListAsync());
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

            public async Task<IActionResult> Post(string token, User user)
            {
                if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
                {
                    try
                    {
                        using (var cx = new FilmfokuszContext())
                        {
                        cx.Users.Add(user);
                        cx.SaveChanges();
                            return Ok("");
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
        [HttpPut("{token}")]

        public async Task<IActionResult> Put(string token, User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.Users.Update(user);
                        cx.SaveChanges();
                        return Ok("A felhasználó adatai módosítva.");
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
        [HttpDelete("{token},{id}")]

        public IActionResult Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.Users.Remove(new User {  Id=id });
                        cx.SaveChanges();
                        return Ok("A felhasználó adatai törölve.");
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
    }
}
