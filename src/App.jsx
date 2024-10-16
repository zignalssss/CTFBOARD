import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TeamManager from './element/TeamManager'
import './App.css'
import Card from './element/Card'
import Team from './element/TeamData'
import { data } from 'autoprefixer';
function App() {
  const [count, setCount] = useState(0)
  const [centerStack,setCenterStack] = useState([])
  const [centerCard,setCenterCard] = useState([])
  const [team1Stack,setTeam1Stack] = useState([])
  const [team2Stack,setTeam2Stack] = useState([])
  const [team3Stack,setTeam3Stack] = useState([])
  const [team4Stack,setTeam4Stack] = useState([])
  const [team5Stack,setTeam5Stack] = useState([])
  const [level,setLevel] = useState({})
  const [level1,setLevel1] = useState({})
  const [level2,setLevel2] = useState({})
  const [level3,setLevel3] = useState({})
  const [level4,setLevel4] = useState({})
  const [level5,setLevel5] = useState({})
  // const [levels,setLevels] = useState([])
  const levels = [level,level1,level2,level3,level4,level5]
  const setLevels = [setLevel,setLevel1,setLevel2,setLevel3,setLevel4,setLevel5]
  const teamStateArray = [setCenterStack,setTeam1Stack,setTeam2Stack,setTeam3Stack,setTeam4Stack,setTeam5Stack];
  const teamVarStateArray = [centerStack,team1Stack,team2Stack,team3Stack,team4Stack,team5Stack];
  const [turn,setTurn] = useState(0)
  const [team1Data,setDataTeam1] = useState({knowledge:0,anti:'',os:''})
  const [team2Data,setDataTeam2] = useState({knowledge:0,anti:'',os:''})
  const [team3Data,setDataTeam3] = useState({knowledge:0,anti:'',os:''})
  const [team4Data,setDataTeam4] = useState({knowledge:0,anti:'',os:''})
  const [team5Data,setDataTeam5] = useState({knowledge:0,anti:'',os:''})
  const [allCard,setAllCard] = useState([])
  const [maxCard,setMaxCard] = useState(159);
  const [status,setStatus] = useState(false);
  const [urlImage,setUrlImage] = useState('');
  const [maxLevels, setMaxLevels] = useState({});
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const ransomware_type = [{"Password Spraying":"Strong Password, Account Lockout, MFA"},
    {"Privilege Escalation":"OS Version, MFA, Least Privilege, Access Control Monitoring"},
    {"Phishing or Social_Engineering":"Knowledge Level"},
    {"MITM_Attack":"Encryption, VPN, SID Regeneration, Strict Session, Session Timeout"},
    {"Malware":"Anti-Malware Version, Firewall, Data Backup"}
    ,{"Zero_Day_Exploit":"IDS/IPS, OS Version, Network Segmentation, Data Backup"}]
    const check_Protenct =  [
      "MFA",
      "Strong Password",
      "Data Backup",
      "IDS/IPS",
      "Account Lockout",
      "VPN",
      "Secure DNS",
      "DNSSEC",
      "Input and Output Encoding",
      "CSP",
      "DNS Filtering",
      "ORM",
      "Prepared Statements",
      "Access Control Monitoring",
      "Least Privilege",
      "SID Regeneration",
      "Session Timeout",
      "Encryption",
      "Strict Session",
      "Regular password changes",
      "Input Validation and Sanitization" ,
      "Firewall",
      "Establish Clear IT Policies"]
  useEffect(() => {
    fetchJSONData();
  }, []);

  
  function fetchJSONData() {
    fetch("/data/data.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) =>
            setAllCard(data))
        .catch((error) =>
            console.error("Unable to fetch data:", error));
  }

  function ranCard(){
    let index;
    //console.log(allCard.length)
    index = Math.floor(Math.random() * maxCard);
    const tmp = allCard[index]
    if(tmp['Times'] === -1){
      let i = Math.floor(Math.random() * 5);
      let valus = Object.values(ransomware_type);
      let keys = Object.keys(ransomware_type);
      tmp['Defence'] = valus[i];
      let t = Math.floor(Math.random*7) + 1;
      tmp['Times'] = t;
    }
    setMaxCard(maxCard => maxCard-1);
    //console.log(maxCard)
    tmp['start-turn'] = turn;
    const newCard = [...allCard];
    newCard.splice(index,1);
    setAllCard(newCard);
    //console.log(allCard.length)
    //console.log(tmp);
    return tmp;
  }

  useEffect(() => {


    let tmparr = Object.keys(maxLevels);
    let newLevels = [];

    for (let i = 0; i < 6; i++) {
        let level = {};
        tmparr.forEach(element => {
            level[element] = Math.floor(Math.random() * (maxLevels[element] - 1)) + 1;
        });
        setLevels[i](level);
        console.log(level);
        // newLevels.push(level); // Add the generated level object to the array
    }

    // console.log(newLevels); // Log the new levels
    // setLevels(newLevels); 

    // console.log(turn);
    if(turn == 0) return;
    // setMaxCard(maxCard => maxCard-1);
    //console.log(maxCard); return;
    if(maxCard <= 10)
    {
      fetchJSONData();
      setMaxCard(159);
    }
    teamStateArray.forEach((setTeamState) => {
      
      setTeamState(prevState => [...prevState, ranCard()]); // Appends ranCard to the current array state
    });
    // teamVarStateArray.forEach((state, index) => {
    //   console.log(`State of team ${index}:`, state);
    // });
    // for(let i = 0 ; i < 6 ; i++){console.log(ranCard());}
    // teamVarStateArray.forEach((a) => {
    //   console.log(a); // This will log each team's stack

      
  },[turn]);

      // console.log("THIS IS TEAM4STACK")
      // console.log(team4Stack);

  useEffect(()=>{
    const newTeamStack = centerStack.filter((element,index) => (turn === element['Times']+element['start-turn']));
        if (newTeamStack.length > 0) {
            // console.log("Center ||")
            // console.log(newTeamStack)
            setCenterCard(prevStack => [...prevStack, ...newTeamStack]);
        }
  },[turn])

  useEffect(() => {
    if (centerCard.length === 0) {
        setStatus(false);
        setUrlImage("");
    } else {
        setStatus(true);
        //("Center")
        
        //console.log(centerCard[centerCard.length - 1]['ImageURL']);
        // setCountCard(countCard+1);
        setUrlImage(centerCard[centerCard.length - 1]['ImageURL']);
    }
}, [centerCard]);

//useEffect(() => {
    // console.log("TEAM1:")
    // console.log(team1Stack)
    // console.log("TEAM2:")
    // console.log(team2Stack)
    // console.log("TEAM3:")
    // console.log(team3Stack)
    // console.log("TEAM4:")
    // console.log(team4Stack)
    // console.log("TEAM5:")
    // console.log(team5Stack)
//}, [team1Stack,team2Stack,team3Stack,team4Stack,team5Stack]);
// console.log("FOR TEAM1:")
// console.log(team1Stack)

const updateLevels = (newLevels) => {
  setMaxLevels(newLevels);
};
useEffect(()=>{
  console.log("This is max levels")
  console.log(maxLevels)
},[Object.values(maxLevels)])
const deleteCardFromTeam = (teamNumber, cardToDelete) => {
  if (teamNumber === 1) {
    setTeam1Stack(prevStack => prevStack.filter(card => card !== cardToDelete));
  } else if (teamNumber === 2) {
    setTeam2Stack(prevStack => prevStack.filter(card => card !== cardToDelete));
  } else if (teamNumber === 3) {
    setTeam3Stack(prevStack => prevStack.filter(card => card !== cardToDelete));
  } else if (teamNumber === 4) {
    setTeam4Stack(prevStack => prevStack.filter(card => card !== cardToDelete));
  } else if (teamNumber === 5) {
    setTeam5Stack(prevStack => prevStack.filter(card => card !== cardToDelete));
  }
};

  const test = [  {
    "ImageURL": "https://i.ibb.co/xF4pkgW/42.jpg",
    "Name": "Social Media Spoofing",
    "Times": 5,
    "TT": 1,
    "Defence": "DNSSEC, Secure DNS, VPN, DNS Filtering"
  }]

  // setTeam1Stack(test)
  const numbers = [1,2,3,4,5,6,7,8];
  const listItems = numbers.map(() =>
    // <img className="rounded-md" src='https://i.ibb.co/hVRf1m9/132.jpg' width={150}></img>
    <Card url="fa" state = {false} w={80}/>
  );
  console.log(centerStack);
  return (
    <div className="h-dvh grid grid-rows-[40%_60%] p-3">
      <div className='grid grid-cols-7  gap-5 py-5 px-40 h-full '>
          <div className="flex justify-center col-span-2  border-2 border-black">
            <div className="grid grid-cols-3 items-center gap-5 px-5 ">
              <div className='flex items-center col-span-2 flex-col '>
              {!status && 
                    <Card url={urlImage} state={false} w={160} />
                }
                {centerCard.length > 0 && 
                    <Card url={urlImage} state={true} w={160} />
                }
                 {centerCard.length > 0 && 
                    <div>{centerCard[centerCard.length - 1]['Defence']}</div>
                }
                {(centerCard.length > 0) && 
                  // <button className=''>X</button>
                  <button className='' onClick={() => {
                    //console.log(centerCard.length);
                    setCenterCard(prevStack => prevStack.slice(0, -1));  // Remove the last element
                  }}>X</button>
                }
              </div>
              <dic className='col-span-1'>{centerStack.length}</dic>
            </div>
          </div>
          <div className="flex justify-center col-span-2 gap-5 h-full">
            <div className='w-[100%]  border-2 border-black'>
              {/* TEST */}
              <TeamManager onLevelsChange={updateLevels}/>
            </div>
          </div>
          <div className='col-span-2 grid grid-cols-2'>
                {check_Protenct.map((element,index) => (
                  <div>{index+1} : {element}</div>
                ))};
              
          </div>

          <div className="grid grid-rows-2  col-span-1 gap-5 h-full">
            <h1 className='text-2xl'>Turn Now : {turn}</h1>
            <button className='bg-green-200' onClick={()=>{setTurn(turn+1)}}>Next Turn</button>
          </div>
      </div>
      <div className='h-full grid grid-cols-5 gap-10 px-10'>

      <Team number={1} teamCard={team1Stack} thisTurn={turn} deleteCard={deleteCardFromTeam} levels={levels[1]}/>
      <Team number={2} teamCard={team2Stack} thisTurn={turn} deleteCard={deleteCardFromTeam} levels={levels[2]}/>
      <Team number={3} teamCard={team3Stack} thisTurn={turn} deleteCard={deleteCardFromTeam} levels={levels[3]}/>
      <Team number={4} teamCard={team4Stack} thisTurn={turn} deleteCard={deleteCardFromTeam} levels={levels[4]}/>
      <Team number={5} teamCard={team5Stack} thisTurn={turn} deleteCard={deleteCardFromTeam} levels={levels[5]}/>

        
      </div>
    </div> 
  )
}

export default App
