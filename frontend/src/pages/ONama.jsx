function ONama() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">O nama</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Posvećeni smo zdravom načinu života i ukusnoj hrani koja hrani tijelo i dušu.
          </p>
        </div>

        {/* Misija */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Naša misija</h2>
          <p className="text-gray-600 leading-relaxed">
            Naša platforma nastoji svakome omogućiti jednostavan pristup zdravim i ukusnim receptima. 
            Vjerujemo da pravilna ishrana ne mora biti komplikovana – uz prave recepte i dobar plan 
            ishrane, zdravo kuhanje postaje svakodnevna radost.
          </p>
        </div>

        {/* Tim */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Naš tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { ime: 'Edvin', uloga: 'Full Stack Developer', emoji: '👨‍💻' },
              { ime: 'Član 2', uloga: 'Frontend Developer', emoji: '🎨' },
              { ime: 'Član 3', uloga: 'DevOps Engineer', emoji: '⚙️' },
            ].map((clan) => (
              <div key={clan.ime} className="bg-white rounded-xl shadow p-6 text-center">
                <div className="text-5xl mb-3">{clan.emoji}</div>
                <h3 className="text-lg font-bold text-gray-800">{clan.ime}</h3>
                <p className="text-green-700 text-sm">{clan.uloga}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vrijednosti */}
        <div className="bg-green-800 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Naše vrijednosti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { naziv: 'Zdravlje', opis: 'Recepti koji hrane tijelo i um', emoji: '💚' },
              { naziv: 'Jednostavnost', opis: 'Laki za pripremu, ukusni za jelo', emoji: '✨' },
              { naziv: 'Zajednica', opis: 'Dijelimo ljubav prema hrani', emoji: '🤝' },
            ].map((v) => (
              <div key={v.naziv}>
                <div className="text-4xl mb-2">{v.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{v.naziv}</h3>
                <p className="text-green-200 text-sm">{v.opis}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ONama