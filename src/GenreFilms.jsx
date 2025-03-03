import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GenreFilms.css';

// Képek objektuma, filmcímekhez rendelve
const filmImages = {

  //Sci-Fi
  "Eredet": "/movieimages/eredet.jpg",
  "Interstellar" : "/movieimages/interstellar.jpg",
  "Szárnyas fejvadász 2049" : "/movieimages/szarnyas.jpg",
  "Dűne" : "/movieimages/dune.jpg",
  "Mentőexpedíció" : "/movieimages/martian.jpg",
  "A holnap határa" : "/movieimages/holnap.jpg",
  "Érkezés" : "/movieimages/arrival.jpg",
  "Ex Machina" : "/movieimages/exmachina.jpg",
  "Gravitáció" : "/movieimages/gravity.jpg",
  "Űrvihar" : "https://media.port.hu/images/000/975/248.jpg",
  "Vissza a jövőbe" : "https://upload.wikimedia.org/wikipedia/hu/2/2a/Vissza_a_j%C3%B6v%C5%91be_filmplak%C3%A1t.png",
  "Men in Black – Sötét zsaruk 2." : "https://lemezkucko.hu/image/data/2016/maninblack2.jpg",
  "Star Wars: A Birodalom visszavág" : "https://images.justwatch.com/poster/167207181/s718/a-birodalom-visszavag.jpg",
  "Préda" : "https://media.port.hu/images/001/512/869.webp",

  //Akció
  "A sötét lovag": "/movieimages/sötétlovag.png",
  "Mad Max - A harag útja" : "/movieimages/madmax.png",
  "John Wick" : "/movieimages/johnwick.jpg",
  "Drágán add az életed!" : "/movieimages/diehard.jpg",
  "Gladiátor" : "/movieimages/gladiator.png",
  "Mátrix" : "/movieimages/matrix.jpg",
  "Terminátor 2. – Az ítélet napja" : "/movieimages/terminator2.jpg",
  "A Bourne-rejtély" : "/movieimages/bourne.jpg",
  "Casino Royale" : "/movieimages/casino.jpg",
  "Bosszúállók: Végjáték" : "/movieimages/endgame.jpg",
  "Halálos Iramban 2" : "https://img2.indafoto.hu/5/7/24927_de9cf7fc237bf2217c1c576e4f026fee/2226001_1e000531efc072ff218057860fa193be_l.jpg",
  "A csodálatos Pókember" : "https://images.justwatch.com/poster/110583778/s718/a-csodalatos-pokember.jpg",
  "A bérgyilkosok viadala" : "https://snitt.hu/system/covers/big/covers_4845.jpg?1617127871",
  "Tűzgyűrű: Lázadás" : "https://media.port.hu/images/000/986/496.jpg",

  //Romantikus
  "Titanic": "/movieimages/titanic.png",
  "Szerelmünk lapjai" : "/movieimages/lapjai.jpg",
  "Büszkeség és balítélet" : "/movieimages/buszkeseg.jpg",
  "Kaliforniai álom" : "/movieimages/kalifornia.jpg",
  "Séta a múltba" : "/movieimages/seta.jpg",
  "500 nap nyár" : "/movieimages/500.jpg",
  "Csillagainkban a hiba" : "/movieimages/csillag.jpg",
  "Sztárom a párom" : "/movieimages/sztar.jpg",
  "Igazából szerelem" : "/movieimages/igazabol.jpg",
  "The Holiday" : "/movieimages/holiday.jpg",
  "Titkok és hazugságok" : "https://snitt.hu/system/covers/big/covers_5189.jpg?1617127906",
  "Mielőtt megismertelek" : "https://upload.wikimedia.org/wikipedia/hu/4/4c/Mielott-megismertelek.jpg",
  "Micsoda nő!" : "https://www.mafab.hu/static/profiles/2014/293/10/43901_37.jpg",
  "A napfény íze" : "https://www.mafab.hu/static/2014/267/07/26728_5.jpg",

  //Dráma
  "Testről és lélekről" : "/movieimages/testrol.jpg",
  "A remény rabjai" : "/movieimages/remeny.jpg",
  "Forrest Gump" : "/movieimages/forrest.jpg",
  "Schindler listája" : "/movieimages/schindler.jpg",
  "Good Will Hunting" : "/movieimages/good.png",
  "Egy csodálatos elme" : "/movieimages/elme.jpg",
  "A boldogság nyomában" : "/movieimages/boldogsag.jpg",
  "Rekviem egy álomért" : "/movieimages/Rekviem.jpg",
  "Halálsoron" : "/movieimages/halalsoron.jpg",
  "12 év rabszolgaság" : "/movieimages/12.jpg",
  "Holdfény" : "/movieimages/hold.jpg",
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
  "Chihiro Szellemországban" : "https://upload.wikimedia.org/wikipedia/hu/4/4e/Chihiro_Szellemorsz%C3%A1gban.png",
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

export const GenreFilms = () => {
  const { mufaj } = useParams();
  const [filmek, setFilmek] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    const url = `http://localhost:5104/api/filmek/mufaj/${token}/${mufaj}`;
    console.log('Küldöm a kérést:', url);
    fetch(url)
      .then(res => {
        console.log('HTTP státusz:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Kapott adatok:', data);
        setFilmek(data);
      })
      .catch(err => console.error('Hiba a filmek lekérésekor:', err));
  }, [mufaj, token]);

  return (
    <div className="genre-filmek">
      <h2>{mufaj} filmek</h2>
      <div className="filmek-container">
        {filmek.length > 0 ? (
          filmek.map((film) => (
            <div key={film.FilmId} className="film-card">
              <img
                src={filmImages[film.cim] || '/placeholder.png'}
                alt={film.cim}
                className="film-image"
              />
              <h3>{film.cim}</h3>
              <p>{film.mufaj}</p>
            </div>
          ))
        ) : (
          <p>Nincsenek találatok a(z) {mufaj} műfajra.</p>
        )}
      </div>
    </div>
  );
};
