import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="h-screen flex items-center justify-center bg-red-500">
      <h1 className="text-4xl font-bold text-white">Tailwind is working 🎉</h1>
    </div>
    </>
  )
}

export default App
