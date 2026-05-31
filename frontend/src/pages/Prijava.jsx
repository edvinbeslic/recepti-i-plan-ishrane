import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Toast from '../components/Toast'
import API_URL from '../config'

function Prijava() {
  const { prijava } = useAuth()
  const navigate = useNavigate()

  const [forma, setForma] = useState({ email: '', lozinka: '' })
  const [greske, setGreske] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const validiraj = () => {
    const nove = {}
    if (!forma.email) nove.email = 'Email je obavezan'
    else if (!/\S+@\S+\.\S+/.test(forma.email)) nove.email = 'Email nije validan'
    if (!forma.lozinka) nove.lozinka = 'Lozinka je obavezna'
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
      const res = await fetch(`${API_URL}/users?email=${forma.email}&lozinka=${forma.lozinka}`)
      const data = await res.json()

      if (data.length === 0) {
        setToast({ poruka: 'Pogrešan email ili lozinka!', tip: 'greska' })
      } else {
        prijava(data[0])
        setToast({ poruka: 'Uspješna prijava!', tip: 'uspjeh' })
        setTimeout(() => navigate('/'), 1500)
      }
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
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Prijava</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? 'Prijava...' : 'Prijavi se'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Nemate račun?{' '}
          <Link to="/registracija" className="text-green-700 font-semibold hover:underline">
            Registrujte se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Prijava