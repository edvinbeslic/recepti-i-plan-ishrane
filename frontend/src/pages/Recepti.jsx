import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import RecipeCard from '../components/RecipeCard'
import SkeletonCard from '../components/SkeletonCard'

const PO_STRANICI = 12

function Recepti() {
  const { data: recepti, loading, greska } = useFetch('http://localhost:3001/recepti')
  const [pretraga, setPretraga] = useState('')
  const [filter, setFilter] = useState('svi')
  const [stranica, setStranica] = useState(1)

  const kategorije = ['svi', 'doručak', 'juha', 'glavno jelo', 'salata']

  const filtrirani = recepti?.filter(recept => {
    const odgovaraPretrazi = recept.naziv.toLowerCase().includes(pretraga.toLowerCase())
    const odgovaraFilteru = filter === 'svi' || recept.kategorija === filter
    return odgovaraPretrazi && odgovaraFilteru
  })

  const ukupnoStranica = Math.ceil((filtrirani?.length || 0) / PO_STRANICI)
  const prikazani = filtrirani?.slice((stranica - 1) * PO_STRANICI, stranica * PO_STRANICI)

  const handleFilter = (kat) => {
    setFilter(kat)
    setStranica(1)
  }

  const handlePretraga = (e) => {
    setPretraga(e.target.value)
    setStranica(1)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Svi recepti</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )

  if (greska) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Greška: {greska}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 fade-in">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Svi recepti</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Pretraži recepte..."
            value={pretraga}
            onChange={handlePretraga}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {kategorije.map(kat => (
            <button
              key={kat}
              onClick={() => handleFilter(kat)}
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

        {prikazani?.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Nema recepata za "{pretraga}"</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Prikazano {prikazani?.length} od {filtrirani?.length} recepata
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prikazani?.map(recept => (
                <RecipeCard key={recept.id} recept={recept} />
              ))}
            </div>

            {/* Paginacija */}
            {ukupnoStranica > 1 && (
              <div className="flex justify-center gap-2 mt-10 flex-wrap">
                <button
                  onClick={() => setStranica(s => Math.max(1, s - 1))}
                  disabled={stranica === 1}
                  className="px-4 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Prethodna
                </button>

                {Array.from({ length: ukupnoStranica }, (_, i) => i + 1)
                  .filter(br => br === 1 || br === ukupnoStranica || Math.abs(br - stranica) <= 2)
                  .map((br, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== br - 1 && (
                        <span key={`dots-${br}`} className="px-2 py-2 text-gray-400">...</span>
                      )}
                      <button
                        key={br}
                        onClick={() => setStranica(br)}
                        className={`px-4 py-2 rounded-lg transition
                          ${stranica === br
                            ? 'bg-green-700 text-white'
                            : 'border border-green-700 text-green-700 hover:bg-green-50'
                          }`}
                      >
                        {br}
                      </button>
                    </>
                  ))}

                <button
                  onClick={() => setStranica(s => Math.min(ukupnoStranica, s + 1))}
                  disabled={stranica === ukupnoStranica}
                  className="px-4 py-2 rounded-lg border border-green-700 text-green-700 hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Sljedeća →
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default Recepti