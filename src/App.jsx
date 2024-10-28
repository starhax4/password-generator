import { useState,useEffect, useCallback,useRef } from "react";

function App() {

  const [password,setPassword] = useState("h")
  const [length,setLength] = useState(9)
  const [numberAllowed,setNumberAllowed] = useState(true)
  const [charAllowed,setCharAllowed] = useState(true)

  const passRef = useRef(null)

  const handleLength = (e)=>{
    setLength(e.target.value)
  }

  const handleRefresh = ()=>{
    generatePassword()
  }

  const copyToClipboard = useCallback(()=>{
      passRef.current.select()
      passRef.current?.setSelectionRange(0,100)
      window.navigator.clipboard.writeText(password)
  },[password])

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "1234567890"
    if(charAllowed) str+="!@#$%^&*"

    for (let i = 1; i < length; i++) {
      let index = Math.floor(Math.random()* str.length +1)  
      pass +=str.charAt(index)
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])


  useEffect(() => {
   
    generatePassword()
  }, [length,numberAllowed,charAllowed,setPassword])
  

  return (
    <>
    <div className="flex flex-col w-screen h-screen bg-black">

        <div className="flex flex-col gap-3 justify-center items-center bg-slate-400 w-[45%] mx-auto p-8 rounded-lg mt-8">
        <h1 className="text-xl text-center font-bold text-white">Password Generator</h1>
          <div className="flex">
            <div className="bg-gray-500 w-[420px] rounded-lg">
              <input className="py-2 px-1 w-[420px] rounded-lg outline-none bg-transparent text-white" type="text" value={password} disabled maxLength={100} ref={passRef} id="passInp"/>
            </div>
            <button className="py-2 px-3 mx-1 rounded-lg bg-blue-300 text-white font-semibold hover:bg-blue-400 cursor-pointer" onClick={handleRefresh}>Refresh</button>
            <button className="py-2 px-3 mx-1 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer" onClick={copyToClipboard}>Copy</button>
          </div>
          <div className="flex gap-3 items-center">
            <label className="text-white font-semibold">Length</label>
            <input className=" py-2 w-56" type="range" name="length" value={length} onChange={handleLength}/>
            <label className="text-white font-semibold w-1">{password.length}</label>
            <div className="flex items-center justify-center gap-3 mx-6">
              <input className="p-2 " type="checkbox" name="numberAllowed" value={numberAllowed} defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed(!numberAllowed)}}/>
              <label className="text-white font-semibold">Numbers</label>
              <input type="checkbox" name="charAllowed" value={charAllowed} defaultChecked={charAllowed} onChange={()=>{setCharAllowed(!charAllowed)}}/>
              <label className="text-white font-semibold">Characters</label>
            </div>
          </div>
        </div>
    </div>

    </>
  );
}

export default App;
