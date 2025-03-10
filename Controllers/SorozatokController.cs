using FilmFokuszBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmFokuszBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SorozatokController : ControllerBase
    {
        [HttpGet("mufaj/{token}/{mufaj}")]
        public async Task<IActionResult> GetSorozatokByMufaj(string token, string mufaj)
        {
           
            if (!Program.LoggedInUsers.ContainsKey(token))
            {
                return Unauthorized("Érvénytelen token! Jelentkezz be újra.");
            }

            try
            {
                using (var cx = new FilmfokuszContext())
                {
                    string normalizedMufaj = mufaj.ToLower();

                    var sorozatoks = await cx.Sorozatoks
                        .Where(f => f.Mufaj == mufaj)
                        .Select(f => new
                        {
                            f.SorozatId,
                            f.Cim,
                            f.Mufaj,
                            f.Leiras,
                            f.Rendezo,
                            f.Szereplok,
                            f.SorozatUrl,
                            f.EvadokSzama,
                            f.MegjelenesiDatum
                        })
                        .ToListAsync();

                    if (sorozatoks.Count == 0)
                    {
                        return NotFound($"Nincsenek találatok a(z) '{mufaj}' műfajra.");
                    }

                    return Ok(sorozatoks);
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
                        return Ok(await cx.Sorozatoks.ToListAsync());
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


        [HttpGet("velemenyek/{token},{sorozatId}")]
        public async Task<IActionResult> GetVelemenyek(string token, int sorozatId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        return Ok(await cx.Sorozatoks.Include(f => f.SorozatVelemenyeks).FirstOrDefaultAsync(f => f.SorozatId == sorozatId));
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
        public async Task<IActionResult> Post(string token, [FromBody] Sorozatok sorozat)
        {
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        cx.Sorozatoks.Add(sorozat);
                        await cx.SaveChangesAsync();
                        return Ok("Sorozat hozzáadva.");
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
        public async Task<IActionResult> UpdateSorozat(string token, [FromBody] Sorozatok updatedSorozat)
        {
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        var existingSorozat = await cx.Sorozatoks.FirstOrDefaultAsync(f => f.SorozatId == updatedSorozat.SorozatId);
                        if (existingSorozat == null)
                        {
                            return NotFound($"Nem található sorozat a megadott {updatedSorozat.SorozatId} azonosítóval.");
                        }

                        // Frissítjük az összes releváns mezőt
                        existingSorozat.Cim = updatedSorozat.Cim;
                        existingSorozat.Leiras = updatedSorozat.Leiras;
                        existingSorozat.MegjelenesiDatum = updatedSorozat.MegjelenesiDatum;
                        existingSorozat.Mufaj = updatedSorozat.Mufaj;
                        existingSorozat.Rendezo = updatedSorozat.Rendezo;
                        existingSorozat.Szereplok = updatedSorozat.Szereplok;
                        existingSorozat.Ertekeles = updatedSorozat.Ertekeles;
                        existingSorozat.SorozatUrl = updatedSorozat.SorozatUrl;
                        existingSorozat.EvadokSzama = updatedSorozat.EvadokSzama;

                        cx.Sorozatoks.Update(existingSorozat);
                        await cx.SaveChangesAsync();
                        return Ok("A sorozat adatai módosítva.");
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

        [HttpDelete("delete-sorozat/{token}/{sorozatId}")]
        public async Task<IActionResult> DeleteSorozat(string token, int sorozatId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) &&
                (Program.LoggedInUsers[token].PermissionId == 9 || Program.LoggedInUsers[token].PermissionId == 2))
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        var sorozatToDelete = await cx.Sorozatoks.FindAsync(sorozatId);
                        if (sorozatToDelete == null)
                        {
                            return NotFound($"Nem található sorozat a megadott {sorozatId} azonosítóval.");
                        }

                        cx.Sorozatoks.Remove(sorozatToDelete);
                        await cx.SaveChangesAsync();
                        return Ok("A sorozat sikeresen törölve.");
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
