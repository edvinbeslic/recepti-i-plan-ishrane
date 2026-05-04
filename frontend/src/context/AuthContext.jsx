import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [korisnik, setKorisnik] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sacuvaniKorisnik = localStorage.getItem('korisnik')
    if (sacuvaniKorisnik) {
      setKorisnik(JSON.parse(sacuvaniKorisnik))
    }
    setLoading(false)
  }, [])

  const prijava = (podaciKorisnika) => {
    setKorisnik(podaciKorisnika)
    localStorage.setItem('korisnik', JSON.stringify(podaciKorisnika))
  }

  const odjava = () => {
    setKorisnik(null)
    localStorage.removeItem('korisnik')
  }

  return (
    <AuthContext.Provider value={{ korisnik, prijava, odjava, loading }}>
      {children}
    </AuthContext.Provider>
  )
}