import { useState } from 'react'
import useFetch from '../hooks/useFetch'

function Admin() {
  const { data: recepti, loading } = useFetch('http://localhost:3001/recepti')
  const { data: korisnici } = useFetch('http://localhost:3001/users')
  const { data: poruke } = useFetch('http://localhost:3001/kontaktPoruke')

  const [odabraniRecept, setOdabraniRecept] = useState(null)
  const [forma, setForma] = useState({
    naziv: '',
    kategorija: 'doručak',
    sastojci: '',
    upute: '',
    vremePripreme: '',
    kalorije: '',
    slika: ''
  })
  const [prikaz, setPrikaz] = useState('statistike')
  const [pretraga, setPretraga] = useState('')

  const resetForma = () => {
    setForma({
      naziv: '',
      kategorija: 'doručak',
      sastojci: '',
      upute: '',
      vremePripreme: '',
      kalorije: '',
      slika: ''
    })
    setOdabraniRecept(null)
  }

  const handleDodaj = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3001/recepti', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...forma,
        sastojci: forma.sastojci.split(',').map(s => s.trim()),
        vremePripreme: Number(forma.vremePripreme),
        kalorije: Number(forma.kalorije),
        autorId: 1
      })
    })
    resetForma()
    setPrikaz('recepti')
    window.location.reload()
  }

  const handleUredi = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:3001/recepti/${odabraniRecept.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...forma,
        sastojci: forma.sastojci.split(',').map(s => s.trim()),
        vremePripreme: Number(forma.vremePripreme),
        kalorije: Number(forma.kalorije),
        autorId: 1
      })
    })
    resetForma()
    setPrikaz('recepti')
    window.location.reload()
  }

  const handleObrisiRecept = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovaj recept?')) return
    await fetch(`http://localhost:3001/recepti/${id}`, { method: 'DELETE' })
    window.location.reload()
  }

  const handleObrisiKorisnika = async (id) => {
    if (!window.confirm('Jeste li sigurni da želite obrisati ovog korisnika?')) return
    await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
    window.location.reload()
  }

  const otvoriUredi = (recept) => {
    setOdabraniRecept(recept)
    setForma({
      naziv: recept.naziv,
      kategorija: recept.kategorija,
      sastojci: recept.sastojci.join(', '),
      upute: recept.upute,
      vremePripreme: recept.vremePripreme,
      kalorije: recept.kalorije,
      slika: recept.slika
    })
    setPrikaz('uredi')
  }

  const filtrianiRecepti = recepti?.filter(r =>
    r.naziv.toLowerCase().includes(pretraga.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Admin Panel</h1>

        {/* Navigacija */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {['statistike', 'recepti', 'korisnici', 'poruke', 'dodaj'].map(tab => (
            <button
              key={tab}
              onClick={() => { setPrikaz(tab); resetForma() }}
              className={`px-5 py-2 rounded-lg font-semibold transition capitalize
                ${prikaz === tab
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-green-700 border border-green-700 hover:bg-green-50'
                }`}
            >
              {tab === 'statistike' ? '📊 Statistike' :
               tab === 'recepti' ? '🍽️ Recepti' :
               tab === 'korisnici' ? '👥 Korisnici' :
               tab === 'poruke' ? '✉️ Poruke' :
               '+ Dodaj recept'}
            </button>
          ))}
        </div>

        {/* Statistike */}
        {prikaz === 'statistike' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-5xl font-bold text-green-700 mb-2">{recepti?.length || 0}</div>
              <p className="text-gray-600 font-medium">Ukupno recepata</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">{korisnici?.length || 0}</div>
              <p className="text-gray-600 font-medium">Registrovanih korisnika</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-5xl font-bold text-blue-500 mb-2">{poruke?.length || 0}</div>
              <p className="text-gray-600 font-medium">Kontakt poruka</p>
            </div>
          </div>
        )}

        {/* Lista recepata */}
        {prikaz === 'recepti' && (
          <div>
            <input
              type="text"
              placeholder="Pretraži recepte..."
              value={pretraga}
              onChange={(e) => setPretraga(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="text-left px-6 py-3">Naziv</th>
                    <th className="text-left px-6 py-3">Kategorija</th>
                    <th className="text-left px-6 py-3">Kalorije</th>
                    <th className="text-left px-6 py-3">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrianiRecepti?.map((recept, index) => (
                    <tr key={recept.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium">{recept.naziv}</td>
                      <td className="px-6 py-4 capitalize">{recept.kategorija}</td>
                      <td className="px-6 py-4">{recept.kalorije} kcal</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => otvoriUredi(recept)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Uredi
                        </button>
                        <button
                          onClick={() => handleObrisiRecept(recept.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Obriši
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Korisnici */}
        {prikaz === 'korisnici' && (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="text-left px-6 py-3">Ime</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Uloga</th>
                  <th className="text-left px-6 py-3">Akcije</th>
                </tr>
              </thead>
              <tbody>
                {korisnici?.map((korisnik, index) => (
                  <tr key={korisnik.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium">{korisnik.ime}</td>
                    <td className="px-6 py-4">{korisnik.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${korisnik.uloga === 'admin' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {korisnik.uloga}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {korisnik.uloga !== 'admin' && (
                        <button
                          onClick={() => handleObrisiKorisnika(korisnik.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                        >
                          Obriši
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Kontakt poruke */}
        {prikaz === 'poruke' && (
          <div className="flex flex-col gap-4">
            {poruke?.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Nema kontakt poruka.</p>
            ) : (
              poruke?.map((poruka, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{poruka.ime}</h3>
                    <span className="text-xs text-gray-400">
                      {new Date(poruka.datum).toLocaleDateString('bs-BA')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">📧 {poruka.email}</p>
                  <p className="text-sm text-gray-500 mb-3">📌 {poruka.predmet}</p>
                  <p className="text-gray-700">{poruka.poruka}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Forma za dodavanje/uređivanje */}
        {(prikaz === 'dodaj' || prikaz === 'uredi') && (
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              {prikaz === 'dodaj' ? 'Dodaj novi recept' : 'Uredi recept'}
            </h2>
            <form onSubmit={prikaz === 'dodaj' ? handleDodaj : handleUredi} className="flex flex-col gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Naziv recepta</label>
                <input
                  type="text"
                  value={forma.naziv}
                  onChange={(e) => setForma({ ...forma, naziv: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategorija</label>
                <select
                  value={forma.kategorija}
                  onChange={(e) => setForma({ ...forma, kategorija: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="doručak">Doručak</option>
                  <option value="juha">Juha</option>
                  <option value="glavno jelo">Glavno jelo</option>
                  <option value="salata">Salata</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sastojci (odvojeni zarezom)</label>
                <input
                  type="text"
                  value={forma.sastojci}
                  onChange={(e) => setForma({ ...forma, sastojci: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="npr. 500g piletine, 2 mrkve, sol"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upute za pripremu</label>
                <textarea
                  value={forma.upute}
                  onChange={(e) => setForma({ ...forma, upute: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vrijeme pripreme (min)</label>
                  <input
                    type="number"
                    value={forma.vremePripreme}
                    onChange={(e) => setForma({ ...forma, vremePripreme: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kalorije (kcal)</label>
                  <input
                    type="number"
                    value={forma.kalorije}
                    onChange={(e) => setForma({ ...forma, kalorije: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL slike</label>
                <input
                  type="text"
                  value={forma.slika}
                  onChange={(e) => setForma({ ...forma, slika: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2 rounded-lg transition"
                >
                  {prikaz === 'dodaj' ? 'Dodaj recept' : 'Spremi izmjene'}
                </button>
                <button
                  type="button"
                  onClick={() => { setPrikaz('recepti'); resetForma() }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-2 rounded-lg transition"
                >
                  Odustani
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  )
}

export default Admin