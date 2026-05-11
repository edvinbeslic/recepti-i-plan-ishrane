import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-9xl font-bold text-green-800 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Stranica nije pronađena
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Stranica koju tražite ne postoji ili je premještena.
        </p>
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  )
}

export default NotFound