import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  }, [password])
const[length, setlength]=useState(8)
const[number, setNumber]=useState(false)
const[char, setChar]=useState(false)
const[upCase, setUpcase]=useState(false)
const passwordGenerator = useCallback( ()=>{
  let pass = ""
  let str = "abcdefghijklmnopqrstuvwxyz"
  if(upCase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(number) str += "0123456789"
  if(char) str += "!@#$%^&*"
  for(let i=1; i<=length; i++){
    let c = Math.floor(Math.random() * str.length)
    pass += str.charAt(c)
  }
  setPassword(pass)
}, [length, number, char, upCase] )

useEffect(()=>{passwordGenerator()}, [length, number, char, upCase, passwordGenerator])
  return (
    <>
     <h1>Password Generator</h1>
     <div>
      <input type = "text" value = {password} placeholder = "password" readOnly ref={passwordRef} />
      <button onClick={copyPassword}>Copy</button> 
     </div>
     <div>
     <input type="range" min ={6} max={20}
     onChange={(e)=>{setlength(e.target.value)}}></input>
     <label>Length: {length}</label>
     </div>
     <div>
      <input
      type = "checkbox"
      defaultChecked={number}
      id="numberInput"
      onChange={()=>{
        setNumber((prev)=> !prev)
      }} />
      <label>0-9</label>


       <input
      type = "checkbox"
      defaultChecked={upCase}
      id="upcaseInput"
      onChange={()=>{
        setUpcase((prev)=> !prev)
      }} />
      <label>A-Z</label>

      <input
      type = "checkbox"
      defaultChecked={upCase}
      id="charInput"
      onChange={()=>{
        setChar((prev)=> !prev)
      }} />
      <label>!@#$%^&* </label>
     </div>
    </>
  )
}

export default App
