import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'

function ReceptDetalji() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: recept, loading, greska } = useFetch(`http://localhost:3001/recepti/${id}`)

  if (loading) return <Spinner />

  if (greska || !recept) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Recept nije pronađen.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 fade-in">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700 transition">Početna</Link>
          <span>›</span>
          <Link to="/recepti" className="hover:text-green-700 transition">Recepti</Link>
          <span>›</span>
          <span className="text-green-800 font-medium">{recept.naziv}</span>
        </nav>

        <img
          src={recept.slika}
          alt={recept.naziv}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        <div className="bg-white rounded-xl p-6 shadow mb-6">
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
            {recept.kategorija}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mt-3 mb-4">{recept.naziv}</h1>
          
          <div className="flex gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱</span>
              <div>
                <p className="text-xs text-gray-400">Vrijeme pripreme</p>
                <p className="font-semibold text-gray-700">{recept.vremePripreme} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-xs text-gray-400">Kalorije</p>
                <p className="font-semibold text-gray-700">{recept.kalorije} kcal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Sastojci</h2>
            <ul className="flex flex-col gap-2">
              {recept.sastojci.map((sastojak, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  {sastojak}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Upute za pripremu</h2>
            <p className="text-gray-700 leading-relaxed">{recept.upute}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReceptDetalji