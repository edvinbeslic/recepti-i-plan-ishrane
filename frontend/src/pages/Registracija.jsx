import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'

function Registracija() {
  const navigate = useNavigate()

  const [forma, setForma] = useState({
    ime: '',
    email: '',
    lozinka: '',
    potvrda: ''
  })
  const [greske, setGreske] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const validiraj = () => {
    const nove = {}
    if (!forma.ime) nove.ime = 'Ime je obavezno'
    if (!forma.email) nove.email = 'Email je obavezan'
    else if (!/\S+@\S+\.\S+/.test(forma.email)) nove.email = 'Email nije validan'
    if (!forma.lozinka) nove.lozinka = 'Lozinka je obavezna'
    else if (forma.lozinka.length < 6) nove.lozinka = 'Lozinka mora imati najmanje 6 znakova'
    if (!forma.potvrda) nove.potvrda = 'Potvrda lozinke je obavezna'
    else if (forma.lozinka !== forma.potvrda) nove.potvrda = 'Lozinke se ne podudaraju'
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
      const provjera = await fetch(`http://localhost:3001/users?email=${forma.email}`)
      const postojeci = await provjera.json()

      if (postojeci.length > 0) {
        setGreske({ email: 'Korisnik sa ovim emailom već postoji' })
        setLoading(false)
        return
      }

      await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ime: forma.ime,
          email: forma.email,
          lozinka: forma.lozinka,
          uloga: 'guest'
        })
      })

      setToast({ poruka: 'Uspješna registracija! Preusmjeravamo vas...', tip: 'uspjeh' })
      setTimeout(() => navigate('/prijava'), 2000)

    } catch (err) {
      setToast({ poruka: 'Greška pri povezivanju sa serverom!', tip: 'greska' })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {toast && (
        <Toast
          poruka={toast.poruka}
          tip={toast.tip}
          onClose={() => setToast(null)}
        />
      )}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Registracija</h2>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Lozinka</label>
            <input
              type="password"
              value={forma.lozinka}
              onChange={(e) => setForma({ ...forma, lozinka: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
            {greske.lozinka && <p className="text-red-500 text-sm mt-1">{greske.lozinka}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potvrda lozinke</label>
            <input
              type="password"
              value={forma.potvrda}
              onChange={(e) => setForma({ ...forma, potvrda: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
            {greske.potvrda && <p className="text-red-500 text-sm mt-1">{greske.potvrda}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? 'Registracija...' : 'Registruj se'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Već imate račun?{' '}
          <Link to="/prijava" className="text-green-700 font-semibold hover:underline">
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Registracija