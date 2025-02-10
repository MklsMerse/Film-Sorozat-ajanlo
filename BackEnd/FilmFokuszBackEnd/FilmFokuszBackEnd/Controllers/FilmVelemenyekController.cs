using FilmFokuszBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmFokuszBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmVelemenyekController : ControllerBase
    {
        [HttpPost("{token}")]

        public async Task<IActionResult> Post(string token, FilmVelemenyek filmVelemenyek)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.FilmVelemenyeks.Add(filmVelemenyek);
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

        public async Task<IActionResult> Put(string token, FilmVelemenyek filmVelemenyek)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.FilmVelemenyeks.Update(filmVelemenyek);
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
        [HttpGet("{id},{token}")]

        public async Task<IActionResult> GetId(int id, string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        return Ok(await cx.FilmVelemenyeks.FirstOrDefaultAsync(f => f.VelemenyId == id));
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
