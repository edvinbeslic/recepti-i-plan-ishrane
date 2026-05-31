import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { korisnik, odjava } = useAuth()
  const navigate = useNavigate()
  const [menuOtvoren, setMenuOtvoren] = useState(false)

  const handleOdjava = () => {
    odjava()
    navigate('/')
    setMenuOtvoren(false)
  }

  return (
    <nav className="bg-green-800 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🥗 Recepti
        </Link>

        {/* Desktop navigacija */}
        <div className="hidden md:flex gap-6 items-center">
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

        {/* Hamburger dugme */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOtvoren(!menuOtvoren)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOtvoren ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOtvoren ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOtvoren ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

      </div>

      {/* Mobilni meni */}
      {menuOtvoren && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-green-700 pt-4">
          <Link to="/recepti" onClick={() => setMenuOtvoren(false)} className="hover:text-green-300 transition">Recepti</Link>
          <Link to="/plan-ishrane" onClick={() => setMenuOtvoren(false)} className="hover:text-green-300 transition">Plan ishrane</Link>
          <Link to="/o-nama" onClick={() => setMenuOtvoren(false)} className="hover:text-green-300 transition">O nama</Link>
          <Link to="/kontakt" onClick={() => setMenuOtvoren(false)} className="hover:text-green-300 transition">Kontakt</Link>

          {korisnik?.uloga === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOtvoren(false)} className="hover:text-green-300 transition">Admin</Link>
          )}

          {korisnik ? (
            <button
              onClick={handleOdjava}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition text-left w-fit"
            >
              Odjava
            </button>
          ) : (
            <Link
              to="/prijava"
              onClick={() => setMenuOtvoren(false)}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition w-fit"
            >
              Prijava
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar