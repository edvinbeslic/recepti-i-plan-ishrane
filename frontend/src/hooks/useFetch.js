import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [greska, setGreska] = useState(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    setGreska(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Greška pri dohvatanju podataka')
        return res.json()
      })
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setGreska(err.message)
        setLoading(false)
      })
  }, [url])

  return { data, loading, greska }
}

export default useFetch