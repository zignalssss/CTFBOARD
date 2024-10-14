import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TeamManager from './element/TeamManager'
import './App.css'
import Card from './element/Card'
import Team from './element/TeamData'
function App() {
  const [count, setCount] = useState(0)
  const [centerStack,setCenterStack] = useState([])
  const [team1Stack,setTeam1Stack] = useState([])
  const [team2Stack,setTeam2Stack] = useState([])
  const [team3Stack,setTeam3Stack] = useState([])
  const [team4Stack,setTeam4Stack] = useState([])
  const [team5Stack,setTeam5Stack] = useState([])
  const [turn,setTurn] = useState(0)
  const [team1Data,setDataTeam1] = useState({knowledge:0,anti:'',os:''})
  const [team2Data,setDataTeam2] = useState({knowledge:0,anti:'',os:''})
  const [team3Data,setDataTeam3] = useState({knowledge:0,anti:'',os:''})
  const [team4Data,setDataTeam4] = useState({knowledge:0,anti:'',os:''})
  const [team5Data,setDataTeam5] = useState({knowledge:0,anti:'',os:''})

  const test = [{"url": "https://i.ibb.co/R7dCLHh/2.jpg", "name": "CryptoLocker","start-turn":2,"end-turn":5},
  {"url": "https://i.ibb.co/6brpvpw/3.jpg", "name": "Ryuk Attack","start-turn":2,"end-turn":4},
  {"url": "https://i.ibb.co/y4xYf83/4.jpg", "name": "WannaCry Outbreak","start-turn":3,"end-turn":3}]

  // setTeam1Stack(test)
  const numbers = [1,2,3,4,5,6,7,8];
  const listItems = numbers.map(() =>
    // <img className="rounded-md" src='https://i.ibb.co/hVRf1m9/132.jpg' width={150}></img>
    <Card url="fd" state = {false} w={80}/>
  );

  return (
    <div className="h-dvh grid grid-rows-[40%_60%] p-3">
      <div className='grid grid-cols-7  gap-5 py-5 px-40 h-full '>
          <div className="flex justify-center col-span-4  border-2 border-black">
            <div className="grid grid-cols-3 items-center gap-5 px-5 ">
              <div className='flex items-center col-span-1 flex-col '>
                <Card url="fd" state = {false} w = {160}/>
                {(centerStack.length > 0) && 
                  <button className=''>X</button>
                }
              </div>
              <div className=' grid grid-cols-5 col-span-2 gap-4'>
                {listItems}
              </div>
            </div>
          </div>
          <div className="flex justify-center col-span-2 gap-5 h-full">
            <div className='w-[100%]  border-2 border-black'>
              {/* TEST */}
              <TeamManager/>
            </div>
          </div>
          <div className="grid grid-rows-2  col-span-1 gap-5 h-full">
            <h1 className='text-2xl'>Turn Now : {turn}</h1>
            <button className='bg-green-200' onClick={()=>{setTurn(turn+1)}}>Next Turn</button>
          </div>
      </div>
      <div className='h-full grid grid-cols-5 gap-10 px-10'>

        <Team number={1} teamCard={test} thisTurn={turn}/>
        <Team number={2} teamCard={[]}  thisTurn={turn}/>
        <Team number={3} teamCard={[]}  thisTurn={turn}/>
        <Team number={4} teamCard={[]}  thisTurn={turn}/>
        <Team number={5} teamCard={[]}  thisTurn={turn}/>
        
      </div>
    </div> 
  )
}

export default App
