import { Link } from 'react-router-dom'

function RecipeCard({ recept }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105 transform">
      <img
        src={recept.slika}
        alt={recept.naziv}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          {recept.kategorija}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mt-2">{recept.naziv}</h3>
        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          <span>⏱ {recept.vremePripreme} min</span>
          <span>🔥 {recept.kalorije} kcal</span>
        </div>
        <Link
          to={`/recepti/${recept.id}`}
          className="block mt-4 text-center bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition"
        >
          Pogledaj recept
        </Link>
      </div>
    </div>
  )
}

export default RecipeCard