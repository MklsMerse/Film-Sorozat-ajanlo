import React, { useEffect, useState } from 'react';
import './AllMovies.css';

const osszesFilm = {
    
  //Sci-Fi
  "Eredet": "https://journality.hu/wp-content/uploads/2010/10/eredet.jpg",
  "Interstellar" : "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
  "Szárnyas fejvadász 2049" : "https://media.port.hu/images/000/972/545.jpg",
  "Dűne" : "https://media.port.hu/images/001/414/796.jpg",
  "Mentőexpedíció" : "https://media.port.hu/images/000/808/815.jpg",
  "A holnap határa" : "https://media.port.hu/images/000/600/178.jpg",
  "Érkezés" : "https://www.mafab.hu/static/2016/295/10/273135_1477125644.0774.jpg",
  "Ex Machina" : "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_.jpg",
  "Gravitáció" : "https://www.mafab.hu/static/profiles/2014/293/07/33206_51.jpg",
  "Űrvihar" : "https://media.port.hu/images/000/975/248.jpg",
  "Vissza a jövőbe" : "https://upload.wikimedia.org/wikipedia/hu/2/2a/Vissza_a_j%C3%B6v%C5%91be_filmplak%C3%A1t.png",
  "Men in Black – Sötét zsaruk 2." : "https://lemezkucko.hu/image/data/2016/maninblack2.jpg",
  "Star Wars: A Birodalom visszavág" : "https://images.justwatch.com/poster/167207181/s718/a-birodalom-visszavag.jpg",
  "Préda" : "https://media.port.hu/images/001/512/869.webp",

  //Akció
  "A sötét lovag": "https://www.mafab.hu/static/profiles/2014/292/23/2384_4.jpg",
  "A Viszkis" : "https://media.port.hu/images/000/979/788.jpg",
  "Mad Max - A harag útja" : "https://media.port.hu/images/000/765/293.jpg",
  "John Wick" : "https://m.media-amazon.com/images/S/pv-target-images/6c2c7ace999b2efa7d6d113f7f3ec49f83722dbd2a22b202ef8028f26a1d0b69.jpg",
  "Drágán add az életed!" : "https://m.media-amazon.com/images/M/MV5BMGNlYmM1NmQtYWExMS00NmRjLTg5ZmEtMmYyYzJkMzljYWMxXkEyXkFqcGc@._V1_.jpg",
  "Gladiátor" : "https://www.citatum.hu/kepek/filmek/nagy/gladiator.jpg",
  "Mátrix" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSjSWOCaw5dnDL2GT1zFd9RMCgUGw5Q2Cfg&s",
  "Terminátor 2. – Az ítélet napja" : "https://filmtett.ro/uploads/thumbs/film_2373.jpg",
  "A Bourne-rejtély" : "https://www.mafab.hu/static/2022/55/13/11287_1645792470.7442.jpg",
  "Casino Royale" : "https://m.media-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_.jpg",
  "Bosszúállók: Végjáték" : "https://upload.wikimedia.org/wikipedia/hu/8/84/Avengers-Endgame.jpg",
  "Halálos Iramban 2" : "https://img2.indafoto.hu/5/7/24927_de9cf7fc237bf2217c1c576e4f026fee/2226001_1e000531efc072ff218057860fa193be_l.jpg",
  "A csodálatos Pókember" : "https://images.justwatch.com/poster/110583778/s718/a-csodalatos-pokember.jpg",
  "A bérgyilkosok viadala" : "https://snitt.hu/system/covers/big/covers_4845.jpg?1617127871",
  "Tűzgyűrű: Lázadás" : "https://media.port.hu/images/000/986/496.jpg",

  //Romantikus
  "Titanic": "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg",
  "Szerelmünk lapjai" : "https://lira.erbacdn.net/upload/M_28/rek1/631/608631.jpg",
  "Büszkeség és balítélet" : "https://marvin.bline.hu/product_images/119/B1442941.JPG",
  "Kaliforniai álom" : "https://media.port.hu/images/000/893/522.jpg",
  "Séta a múltba" : "https://media.port.hu/images/001/302/259.jpg",
  "500 nap nyár" : "https://media.port.hu/images/000/782/441.jpg",
  "Csillagainkban a hiba" : "https://marvin.bline.hu/product_images/1183/B1255795.JPG",
  "Sztárom a párom" : "https://media.port.hu/images/000/986/467.jpg",
  "Igazából szerelem" : "https://upload.wikimedia.org/wikipedia/hu/c/c1/Igaz%C3%A1b%C3%B3l_szerelem.png",
  "The Holiday" : "https://i.ebayimg.com/images/g/Gv0AAOSwWvJhNQo~/s-l1200.jpg",
  "Titkok és hazugságok" : "https://snitt.hu/system/covers/big/covers_5189.jpg?1617127906",
  "Mielőtt megismertelek" : "https://upload.wikimedia.org/wikipedia/hu/4/4c/Mielott-megismertelek.jpg",
  "Micsoda nő!" : "https://www.mafab.hu/static/profiles/2014/293/10/43901_37.jpg",
  "A napfény íze" : "https://www.mafab.hu/static/2014/267/07/26728_5.jpg",

  //Dráma
  "Testről és lélekről" : "https://images.justwatch.com/poster/111082300/s718/testrol-es-lelekrol.jpg",
  "A remény rabjai" : "https://images.justwatch.com/poster/250182438/s718/a-remeny-rabjai.jpg",
  "Forrest Gump" : "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Schindler listája" : "https://media.port.hu/images/001/113/344.jpg",
  "Good Will Hunting" : "https://m.media-amazon.com/images/I/71m1QMFQonL._AC_UF1000,1000_QL80_.jpg",
  "Egy csodálatos elme" : "https://images.justwatch.com/poster/244658331/s718/egy-csodalatos-elme.jpg",
  "A boldogság nyomában" : "https://awilime.blob.core.windows.net/img/mu/fa.webp",
  "Rekviem egy álomért" : "https://snitt.hu/system/covers/big/covers_44922.jpg?1617133270",
  "Halálsoron" : "https://snitt.hu/system/covers/big/covers_55004.jpg?1617134591",
  "12 év rabszolgaság" : "https://media.port.hu/images/000/530/356.jpg",
  "Holdfény" : "https://upload.wikimedia.org/wikipedia/hu/d/d6/Holdf%C3%A9ny.jpg",
  "A fájdalom és a dicsőség" : "https://media.port.hu/images/001/139/252.jpg",
  "A zöld könyv" : "https://upload.wikimedia.org/wikipedia/hu/6/6e/Zold-konyv-utmutato-az-elethez.jpg",
  "Az utolsó tangó Párizsban" : "https://pad.mymovies.it/filmclub/2004/02/501/locandina.jpg",



  //Vígjáték
  "Kis város" : "https://m.media-amazon.com/images/M/MV5BYjMyYTc1MGYtNDdlYS00MTk1LWJiNDMtMzg4MDUzNWJiNmE4XkEyXkFqcGc@._V1_.jpg",
  "Superbad" : "https://m.media-amazon.com/images/M/MV5BNjk0MzdlZGEtNTRkOC00ZDRiLWJkYjAtMzUzYTRiNzk1YTViXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "Másnaposok 2." : "https://snitt.hu/system/covers/big/covers_885.jpg?1617127178",
  "Bajos csajok" : "https://media.port.hu/images/001/623/702.webp",
  "Idétlen időkig" : "https://m.media-amazon.com/images/M/MV5BOWE3MjQ3ZDAtNDQ2MC00YjBjLTk0ZWYtNjQ0YzQ4YWE3YTEyXkEyXkFqcGc@._V1_.jpg",
  "Koszorúslányok" : "https://snitt.hu/system/covers/big/covers_54753.jpg?1617134549",
  "Meglógtam a Ferrarival" : "https://www.rocky.hu/imgcache/199499/200.jpg",
  "A híres Ron Burgundy legendája" : "https://www.mafab.hu/static/profiles/2014/293/11/45335_3.jpg",
  "Trópusi vihar" : "https://dp8ij3ml0f16h.cloudfront.net/s3_files/styles/facebook/s3/film/plakat/tropusi.jpg.webp?itok=1ciWFbjD",
  "A Grand Budapest Hotel" : "https://media.port.hu/images/000/576/102.jpg",
  "Dilibogyók" : "https://www.mafab.hu/static/profiles/2014/293/11/45304_63.jpg",
  "Reszkessetek, betörők!" : "https://www.mafab.hu/static/profiles/2014/293/10/44073_74.jpg",
  "A nagy Lebowski" : "https://www.mafab.hu/static/profiles/2014/292/23/2305_40.jpg",
  "Nagyfiúk 2" : "https://media.port.hu/images/000/499/475.jpg",
  "Dennis, a komisz" : "https://www.mafab.hu/static/profiles/2014/293/11/46481_34.jpg",


  //Horror
  "Démonok között" : "https://dp8ij3ml0f16h.cloudfront.net/s3_files/styles/facebook/s3/film/plakat/demonok_kozott_poszter.jpg.webp?itok=dg75WcMT",
  "Örökség" : "https://upload.wikimedia.org/wikipedia/hu/c/cb/Orokseg-2018.jpg",
  "Tűnj el!" : "https://media.port.hu/images/000/948/646.jpg",
  "Hang nélkül" : "https://media.port.hu/images/000/987/065.jpg",
  "Valami követ" : "https://media.port.hu/images/000/776/855.jpg",
  "A Babadook" : "https://media.port.hu/images/000/985/444.jpg",
  "Fehér éjszakák" : "https://upload.wikimedia.org/wikipedia/hu/b/b8/Feher-ejszakak.jpg",
  "A boszorkány" : "https://www.mafab.hu/static/2016/317/20/272841_1479064142.402.jpg",
  "A világítótorony" : "https://snitt.hu/system/covers/big/covers_73234.jpg?1617170937",
  "A texasi láncfűrészes mészárlás" : "https://media.port.hu/images/001/103/736.jpg",
  "AZ (It)" : "https://www.mafab.hu/static/2017/248/15/279655_1504704859.7754.jpg",
  "A kör" : "https://musicart.xboxlive.com/7/90c51000-0000-0000-0000-000000000002/504/image.jpg",
  "A sikoly" : "https://www.mafab.hu/static/profiles/2014/293/02/12569_38.jpg",
  "Micimackó: Vér és méz" : "https://kep.cdn.indexvas.hu/1/0/4434/44345/443453/44345356_f0bc18cf3e5885b913a8ca297ea4644c_wm.jpg",
  "Kokainmedve" : "https://www.mafab.hu/static/2022/333/11/531947_1669803553.7227.jpg",


  //Thriller
  "Hetedik" : "https://www.mafab.hu/static/2022/55/13/44087_1645792624.0673.jpg",
  "Holtodiglan" : "https://media.port.hu/images/000/665/391.jpg",
  "Harcosok klubja" : "https://upload.wikimedia.org/wikipedia/hu/7/78/Harcosok_klubja.png",
  "A tetovált lány" : "https://dp8ij3ml0f16h.cloudfront.net/s3_files/styles/facebook/s3/film/plakat/thumbnail.jpg.webp?itok=FyFyJ-x8",
  "Zodiákus" : "https://snitt.hu/system/covers/big/covers_69894.jpg?1617136591",
  "Viharsziget" : "https://dp8ij3ml0f16h.cloudfront.net/s3_files/styles/facebook/s3/film/plakat/viharsz-16.jpg.webp?itok=s9JP_MLk",
  "A bárányok hallgatnak" : "https://snitt.hu/system/covers/big/covers_77256.jpg?1617171495",
  "Fogságban" : "https://dp8ij3ml0f16h.cloudfront.net/s3_files/styles/facebook/s3/film/plakat/pris_b1_online.jpg.webp?itok=cRzFMWSO",
  "Hatodik érzék" : "https://snitt.hu/system/covers/big/covers_55032.jpg?1617134596",
  "Oldboy" : "https://i.ebayimg.com/images/g/8ssAAOSwfjhkXr82/s-l1200.jpg",
  "A láthatatlan vendég" : "https://www.mafab.hu/static/2016/282/13/288987_1476011642.1398.jpg",
  "A lány a vonaton" : "https://media.port.hu/images/000/890/811.jpg",
  "A tökéletes gyilkos" : "https://upload.wikimedia.org/wikipedia/hu/3/3b/Tokeletes_gyilkos.jpg",
  "Elrabolva" : "https://img2.indafoto.hu/5/7/24927_de9cf7fc237bf2217c1c576e4f026fee/2886369_fd4517254edaeb00fed7b4331eff27b4_l.jpg",



  //Kaland
  "A Gyűrűk Ura: A Gyűrű Szövetsége" : "https://www.mafab.hu/static/profiles/2014/292/23/2314_47.jpg",
  "A Karib-tenger kalózai - A Fekete Gyöngy átka" : "https://snitt.hu/system/covers/big/covers_44285.jpg?1617133187",
  "Indiana Jones és az utolsó kereszteslovag" : "https://www.rocky.hu/imgcache/2605/200.jpg",
  "Jurassic Park" : "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
  "Harry Potter és a bölcsek köve" : "https://image.tmdb.org/t/p/original/bxTnjGWQ1UAF6pBpckb4p36dide.jpg",
  "Narnia Krónikái: Az oroszlán, a boszorkány és a ruhásszekrény" : "https://upload.wikimedia.org/wikipedia/hu/thumb/8/8f/Narnia_kr%C3%B3nik%C3%A1i_plak%C3%A1t.png/250px-Narnia_kr%C3%B3nik%C3%A1i_plak%C3%A1t.png",
  "A hobbit: Váratlan utazás" : "https://images.justwatch.com/poster/296841575/s718/a-hobbit-varatlan-utazas.jpg",
  "King Kong" : "https://m.media-amazon.com/images/M/MV5BMWY0NWE0ZjUtNjRlOS00ZDViLTgxNTQtMGMwN2FhNDY1YTg2XkEyXkFqcGc@._V1_.jpg",
  "Avatar" : "https://upload.wikimedia.org/wikipedia/hu/e/e4/Avatar_2.jpg",
  "A visszatérő" : "https://media.port.hu/images/000/831/878.jpg",
  "Jumanji – Vár a dzsungel" : "https://www.mafab.hu/static/2017/346/15/274269_1513174240.4523.jpg",
  "A vadon hívó szava" : "https://upload.wikimedia.org/wikipedia/hu/a/af/A_vadon_h%C3%ADv%C3%B3_szava.png",
  "A titánok harca" : "https://www.mafab.hu/static/profiles/2014/293/06/27659_44.jpg",
  "A zöld lovag" : "https://www.mafab.hu/static/2021/173/10/324064_1624438742.0502.jpg",
  "Indiana Jones és a kristálykoponya királysága" : "https://images.justwatch.com/poster/303867060/s718/indiana-jones-es-a-kristalykoponya-kiralysaga.jpg",




  //Dokumentum
  "Bolygónk, a Föld 2." : "https://images.justwatch.com/poster/253149895/s718/bolygonk-a-fold-2.jpg",
  "Az utolsó bajnokságig" : "https://filmdroid.hu/2020/05/michael-jordan-az-utolso-bajnoksagig-the-last-dance-minisorozat/2020-05-the-last-dance-1a/",
  "A 13." : "https://upload.wikimedia.org/wikipedia/en/6/6b/13th_%28film%29.png",
  "Mászókötél nélkül" : "https://www.mafab.hu/static/2018/241/10/317548_1535619228.0274.jpg",
  "Gyilkosfaragás" : "https://www.mafab.hu/static/profiles/2015/344/20/275194.jpg",
  "Társadalmi dilemma" : "https://filmogtro.dk/uploads/pics/The-Social-Dilemma.jpg",
  "Nem leszel a szomszédom?" : "https://www.mafab.hu/static/2018/107/00/306531_1524002530.0784.jpg",
  "Az ölés aktusa" : "https://snitt.hu/system/covers/big/covers_37033.jpg?1617132287",
  "Fahrenheit 9/11" : "https://m.media-amazon.com/images/M/MV5BMjAyODU1NzM0NF5BMl5BanBnXkFtZTcwNjI1MjYyMQ@@._V1_.jpg",
  "Konspirációs korporáció" : "https://www.mafab.hu/static/2022/322/22/579891_1668891973.0055.jpg",
  "Rodriguez nyomában" : "https://www.mafab.hu/static/profiles/2014/293/18/68843_38.jpg",
  "Tanítóm, a polip" : "https://snitt.hu/system/covers/big/covers_82618.jpg?1617172263",
  "Szerelempatak" : "https://nfi.hu/file/slides/4/43945/szerelempatak_poster.jpg",
  "The White Helmets" : "https://m.media-amazon.com/images/M/MV5BMjVlNzYxMmUtNzY0OS00OGQzLTk5ODctN2UyNTdmZTEwYTQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",



  //Animáció
  "Toy Story" : "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
  "Némó Nyomában" : "https://upload.wikimedia.org/wikipedia/hu/0/05/N%C3%A9m%C3%B3_nyom%C3%A1ban_3D.png",
  "Shrek" : "https://pixel.disco.skyshowtime.com/uuid/bbdf9f1d-dbb1-32f2-8564-7f55566ec6ce/COVER_TITLE_TALL?language=hu-HU&proposition=SKYSHOWTIME&version=cf82ca56-4bd2-3ed0-b8e4-77579565cfa2",
  "Az oroszlánkirály" : "https://upload.wikimedia.org/wikipedia/hu/e/e5/Oroszlankiraly_2019.jpg",
  "Rio" : "https://lumiere-a.akamaihd.net/v1/images/rio_584x800_7a83f253.jpeg",
  "A Hihetetlen család" : "https://www.mafab.hu/static/profiles/2014/293/11/45655_9.jpg",
  "Fel" : "https://upload.wikimedia.org/wikipedia/hu/b/b6/Fel_filmplak%C3%A1t.png",
  "Coco" : "https://lumiere-a.akamaihd.net/v1/images/image_20b0282a.jpeg?region=0,0,540,810",
  "Zootropolis – Állati nagy balhé" : "https://images.justwatch.com/poster/253530334/s718/zootropolis-allati-nagy-balhe.jpg",
  "L’ecsó" : "https://upload.wikimedia.org/wikipedia/hu/thumb/b/bb/Lecs%C3%B3_filmplak%C3%A1t.jpg/250px-Lecs%C3%B3_filmplak%C3%A1t.jpg",
  "Verdák" : "https://upload.wikimedia.org/wikipedia/hu/thumb/5/53/Verd%C3%A1k_poszter.png/250px-Verd%C3%A1k_poszter.png",
  "Gru" : "https://images.justwatch.com/poster/176224025/s718/gru.jpg",
  "Így neveld a sárkányodat" : "https://mesekincstar.tv/wp-content/uploads/2015/10/igy-neveld-a-sarkanyodat-belyeg-mesekincstar.jpg",
  "Szörny Rt." : "https://mesekincstar.tv/wp-content/uploads/2015/12/szornyt-rt-belyeg-mesekincstar.jpg",

};

export const AllMovies = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/${token}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP hiba: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error('Hiba az összes film lekérésekor:', err));
  }, [token]);
  
  return (
    <div className="osszes-filmek">
      <h2>Összes film</h2>
      <div className="movies-wrapper">
      <div className="all-movies-container">
        {movies.length > 0 ? (
          movies.map((film) => (
            <div key={film.FilmId} className="all-movie-card">
              <img
                src={osszesFilm[film.cim] || '/placeholder.png'}
                alt={film.cim}
                className="film-kep"
              />
              <h3>{film.cim}</h3>
              <p>{film.mufaj}</p>              
            </div>          
          ))
        ) : (
          <p>Betöltés...</p>
        )}
      </div>
      </div>
    </div>
  );
};
