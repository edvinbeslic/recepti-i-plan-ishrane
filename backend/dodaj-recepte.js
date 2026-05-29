const fs = require('fs');

const slike = [
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
  'https://images.unsplash.com/photo-1517673408077-4f80e346e3a0?w=500',
  'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500',
  'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500',
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500'
];

const noviRecepti = [
  { naziv: 'Pileći šnitzel', kat: 'glavno jelo' },
  { naziv: 'Svinjski kotlet', kat: 'glavno jelo' },
  { naziv: 'Punjeni šampinjoni', kat: 'glavno jelo' },
  { naziv: 'Povrće na žaru', kat: 'glavno jelo' },
  { naziv: 'Goveđi odrezak', kat: 'glavno jelo' },
  { naziv: 'Pileći curry', kat: 'glavno jelo' },
  { naziv: 'Pad thai', kat: 'glavno jelo' },
  { naziv: 'Sushi rolice', kat: 'glavno jelo' },
  { naziv: 'Tacos sa piletinom', kat: 'glavno jelo' },
  { naziv: 'Burrito sa goveđim mesom', kat: 'glavno jelo' },
  { naziv: 'Čorba od tikvica', kat: 'juha' },
  { naziv: 'Čorba od artičoke', kat: 'juha' },
  { naziv: 'Čorba od batata', kat: 'juha' },
  { naziv: 'Čorba od jagnjećeg mesa', kat: 'juha' },
  { naziv: 'Čorba od morskih plodova', kat: 'juha' },
  { naziv: 'Čorba od pilećih krilca', kat: 'juha' },
  { naziv: 'Čorba od poriluka', kat: 'juha' },
  { naziv: 'Čorba od ječma', kat: 'juha' },
  { naziv: 'Čorba od raži', kat: 'juha' },
  { naziv: 'Čorba od kukuruza', kat: 'juha' },
  { naziv: 'Acai bowl', kat: 'doručak' },
  { naziv: 'Egg benedikt', kat: 'doručak' },
  { naziv: 'Avokado tost sa jajetom', kat: 'doručak' },
  { naziv: 'Blueberry muffini', kat: 'doručak' },
  { naziv: 'Kokosova kaša', kat: 'doručak' },
  { naziv: 'Proteinske palačinke', kat: 'doručak' },
  { naziv: 'Grčki jogurt sa granolom', kat: 'doručak' },
  { naziv: 'Tost sa kikiriki maslacem', kat: 'doručak' },
  { naziv: 'Voćna salata', kat: 'doručak' },
  { naziv: 'Domaći krekeri sa sirom', kat: 'doručak' },
  { naziv: 'Salata od radiča', kat: 'salata' },
  { naziv: 'Salata od endivije', kat: 'salata' },
  { naziv: 'Salata od manga', kat: 'salata' },
  { naziv: 'Salata od naranče', kat: 'salata' },
  { naziv: 'Salata od jagoda', kat: 'salata' },
  { naziv: 'Salata od grožđa', kat: 'salata' },
  { naziv: 'Salata od kruške', kat: 'salata' },
  { naziv: 'Salata od smokve', kat: 'salata' },
  { naziv: 'Salata od graška', kat: 'salata' },
  { naziv: 'Salata od brokolija', kat: 'salata' },
  { naziv: 'Salata od karfiola', kat: 'salata' },
  { naziv: 'Salata od tikvice', kat: 'salata' },
  { naziv: 'Salata od patlidžana', kat: 'salata' },
  { naziv: 'Salata od paprike', kat: 'salata' },
  { naziv: 'Salata od kupusa', kat: 'salata' },
  { naziv: 'Salata od kelja', kat: 'salata' },
  { naziv: 'Salata od kvinoje', kat: 'salata' },
  { naziv: 'Salata od heljde', kat: 'salata' },
  { naziv: 'Salata od amaranta', kat: 'salata' },
  { naziv: 'Salata od bulgura', kat: 'salata' },
];

const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
let id = db.recepti.length + 1;

noviRecepti.forEach((r, i) => {
  db.recepti.push({
    id: id++,
    naziv: r.naziv,
    kategorija: r.kat,
    sastojci: ['sastojak 1', 'sastojak 2', 'sastojak 3'],
    upute: 'Pripremite sastojke. Kuhajte prema uputama. Poslužite toplo.',
    vremePripreme: Math.floor(Math.random() * 55) + 10,
    kalorije: Math.floor(Math.random() * 400) + 150,
    slika: slike[i % slike.length],
    autorId: 1
  });
});

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Dodano ' + noviRecepti.length + ' recepata! Ukupno: ' + db.recepti.length);