import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'

function PlanIshrane() {
  const { data: plan, loading, greska } = useFetch('http://localhost:3001/planIshrane/1')
  const { data: recepti } = useFetch('http://localhost:3001/recepti')

  const dani = ['ponedjeljak', 'utorak', 'srijeda', 'cetvrtak', 'petak', 'subota', 'nedjelja']
  const obroci = ['dorucak', 'rucak', 'vecera']
  const obrociNazivi = { dorucak: '🍳 Doručak', rucak: '🍽️ Ručak', vecera: '🌙 Večera' }

  const getRecept = (id) => recepti?.find(r => r.id === id || r.id === String(id))

  if (loading) return <Spinner />

  if (greska) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Greška: {greska}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-800 mb-2 text-center">Plan ishrane</h1>
        <p className="text-gray-500 text-center mb-10">Sedmični plan obroka</p>

        <div className="flex flex-col gap-6">
          {dani.map(dan => (
            <div key={dan} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-green-800 capitalize mb-4">
                {dan.charAt(0).toUpperCase() + dan.slice(1)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {obroci.map(obrok => {
                  const receptId = plan?.dani?.[dan]?.[obrok]
                  const recept = getRecept(receptId)
                  return (
                    <div key={obrok} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-500 mb-2">
                        {obrociNazivi[obrok]}
                      </p>
                      {recept ? (
                        <div>
                          <img
                            src={recept.slika}
                            alt={recept.naziv}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <p className="font-semibold text-gray-800 text-sm">{recept.naziv}</p>
                          <p className="text-xs text-gray-500 mt-1">🔥 {recept.kalorije} kcal</p>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">Nije planiran obrok</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PlanIshrane