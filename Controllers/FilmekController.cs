using FilmFokuszBackEnd.DTOs;
using FilmFokuszBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmFokuszBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmekController : ControllerBase
    {

        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        return Ok(await cx.Filmeks.ToListAsync());
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

        [HttpGet("velemenyek/{token},{filmId}")]
        public async Task<IActionResult> GetVelemenyek(string token,int filmId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        return Ok(await cx.Filmeks.Include(f=>f.FilmVelemenyeks).FirstOrDefaultAsync(f=>f.FilmId==filmId));
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
        public async Task<IActionResult> Post(string token, [FromBody] Filmek film)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.Filmeks.Add(film);
                        await cx.SaveChangesAsync();
                        return Ok("Film hozzáadva.");
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
        public async Task<IActionResult> UpdateFilm(string token, [FromBody] Filmek updatedFilm)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        var existingFilm = await cx.Filmeks.FirstOrDefaultAsync(f => f.FilmId == updatedFilm.FilmId);
                        if (existingFilm == null)
                        {
                            return NotFound($"Nem található film a megadott {updatedFilm.FilmId} azonosítóval.");
                        }

                        // Frissítjük az összes releváns mezőt
                        existingFilm.Cim = updatedFilm.Cim;
                        existingFilm.Leiras = updatedFilm.Leiras;
                        existingFilm.MegjelenesiDatum = updatedFilm.MegjelenesiDatum;
                        existingFilm.Mufaj = updatedFilm.Mufaj;
                        existingFilm.Rendezo = updatedFilm.Rendezo;
                        existingFilm.Szereplok = updatedFilm.Szereplok;
                        existingFilm.Ertekeles = updatedFilm.Ertekeles;
                        existingFilm.FilmUrl = updatedFilm.FilmUrl;

                        cx.Filmeks.Update(existingFilm);
                        await cx.SaveChangesAsync();
                        return Ok("A film adatai módosítva.");
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


        [HttpDelete("delete-film")]
        public IActionResult DeleteFilm(string token, int filmId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        // Megkeressük a törlendő filmet
                        var filmToDelete = cx.Filmeks.FirstOrDefault(f => f.FilmId == filmId);
                        if (filmToDelete == null)
                        {
                            return NotFound($"Nem található film az {filmId} azonosítóval.");
                        }

                        cx.Filmeks.Remove(filmToDelete);
                        cx.SaveChanges();
                        return Ok("A film adatai törölve.");
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

