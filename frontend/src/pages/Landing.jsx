import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'

function Landing() {
  const [recepti, setRecepti] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/recepti')
      .then(res => res.json())
      .then(data => setRecepti(data.slice(0, 3)))
  }, [])

  return (
    <div>
      {/* Hero sekcija */}
      <section className="bg-green-800 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Zdravo kuhanje počinje ovdje</h1>
        <p className="text-green-200 text-xl mb-8 max-w-xl mx-auto">
          Otkrijte stotine ukusnih recepata i kreirajte personalizirani plan ishrane.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/recepti"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            Pregledaj recepte
          </Link>
          <Link
            to="/registracija"
            className="border border-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            Registruj se
          </Link>
        </div>
      </section>

      {/* Kategorije */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-10">Kategorije</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { naziv: 'Doručak', emoji: '🍳' },
              { naziv: 'Juhe', emoji: '🍲' },
              { naziv: 'Glavno jelo', emoji: '🍽️' },
              { naziv: 'Salate', emoji: '🥗' },
            ].map((kat) => (
              <Link
                to="/recepti"
                key={kat.naziv}
                className="bg-white rounded-xl p-6 text-center shadow hover:shadow-md transition hover:bg-green-50"
              >
                <div className="text-4xl mb-2">{kat.emoji}</div>
                <div className="font-semibold text-green-800">{kat.naziv}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popularni recepti */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-10">Popularni recepti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recepti.map(recept => (
              <RecipeCard key={recept.id} recept={recept} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/recepti"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Vidi sve recepte
            </Link>
          </div>
        </div>
      </section>

      {/* CTA sekcija */}
      <section className="bg-orange-500 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Kreirajte svoj plan ishrane</h2>
        <p className="text-orange-100 text-lg mb-6">
          Registrujte se i dobijte pristup personaliziranom tjednom planu ishrane.
        </p>
        <Link
          to="/registracija"
          className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition"
        >
          Počni besplatno
        </Link>
      </section>
    </div>
  )
}

export default Landing