import { useState } from 'react'
import Toast from '../components/Toast'
import API_URL from '../config'

function Kontakt() {
  const [forma, setForma] = useState({
    ime: '',
    email: '',
    predmet: '',
    poruka: ''
  })
  const [greske, setGreske] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const validiraj = () => {
    const nove = {}
    if (!forma.ime) nove.ime = 'Ime je obavezno'
    if (!forma.email) nove.email = 'Email je obavezan'
    else if (!/\S+@\S+\.\S+/.test(forma.email)) nove.email = 'Email nije validan'
    if (!forma.predmet) nove.predmet = 'Predmet je obavezan'
    if (!forma.poruka) nove.poruka = 'Poruka je obavezna'
    else if (forma.poruka.length < 10) nove.poruka = 'Poruka mora imati najmanje 10 znakova'
    return nove
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nove = validiraj()
    if (Object.keys(nove).length > 0) {
      setGreske(nove)
      return
    }

    setLoading(true)

    try {
      await fetch(`${API_URL}/kontaktPoruke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...forma,
          datum: new Date().toISOString()
        })
      })
      setToast({ poruka: 'Poruka je uspješno poslana!', tip: 'uspjeh' })
      setForma({ ime: '', email: '', predmet: '', poruka: '' })
      setGreske({})
    } catch (err) {
      setToast({ poruka: 'Greška pri slanju poruke!', tip: 'greska' })
    }

    setLoading(false)
  }

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
        <h1 className="text-4xl font-bold text-green-800 mb-2 text-center">Kontakt</h1>
        <p className="text-gray-500 text-center mb-10">Pošaljite nam poruku, odgovaramo u roku od 24 sata</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Pošaljite poruku</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ime i prezime</label>
                <input
                  type="text"
                  value={forma.ime}
                  onChange={(e) => setForma({ ...forma, ime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Vaše ime"
                />
                {greske.ime && <p className="text-red-500 text-sm mt-1">{greske.ime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  value={forma.email}
                  onChange={(e) => setForma({ ...forma, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="vas@email.com"
                />
                {greske.email && <p className="text-red-500 text-sm mt-1">{greske.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Predmet</label>
                <input
                  type="text"
                  value={forma.predmet}
                  onChange={(e) => setForma({ ...forma, predmet: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Predmet poruke"
                />
                {greske.predmet && <p className="text-red-500 text-sm mt-1">{greske.predmet}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poruka</label>
                <textarea
                  value={forma.poruka}
                  onChange={(e) => setForma({ ...forma, poruka: e.target.value })}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Vaša poruka..."
                />
                {greske.poruka && <p className="text-red-500 text-sm mt-1">{greske.poruka}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
              >
                {loading ? 'Slanje...' : 'Pošalji poruku'}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">Kontakt informacije</h2>
              <div className="flex flex-col gap-3 text-gray-600">
                <p>📧 info@recepti.ba</p>
                <p>📞 +387 32 000 000</p>
                <p>📍 Zenica, Bosna i Hercegovina</p>
                <p>🕐 Pon - Pet: 09:00 - 17:00</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <iframe
                title="Lokacija"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22829.938409!2d17.9077!3d44.2010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475ee1234567890%3A0x1234567890abcdef!2sZenica!5e0!3m2!1sbs!2sba!4v1620000000000!5m2!1sbs!2sba"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Kontakt