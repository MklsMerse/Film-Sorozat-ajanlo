import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreSorozatoks.css';

// Képek objektuma, sorozatcímekhez rendelve
const sorozatImages = {

  //Sci-Fi
  "Stranger Things": "https://static.posters.cz/image/350/plakatok/stranger-things-seasons-i132237.jpg",
  "A Térség": "https://m.media-amazon.com/images/M/MV5BYzUyYmI3MjctY2Q2MC00NmFjLTgwZGUtNWQzZWNlYmVjNzE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Westworld": "https://m.media-amazon.com/images/M/MV5BMjM2MTA5NjIwNV5BMl5BanBnXkFtZTgwNjI2OTMxNTM@._V1_FMjpg_UX1000_.jpg",
  "Black Mirror": "https://hips.hearstapps.com/hmg-prod/images/black-mirror-font-1513096756.jpg?crop=1xw:1xh;center,top&resize=980:*",
  "The Mandalorian": "https://m.media-amazon.com/images/M/MV5BNjgxZGM0OWUtZGY1MS00MWRmLTk2N2ItYjQyZTI1OThlZDliXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "The 100": "https://m.media-amazon.com/images/M/MV5BNDdmZGYwOWEtN2FkZC00Y2ExLWJkY2UtNzFlODVlNzc3MGIzXkEyXkFqcGc@._V1_.jpg",
  "Altered Carbon": "https://m.media-amazon.com/images/M/MV5BNTY4MWY1ZDktZjQxZS00ZDc5LWE3OTctZDU5MzQ2ZWU5ZTJkXkEyXkFqcGc@._V1_.jpg",
  "Doctor Who": "https://m.media-amazon.com/images/M/MV5BZGVmY2RkZjAtZDAwMC00MmZhLThhMGItZmVlNzE4MTgyMWRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Star Trek: Discovery": "https://images.prismic.io/star-trek-untold/8b2a6629-fc5c-40dc-ac35-6a43533e509f_StarTrek_Discovery_S2_KeyArt_2023_full.png?auto=compress,format",
  "Fringe": "https://m.media-amazon.com/images/M/MV5BMWVlMmE1MmEtNjhjMC00MDdmLWIzZGMtNjc1YTZmNDc2MWExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",

  //Akció
  "24" : "https://m.media-amazon.com/images/M/MV5BMTg5OTkyNzA0NF5BMl5BanBnXkFtZTcwMDYyMDUwMg@@._V1_.jpg",
  "Prison Break" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185128_b_v8_ag.jpg",
  "Arrow" : "https://m.media-amazon.com/images/I/91EMBx6EchL._AC_UF894,1000_QL80_.jpg",
  "The Punisher" : "https://m.media-amazon.com/images/M/MV5BZTI2NDllMjgtOWEyYi00Y2YxLThhYjQtNTQ0NTgwNDE1YmYzXkEyXkFqcGc@._V1_.jpg",
  "Jack Ryan" : "https://m.media-amazon.com/images/M/MV5BNGYxNzgzNTQtY2U0OC00NzU2LTgxZmYtNmZkMmVlMjgyMzM3XkEyXkFqcGc@._V1_.jpg",
  "Vikings" : "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/vikings_0.png",
  "The Witcher" : "https://m.media-amazon.com/images/M/MV5BMTQ5MDU5MTktMDZkMy00NDU1LWIxM2UtODg5OGFiNmRhNDBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Spartacus" : "https://m.media-amazon.com/images/M/MV5BMTYyMjI4NzYxOF5BMl5BanBnXkFtZTcwNTUwMTc1NA@@._V1_FMjpg_UX1000_.jpg",
  "Lethal Weapon" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12901129_b_v8_ad.jpg",
  "Fallout" : "https://m.media-amazon.com/images/M/MV5BNjI5ZmZkNDktZDliMS00ZjlmLWE2MTUtMWVlZjU2YWQ3ZDYxXkEyXkFqcGc@._V1_.jpg",
  "Squid Game" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p20492218_b_v8_ae.jpg",

  //Romantikus
  "Outlander" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10426922_b_v8_aa.jpg",
  "Bridgerton" : "https://resizing.flixster.com/2lDrCwrxvzXcFQVa6a6MvLiNX8w=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNDNkOWY2ZjgtYjhmMi00N2NjLTgyNGUtMTc2OTlhOTcwODc0LmpwZw==",
  "The Vampire Diaries" : "https://m.media-amazon.com/images/M/MV5BMmNjOWQzYmYtNGYxOS00MjVkLTg1MWUtMTkzMGE0MDgwNzQ5XkEyXkFqcGc@._V1_.jpg",
  "Grey's Anatomy" : "https://m.media-amazon.com/images/M/MV5BYTVjNWVhYTctMGJkMS00NWFjLWE2N2QtNmQ1Y2FhZDFkNzUwXkEyXkFqcGc@._V1_.jpg",
  "Normal People" : "https://m.media-amazon.com/images/M/MV5BYWUzNjQ2YmYtNWI3Yi00NzNmLWJjYWYtMDFiM2RjYjNjZWZmXkEyXkFqcGc@._V1_.jpg",
  "Gossip Girl" : "https://pyxis.nymag.com/v1/imgs/3ba/e9d/70408e0d983f50c816a989d435b74a8545-19-gossip-girl-poster-s4.2x.w710.jpg",
  "Love" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12486693_b_v8_aa.jpg",
  "Jane the Virgin" : "https://m.media-amazon.com/images/M/MV5BZjNjZWI4OWUtZDY3Yy00NDBhLWE3YjMtNzc2ZTVjMjRkOWFlXkEyXkFqcGc@._V1_.jpg",
  "Sweet Magnolias" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18242664_b_v13_ac.jpg",
  "Poldark" : "https://m.media-amazon.com/images/M/MV5BOWE4MmQ2ZjktMmQ4Yy00ZTExLTkyNmUtODA0ODI4YmE0NDA3XkEyXkFqcGc@._V1_.jpg",

  //Dráma
  "Terápia" : "https://m.media-amazon.com/images/M/MV5BNDgwNDE2NTA5OV5BMl5BanBnXkFtZTgwNjg5MTczNTE@._V1_.jpg",
  "Breaking Bad" : "https://images.squarespace-cdn.com/content/v1/5c8d218eebfc7faf979aeb3d/26dcec5a-3057-4cda-a383-c2da1af03db3/breaking+bad+season+1.png",
  "The Sopranos" : "https://m.media-amazon.com/images/I/41ILDmVqlNL._AC_UF894,1000_QL80_.jpg",
  "The Crown" : "https://images.squarespace-cdn.com/content/v1/5b15d26ce749408e659ba6eb/1608323718044-PIH4MCJP59WCK6ME9UVA/IMG_4527.JPG",
  "Euphoria" : "https://m.media-amazon.com/images/M/MV5BZjVlN2M2N2MtOWViZC00MzIxLTlhZWEtMTIwNDIwMzE3ZWJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Succession" : "https://m.media-amazon.com/images/I/61qvi1qQnqL._AC_UF1000,1000_QL80_.jpg",
  "The Handmaid's Tale" : "https://m.media-amazon.com/images/M/MV5BODFiMDg5NjItY2JlMS00NWY0LThmMTItOTI1MjkzNTBmYTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Big Little Lies" : "https://m.media-amazon.com/images/M/MV5BY2E3ODNhNWYtYWQ0ZS00ZjdlLTg5NjItMzYwMTlkN2I3YTFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "The West Wing" : "https://resizing.flixster.com/R5jz1fQD_lqlnTv8XRsOIqyKTHg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMmE2MzZkMjEtMmM1Mi00ZWJiLTlmMjAtNTIxZDVlMWQ0NTM1LmpwZw==",
  "This Is Us" : "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12900254_b_v8_aa.jpg",
  "Mad Men" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTont6fz6GIeNcQSadf9hkO2kOoPeOoa1rBow&s",

  //Vígjáték
  "A mi kis falunk" : "https://images.justwatch.com/poster/302072377/s718/evad-1.jpg",
  "Friends" : "https://m.media-amazon.com/images/M/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "The Office" : "https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Brooklyn Nine-Nine" : "https://m.media-amazon.com/images/M/MV5BNzBiODQxZTUtNjc0MC00Yzc1LThmYTMtN2YwYTU3NjgxMmI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Parks and Recreation" : "https://m.media-amazon.com/images/M/MV5BNDlhMzAwNTAtNTk2NS00MTdkLWE3ZWYtMDU0MTFiYmU2ZTc0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "How I Met Your Mother" : "https://m.media-amazon.com/images/M/MV5BNjg1MDQ5MjQ2N15BMl5BanBnXkFtZTYwNjI5NjA3._V1_FMjpg_UX1000_.jpg",
  "Modern Family" : "https://www.peacocktv.com/dam/growth/assets/Library/ModernFamily/modern-family-description-image.jpg",
  "The Big Bang Theory" : "https://m.media-amazon.com/images/M/MV5BZjgzY2QyNzItNDhhYi00ZWIwLWFjN2UtZDJkN2MxYWNjMmJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Scrubs" : "https://m.media-amazon.com/images/M/MV5BZDYwNTk4YzEtMTRjNS00YWZjLTlkOWYtYzFlYWQyMjU2ZjkwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Arrested Development" : "https://m.media-amazon.com/images/M/MV5BOTk3N2M0MjktMDhkNi00ZGVhLTk4YTUtYjI5MDJmMWUzNTgwXkEyXkFqcGc@._V1_.jpg",
  "It's Always Sunny in Philadelphia" : "https://m.media-amazon.com/images/M/MV5BZTEyY2Q1MmYtNDZmOS00NDM2LWFjZDAtMTU5MmU1MWU3YzNhXkEyXkFqcGc@._V1_.jpg",

  //Horror
  "The Haunting of Hill House" : "https://m.media-amazon.com/images/M/MV5BMTU4NzA4MDEwNF5BMl5BanBnXkFtZTgwMTQxODYzNjM@._V1_FMjpg_UX1000_.jpg",
  "American Horror Story" : "https://www.mafab.hu/static/2022/300/11/196370_1666948221.5747.jpg",
  "The Walking Dead" : "https://m.media-amazon.com/images/M/MV5BYWQwMGRhNGEtZTNhMy00MzVjLWJhMjItYjcwMDljMTkyNTg2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Penny Dreadful" : "https://m.media-amazon.com/images/M/MV5BZjkxMDAzMDgtNzFhNS00MjJkLWI5NTctZGRjODg3MzRiOWEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Bates Motel" : "https://m.media-amazon.com/images/M/MV5BMzk4OTU5NTE2M15BMl5BanBnXkFtZTcwNTIxMDIyOQ@@._V1_.jpg",
  "Marianne" : "https://m.media-amazon.com/images/M/MV5BZGZjYmQ4NzItMDA4Mi00ZjRjLWE3Y2ItYmY2ZTJkNmNhYTVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Castle Rock" : "https://m.media-amazon.com/images/M/MV5BMDc0NWMyMGEtNDdjMy00MzRlLWFmMGYtZThmNTRhOGQ3OTIxXkEyXkFqcGc@._V1_.jpg",
  "Slasher" : "https://m.media-amazon.com/images/M/MV5BMzgzM2U3YzQtNGQwMi00MmI4LWFhMDEtN2RlMzNkYTBmMGIzXkEyXkFqcGc@._V1_.jpg",
  "The Terror" : "https://m.media-amazon.com/images/M/MV5BNTUxNzI1MzcwN15BMl5BanBnXkFtZTgwMjA1MTg5NDM@._V1_.jpg",
  "Servant" : "https://m.media-amazon.com/images/M/MV5BY2ZmZGY3NTctNGI4OC00OWI1LTgxY2EtYWExYjYyNDcxMTA0XkEyXkFqcGc@._V1_.jpg",

  //Thriller
  "Mindhunter" : "https://m.media-amazon.com/images/M/MV5BYTk4NDA4MGMtNjliOC00MjExLWI1YzctOTc4NWIxM2I1YjM5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "True Detective" : "https://m.media-amazon.com/images/M/MV5BYjgwYzA1NWMtNDYyZi00ZGQyLWI5NTktMDYwZjE2OTIwZWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "The Night Of" : "https://m.media-amazon.com/images/M/MV5BMjQyOTgxMDI0Nl5BMl5BanBnXkFtZTgwOTE4MzczOTE@._V1_.jpg",
  "You" : "https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Ozark" : "https://resizing.flixster.com/3ko6zO6791p1QPOXHUI2eCwmHXQ=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMDIyOTBmN2QtMzM0Yi00ODUxLWE0MWYtMmViYWJiOGViZjRkLmpwZw==",
  "Broadchurch" : "https://m.media-amazon.com/images/M/MV5BNDU4ODc2MWMtNDBhMC00N2M3LWI5YzAtMGFjN2U1ZjBlOGU4XkEyXkFqcGc@._V1_.jpg",
  "Bodyguard" : "https://m.media-amazon.com/images/M/MV5BN2I0NWE2Y2QtM2I3YS00MzRlLThlMjAtMDViNGMwNjRhZjVlXkEyXkFqcGc@._V1_.jpg",
  "The Killing" : "https://m.media-amazon.com/images/M/MV5BMTQ5MTUxMzU3Ml5BMl5BanBnXkFtZTgwMDU3NDYxMjE@._V1_.jpg",
  "Hannibal" : "https://m.media-amazon.com/images/M/MV5BNjBmYjdiMzItNTEwNi00YTI2LTg4YjctOTRjNDYxNTUxNGQ1XkEyXkFqcGc@._V1_.jpg",
  "The Sinner" : "https://m.media-amazon.com/images/M/MV5BMTRkNGZlMjUtZGVhZi00YjgzLTgwZmMtMGVlZTc4OGUzODk1XkEyXkFqcGc@._V1_.jpg",

  //Kaland
  "Game of Thrones" : "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Merlin" : "https://upload.wikimedia.org/wikipedia/commons/3/3d/Merlin_%28TV_Series_2008-2012%29.jpg",
  "Black Sails" : "https://m.media-amazon.com/images/M/MV5BZGZmOGNjNzUtNTNkMC00ZDU2LThjMDAtZGM2OGRjMjE1OGQ5XkEyXkFqcGc@._V1_.jpg",
  "The Expanse" : "https://m.media-amazon.com/images/M/MV5BYzUyYmI3MjctY2Q2MC00NmFjLTgwZGUtNWQzZWNlYmVjNzE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "His Dark Materials" : "https://m.media-amazon.com/images/M/MV5BZjM2MDIxMTYtMDUwYy00Y2VlLTgwZWQtMTE4MzgyNzNmYmRjXkEyXkFqcGc@._V1_.jpg",
  "Legend of the Seeker" : "https://m.media-amazon.com/images/M/MV5BODcyNTM4MjUwOF5BMl5BanBnXkFtZTcwNTE5Mjc2Nw@@._V1_.jpg",

  //Animáció
  "Rick and Morty" : "https://m.media-amazon.com/images/M/MV5BZGQyZjk2MzMtMTcyNC00NGU3LTlmNjItNDExMWM4ZDFhYmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "BoJack Horseman" : "https://m.media-amazon.com/images/M/MV5BZmMwMDlkNTEtMmQzZS00ODQ0LWJlZmItOTgwYWMwZGM4MzFiXkEyXkFqcGc@._V1_.jpg",
  "The Simpsons" : "https://m.media-amazon.com/images/M/MV5BNTU2OWE0YWYtMjRlMS00NTUwLWJmZWUtODFhNzJiMGJlMzI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Family Guy" : "https://m.media-amazon.com/images/M/MV5BNTZlMGQ1YjEtMzVlNC00ZmMxLTk0MzgtZjdkYTU1NmUxNTQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Futurama" : "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/10402678A22062838CDA2CD3C43B8B5BCE6470AB563D02A0395AC494774BA362/scale?width=506&aspectRatio=2.00&format=webp",
  "South Park" : "https://m.media-amazon.com/images/M/MV5BNTBlMzA3ZTUtODZjNi00NTM0LWExMjMtNjJhYzA3YTkwMWYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Avatar: The Last Airbender" : "https://foreveryoungadult.com/wp-content/uploads/2021/10/Avatar-the-last-Airbender-Cover.jpg",
  "Gravity Falls" : "https://m.media-amazon.com/images/M/MV5BMTEzNDc3MDQ2NzNeQTJeQWpwZ15BbWU4MDYzMzUwMDIx._V1_FMjpg_UX1000_.jpg",
  "Archer" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBpa37xRyTitaRpfnk33tOK1Wdoimu6mC3gg&s",
  "The Legend of Korra" : "https://m.media-amazon.com/images/I/71vTmwA6j9L._AC_UF1000,1000_QL80_.jpg",
};

export const GenreSorozatoks = () => {
  const { mufaj } = useParams();
  const [sorozat, setSorozatok] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/sorozatok/mufaj/${token}/${mufaj}`;
    console.log('Küldöm a kérést:', url);
    fetch(url)
      .then(res => {
        console.log('HTTP státusz:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Kapott adatok:', data);
        setSorozatok(data);
      })
      .catch(err => console.error('Hiba a sorozatok lekérésekor:', err));
  }, [mufaj, token]);

  
  return (
    <div className="genre-sorozatok">
      <h2>{mufaj} sorozatok</h2>
      <div className="sorozatok-container">
        {sorozat.length > 0 ? (
          sorozat.map((sorozat) => (
            <div key={sorozat.SorozatId} className="sorozat-card">
              <img
                src={sorozatImages[sorozat.cim] || '/placeholder.png'}
                alt={sorozat.cim}
                className="sorozat-image"
              />
              <h3>{sorozat.cim}</h3>
              <p>{sorozat.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Nincsenek találatok a(z) {mufaj} műfajra.</p>
        )}
      </div>
    </div>
  );
};
