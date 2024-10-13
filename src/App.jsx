import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const numbers = [1,2,3,4,5];
  const listItems = numbers.map(() =>
    <img className="rounded-md" src='https://i.ibb.co/hVRf1m9/132.jpg' width={150}></img>
  );
  
  return (
    <div className="h-screen grid grid-rows-[40%_20%_40%]">
     
      <div className='grid grid-cols-[70%_30%] pt-5'>
          <div className="flex justify-center h-full  ">
            <div className='pl-24 pt-5 w-[80%] border-2 border-black grid grid-cols-5'>
              {listItems}
            </div>
          </div>
          <div className="flex justify-center h-full  pr-20">
            <div className='w-[100%]  border-2 border-black'>
              TEST
            </div>
          </div>
      </div>
      <div className=" border-b-2 border-black">
        TEST
      </div>
      <div className=" border-b-2 border-black">
        TEST
      </div>
    </div> 
  )
}

export default App
