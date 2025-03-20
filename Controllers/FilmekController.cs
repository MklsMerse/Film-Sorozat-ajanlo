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
        [HttpGet("mufaj/{token}/{mufaj}")]
        public async Task<IActionResult> GetFilmekByMufaj(string token, string mufaj)
        {
            // Ellenőrizzük, hogy a token érvényes-e
            if (!Program.LoggedInUsers.ContainsKey(token))
            {
                return Unauthorized("Érvénytelen token! Jelentkezz be újra.");
            }

            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    // Mivel az adatbázisban lehet, hogy kisbetűs a műfaj neve, normalizáljuk a bejövő adatot
                    string normalizedMufaj = mufaj.ToLower();

                    // Ellenőrzés, hogy van-e ilyen műfajú film az adatbázisban
                    var films = await cx.Filmeks
                        .Where(f => f.Mufaj == mufaj)
                        .Select(f => new
                        {
                            f.FilmId,
                            f.Cim,
                            f.Mufaj,
                            f.FilmUrl,
                            f.Leiras,
                            f.Rendezo,
                            f.Szereplok,
                            f.MegjelenesiDatum
                        })
                        .ToListAsync();

                    if (films.Count == 0)
                    {
                        return NotFound($"Nincsenek találatok a(z) '{mufaj}' műfajra.");
                    }

                    return Ok(films);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Szerverhiba: " + (ex.InnerException?.Message ?? ex.Message));
            }
        }


        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) &&
               (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
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
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
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
            // Ha a token létezik és a user PermissionId-je 9 VAGY 2, engedélyezzük a frissítést
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
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



        [HttpDelete("delete-film/{token}/{filmId}")]
        public IActionResult DeleteFilm(string token, int filmId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
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

        [HttpGet("filmek-evtized/{token}/{evtized}")]
        public async Task<IActionResult> GetFilmekByEvtized(string token, int evtized)
        {
            if (!Program.LoggedInUsers.ContainsKey(token))
            {
                return Unauthorized("Érvénytelen token! Jelentkezz be újra.");
            }

            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    int startYear = evtized;
                    int endYear = evtized + 9;

                    var films = await cx.Filmeks
                        .Where(f => f.MegjelenesiDatum.Year >= startYear && f.MegjelenesiDatum.Year <= endYear)
                        .Select(f => new
                        {
                            f.FilmId,
                            f.Cim,
                            f.Leiras,
                            f.MegjelenesiDatum,
                            f.Mufaj,
                            f.Rendezo,
                            f.Szereplok,
                            f.Ertekeles,
                            f.FilmUrl
                        })
                        .ToListAsync();

                    if (films.Count == 0)
                    {
                        return NotFound($"Nincsenek találatok a(z) {startYear}-{endYear} közötti évtizedre.");
                    }

                    return Ok(films);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Szerverhiba: " + (ex.InnerException?.Message ?? ex.Message));
            }
        }

        [HttpGet("filtered-films/{token}")]
        public async Task<IActionResult> GetFilteredFilms(string token, [FromQuery] string mufaj, [FromQuery] int ev)
        {
            if (!Program.LoggedInUsers.ContainsKey(token))
            {
                return Unauthorized("Érvénytelen token! Jelentkezz be újra.");
            }

            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    int startYear = ev;
                    int endYear = ev + 9; // Például: 1990 → 1999

                    var filteredFilms = await cx.Filmeks
                        .Where(f => f.Mufaj == mufaj && f.MegjelenesiDatum.Year >= startYear && f.MegjelenesiDatum.Year <= endYear)
                        .Select(f => new
                        {
                            f.FilmId,
                            f.Cim,
                            f.Mufaj,
                            f.FilmUrl,
                            f.Leiras,
                            f.Rendezo,
                            f.Szereplok,
                            f.MegjelenesiDatum
                        })
                        .ToListAsync();

                    if (!filteredFilms.Any())
                    {
                        return NotFound($"Nincsenek találatok a(z) '{mufaj}' műfajra {startYear}-{endYear} között.");
                    }

                    return Ok(filteredFilms);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Szerverhiba: " + (ex.InnerException?.Message ?? ex.Message));
            }
        }


    }
}

