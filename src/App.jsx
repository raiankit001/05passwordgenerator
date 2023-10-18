import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(8)                                          //hook useState
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {                                     //hook useCallback ----- used when we have some dependencies
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~`!@#$%^&*/*-+<>?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

const passwordRef = useRef(null)                                                  //hook useRef
  
 const copyPassword  = useCallback(async ()=>{
 await window.navigator.clipboard.writeText(password)
  alert("Password copied")
},[password])

  useEffect(() => {                                                                //hook useEffect
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword ])

  return (

    <>
      <div id='main' className='text-orange-500 bg-gray-800 mx-auto text-center rounded-xl max-w-2xl shadow-md p-4 my-8'>
        <h1 className='text-4xl text-white mb-5'>Password Gernator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none py-1 px-3 w-full text-3xl text-slate-500 bg-white'
            placeholder='Password'
            readOnly
            rel={passwordRef}
          />
          <button className='outline-none py-0.5 px-3 text-white shrink-0 bg-blue-700' onClick={copyPassword}>COPY</button>
        </div>
        <div id='options' className='flex justify-between px-3' >
          <div>
            <input className='mr-1' id='range' type="range" value={length} min={4} max={100} onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="range">Length: <span className='absolute'>{length}</span></label></div>
          <div>
            <input className='mr-1' type="checkbox" defaultChecked onChange={() => setNumberAllowed((pre) => !pre)} id='num' /><label htmlFor="num">Number Allowed</label></div>
          <div>
            <input className='mr-1' type="checkbox" onClick={() => setCharAllowed((pre) => !pre)} id='char' /><label htmlFor="char">Special Character Allowed</label></div>
        </div>
      </div>
    </>
  )
}

export default App
