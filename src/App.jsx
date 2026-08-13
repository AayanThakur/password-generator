import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

// useRef hook
const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*()_+"

    for(let i=0; i<=length;i++)
    {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,2)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>passwordGenerator(),[length, numberAllowed, characterAllowed])

  return (
    <>
      <h1 className="text-blue-900 bg-yellow-500 p-5 rounded-xl font-bold m-3 text-center text-4xl">Password Generator</h1>

      <h2 className='text-blue-700 bg-yellow-500 p-5 rounded-2xl m-3 font-semibold text-center'>Generate Strong and random password that no one can guess except you!</h2>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-800 text-orange-400">
        <h1 className="text-white text-center my-3 text-lg font-medium">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white text-orange-400">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="outline-none w-full py-2 px-3 text-orange-400 placeholder-gray-400"
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-4 py-2 shrink-0 hover:bg-blue-700">
            copy
          </button>
        </div>


        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>

            <input type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>

<div className='flex items-center gap-x-1'>
  <input type="checkbox" 
  defaultChecked={numberAllowed}
  id="numberInput"
   onChange={()=>setNumberAllowed((prev)=>!prev)}/>
  <label>Number</label>
</div>

<div className='flex items-center gap-x-1'>
  <input type="checkbox" 
  defaultChecked={characterAllowed} 
  id="characterInput"
  onChange={()=>setCharacterAllowed((prev)=>!prev)}/>
  <label>Character</label>
</div>




        </div>

      </div>
    </>
  )
}

export default App
