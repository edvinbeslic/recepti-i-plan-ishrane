import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import Landing from './pages/Landing'
import Recepti from './pages/Recepti'
import ReceptDetalji from './pages/ReceptDetalji'
import PlanIshrane from './pages/PlanIshrane'
import Prijava from './pages/Prijava'
import Registracija from './pages/Registracija'
import Kontakt from './pages/Kontakt'
import ONama from './pages/ONama'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recepti" element={<Recepti />} />
          <Route path="/recepti/:id" element={<ReceptDetalji />} />
          <Route path="/plan-ishrane" element={
            <PrivateRoute>
              <PlanIshrane />
            </PrivateRoute>
          } />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/o-nama" element={<ONama />} />
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <Admin />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App