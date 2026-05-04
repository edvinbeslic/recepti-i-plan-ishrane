import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Prijava() {
  const { prijava } = useAuth()
  const navigate = useNavigate()

  const [forma, setForma] = useState({ email: '', lozinka: '' })
  const [greske, setGreske] = useState({})
  const [loading, setLoading] = useState(false)
  const [greska, setGreska] = useState('')

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
    setGreska('')

    try {
      const res = await fetch(`http://localhost:3001/users?email=${forma.email}&lozinka=${forma.lozinka}`)
      const data = await res.json()

      if (data.length === 0) {
        setGreska('Pogrešan email ili lozinka')
      } else {
        prijava(data[0])
        navigate('/')
      }
    } catch (err) {
      setGreska('Greška pri povezivanju sa serverom')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Prijava</h2>

        {greska && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {greska}
          </div>
        )}

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