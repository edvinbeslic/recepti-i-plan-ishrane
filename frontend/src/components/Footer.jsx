import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-green-800 text-white px-6 py-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h3 className="text-xl font-bold mb-3">🥗 Recepti</h3>
          <p className="text-green-300 text-sm">
            Vaš svakodnevni pratilac za zdravu ishranu i ukusne recepte.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Brzi linkovi</h3>
          <div className="flex flex-col gap-2 text-green-300 text-sm">
            <Link to="/" className="hover:text-white transition">Početna</Link>
            <Link to="/recepti" className="hover:text-white transition">Recepti</Link>
            <Link to="/plan-ishrane" className="hover:text-white transition">Plan ishrane</Link>
            <Link to="/o-nama" className="hover:text-white transition">O nama</Link>
            <Link to="/kontakt" className="hover:text-white transition">Kontakt</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Kontakt</h3>
          <div className="text-green-300 text-sm flex flex-col gap-2">
            <p>📧 info@recepti.ba</p>
            <p>📍 Sarajevo, BiH</p>
          </div>
        </div>

      </div>

      <div className="text-center text-green-400 text-sm mt-6 border-t border-green-700 pt-4">
        © 2026 Recepti & Plan Ishrane. Sva prava zadržana.
      </div>
    </footer>
  )
}

export default Footer