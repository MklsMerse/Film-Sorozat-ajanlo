import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const FilmSorozatKereses = {
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

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get('term')?.toLowerCase() || '';

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const token = loggedInUser.token || 'token';

  useEffect(() => {
    // Egyszerre kérjük le a filmeket és a sorozatokat, majd egy tömbbe fűzzük őket
    const filmUrl = `http://localhost:5104/api/filmek/${token}`;
    const seriesUrl = `http://localhost:5104/api/sorozatok/${token}`;

    // Promise.all-lal párhuzamosan hívjuk meg a két végpontot
    Promise.all([
      fetch(filmUrl).then((res) => {
        if (!res.ok) throw new Error(`Film hiba: ${res.status}`);
        return res.json();
      }),
      fetch(seriesUrl).then((res) => {
        if (!res.ok) throw new Error(`Sorozat hiba: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([filmsData, seriesData]) => {
        // A filmeknél átalakítjuk a struktúrát egy közös séma szerint
        const filmResults = filmsData.map((film) => ({
          id: film.FilmId,
          cim: film.cim,
          mufaj: film.mufaj,
          url: film.FilmUrl,
          tipus: 'Film', // Megkülönböztetéshez
        }));

        // Ugyanez sorozatokra
        const seriesResults = seriesData.map((sorozat) => ({
          id: sorozat.SorozatId,
          cim: sorozat.cim,
          mufaj: sorozat.mufaj,
          url: sorozat.SorozatUrl,
          tipus: 'Sorozat',
        }));

        // Összefűzzük a két tömböt
        const combined = [...filmResults, ...seriesResults];

        // Keresési kifejezés alapján szűrés (címben szerepel-e)
        const filtered = combined.filter((item) =>
          item.cim.toLowerCase().includes(term)
        );

        setResults(filtered);
      })
      .catch((err) => console.error('Hiba a keresési eredmények lekérésekor:', err));
  }, [term, token]);

  return (
    <div className="search-results">
      <h2>Keresés: "{term}"</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={`${item.tipus}-${item.id}`} className="result-card">
              <img
                src={FilmSorozatKereses[item.cim] || '/placeholder.png'}
                alt={item.cim}
                className="result-image"
              />
              <h3>{item.cim}</h3>
              <p>{item.mufaj}</p>
              <p className="tipus-label">{item.tipus}</p>
            </div>
          ))
        ) : (
          <p className='nincs-talalat'>Nincs találat! <i className="fa-solid fa-magnifying-glass-minus"></i></p>
        )}
      </div>
    </div>
  );
};
