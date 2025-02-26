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
        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
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
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
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
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
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
        [HttpDelete("delete-sorozat")]
        public IActionResult DeleteSorozat(string token, int sorozatId)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].PermissionId == 9)
            {
                try
                {
                    using (var cx = new FilmfokuszContext())
                    {
                        // Megkeressük a törlendő filmet
                        var sorozatToDelete = cx.Sorozatoks.FirstOrDefault(f => f.SorozatId == sorozatId);
                        if (sorozatToDelete == null)
                        {
                            return NotFound($"Nem található sorozat az {sorozatId} azonosítóval.");
                        }

                        cx.Sorozatoks.Remove(sorozatToDelete);
                        cx.SaveChanges();
                        return Ok("A sorozat adatai törölve.");
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
