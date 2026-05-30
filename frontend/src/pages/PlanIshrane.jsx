import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import { useAuth } from '../hooks/useAuth'
import Toast from '../components/Toast'

function PlanIshrane() {
  const { korisnik } = useAuth()
  const { data: plan, loading, greska } = useFetch('http://localhost:3001/planIshrane/1')
  const { data: recepti } = useFetch('http://localhost:3001/recepti')
  const { data: zahtjevi } = useFetch('http://localhost:3001/zahtjeviZaPlan')
  const { data: personaliziraniPlanovi } = useFetch('http://localhost:3001/personaliziraniPlanovi')
  const [toast, setToast] = useState(null)
  const [zahtjevPoslan, setZahtjevPoslan] = useState(false)
  const [poruka, setPoruka] = useState('')

  const dani = ['ponedjeljak', 'utorak', 'srijeda', 'cetvrtak', 'petak', 'subota', 'nedjelja']
  const obroci = ['dorucak', 'rucak', 'vecera']
  const obrociNazivi = { dorucak: '🍳 Doručak', rucak: '🍽️ Ručak', vecera: '🌙 Večera' }

  const getRecept = (id) => recepti?.find(r => r.id === id || r.id === String(id))

  const mojZahtjev = zahtjevi?.filter(z => z.korisnikId === korisnik?.id).pop()
  const mojPlan = personaliziraniPlanovi?.filter(p => p.korisnikId === korisnik?.id).pop()

  const handleZahtjev = async (e) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:3001/zahtjeviZaPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          korisnikId: korisnik.id,
          korisnikIme: korisnik.ime,
          korisnikEmail: korisnik.email,
          poruka,
          status: 'na čekanju',
          datum: new Date().toISOString()
        })
      })
      setToast({ poruka: 'Zahtjev je uspješno poslan adminu!', tip: 'uspjeh' })
      setZahtjevPoslan(true)
      setPoruka('')
    } catch (err) {
      setToast({ poruka: 'Greška pri slanju zahtjeva!', tip: 'greska' })
    }
  }

  const aktivniPlan = mojPlan || plan
  const jeLicni = !!mojPlan

  if (loading) return <Spinner />

  if (greska) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Greška: {greska}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 fade-in">
      {toast && (
        <Toast
          poruka={toast.poruka}
          tip={toast.tip}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-800 mb-2 text-center">Plan ishrane</h1>
        <p className="text-gray-500 text-center mb-10">
          {jeLicni ? `Personalizirani plan za ${korisnik?.ime}` : 'Sedmični plan obroka'}
        </p>

        {/* Zahtjev za personalizirani plan */}
        {korisnik?.uloga === 'guest' && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-green-800 mb-2">
              🥗 Zatraži personalizirani plan
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Pošaljite zahtjev adminu za kreiranje vašeg personalnog plana ishrane.
            </p>

            {mojZahtjev ? (
              <div className={`p-4 rounded-lg ${
                mojZahtjev.status === 'na čekanju' ? 'bg-orange-50 border border-orange-200' :
                mojZahtjev.status === 'u obradi' ? 'bg-blue-50 border border-blue-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>
                    {mojZahtjev.status === 'na čekanju' ? '⏳' :
                     mojZahtjev.status === 'u obradi' ? '🔄' : '✅'}
                  </span>
                  <span className={`font-semibold capitalize ${
                    mojZahtjev.status === 'na čekanju' ? 'text-orange-600' :
                    mojZahtjev.status === 'u obradi' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    Status: {mojZahtjev.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Poslan: {new Date(mojZahtjev.datum).toLocaleDateString('bs-BA')}
                </p>
                {mojZahtjev.odgovor && (
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-1">💬 Poruka od admina:</p>
                    <p className="text-gray-700 text-sm">{mojZahtjev.odgovor}</p>
                  </div>
                )}
              </div>
            ) : zahtjevPoslan ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
                ✅ Vaš zahtjev je poslan! Admin će vas kontaktirati.
              </div>
            ) : (
              <form onSubmit={handleZahtjev} className="flex flex-col gap-3">
                <textarea
                  value={poruka}
                  onChange={(e) => setPoruka(e.target.value)}
                  rows={3}
                  placeholder="Opišite vaše prehrambene navike, alergije, ciljeve..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition w-fit"
                >
                  Pošalji zahtjev
                </button>
              </form>
            )}
          </div>
        )}

        {/* Badge ako je personalizirani plan */}
        {jeLicni && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 text-center">
            <p className="text-green-700 font-semibold">✨ Ovo je vaš personalizirani plan kreiran od strane admina!</p>
          </div>
        )}

        {/* Plan */}
        <div className="flex flex-col gap-6">
          {dani.map(dan => (
            <div key={dan} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-green-800 capitalize mb-4">
                {dan.charAt(0).toUpperCase() + dan.slice(1)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {obroci.map(obrok => {
                  const receptId = aktivniPlan?.dani?.[dan]?.[obrok]
                  const recept = getRecept(receptId)
                  return (
                    <div key={obrok} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-500 mb-2">
                        {obrociNazivi[obrok]}
                      </p>
                      {recept ? (
                        <div>
                          <img
                            src={recept.slika}
                            alt={recept.naziv}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <p className="font-semibold text-gray-800 text-sm">{recept.naziv}</p>
                          <p className="text-xs text-gray-500 mt-1">🔥 {recept.kalorije} kcal</p>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">Nije planiran obrok</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PlanIshrane