import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import RecipeCard from '../components/RecipeCard'

function Recepti() {
  const { data: recepti, loading, greska } = useFetch('http://localhost:3001/recepti')
  const [pretraga, setPretraga] = useState('')
  const [filter, setFilter] = useState('svi')

  const kategorije = ['svi', 'doručak', 'juha', 'glavno jelo', 'salata']

  const filtrirani = recepti?.filter(recept => {
    const odgovaraPretrazi = recept.naziv.toLowerCase().includes(pretraga.toLowerCase())
    const odgovaraFilteru = filter === 'svi' || recept.kategorija === filter
    return odgovaraPretrazi && odgovaraFilteru
  })

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-green-700 text-xl">Učitavanje recepata...</p>
    </div>
  )

  if (greska) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Greška: {greska}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Svi recepti</h1>

        {/* Pretraga */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pretraži recepte..."
            value={pretraga}
            onChange={(e) => setPretraga(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filteri */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {kategorije.map(kat => (
            <button
              key={kat}
              onClick={() => setFilter(kat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition capitalize
                ${filter === kat
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-green-700 border border-green-700 hover:bg-green-50'
                }`}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* Recepti grid */}
        {filtrirani?.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Nema recepata za "{pretraga}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrirani?.map(recept => (
              <RecipeCard key={recept.id} recept={recept} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Recepti