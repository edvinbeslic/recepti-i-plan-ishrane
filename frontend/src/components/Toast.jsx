import { useEffect } from 'react'

function Toast({ poruka, tip = 'uspjeh', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const boja = tip === 'uspjeh' ? 'bg-green-500' : 'bg-red-500'

  return (
    <div className={fixed top-6 right-6 z-50 ${boja} text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3}>
      <span>{tip === 'uspjeh' ? '✅' : '❌'}</span>
      <p className="font-medium">{poruka}</p>
      <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">✕</button>
    </div>
  )
}

export default Toast