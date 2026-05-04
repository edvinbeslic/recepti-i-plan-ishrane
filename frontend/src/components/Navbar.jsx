import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { korisnik, odjava } = useAuth()
  const navigate = useNavigate()

  const handleOdjava = () => {
    odjava()
    navigate('/')
  }

  return (
    <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        🥗 Recepti
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/recepti" className="hover:text-green-300 transition">Recepti</Link>
        <Link to="/plan-ishrane" className="hover:text-green-300 transition">Plan ishrane</Link>
        <Link to="/o-nama" className="hover:text-green-300 transition">O nama</Link>
        <Link to="/kontakt" className="hover:text-green-300 transition">Kontakt</Link>

        {korisnik?.uloga === 'admin' && (
          <Link to="/admin" className="hover:text-green-300 transition">Admin</Link>
        )}

        {korisnik ? (
          <button
            onClick={handleOdjava}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition"
          >
            Odjava
          </button>
        ) : (
          <Link
            to="/prijava"
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition"
          >
            Prijava
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar