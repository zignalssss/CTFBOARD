import { useEffect, useState } from 'react';
import Card from './Card';

function TeamData(props) {
    const anti_virus = ['Norton', 'Bitdefender', 'Avira Antivirus', 'McAfee'];
    const OS = ['Windows', 'Linux'];
    const [teamData, setTeamData] = useState({ 'anti': '', 'os': '' });
    const [level, setLevel] = useState({ 'knowledgeLevel': 0, 'anti-version': 0, 'os-version': 0 });
    const [teamStack, setTeamStack] = useState([]);
    const [status, setStatus] = useState(false);
    const [url_image, setUrlImage] = useState("");
    const [countCard,setCountCard] = useState(0);

    // Update teamStack when thisTurn changes
    useEffect(() => {
        const newTeamStack = props.teamCard.filter((element) => props.thisTurn === element['end-turn']);
        if (newTeamStack.length > 0) {
            setTeamStack(prevStack => [...prevStack, ...newTeamStack]);
        }
    }, [props.thisTurn, props.teamCard]);

    // Handle changes to teamStack and update url_image and status accordingly
    useEffect(() => {
        if (teamStack.length === 0) {
            setStatus(false);
            setUrlImage("");
        } else {
            setStatus(true);
            console.log(teamStack[teamStack.length - 1]['url']);
            setCountCard(countCard-1);
            setUrlImage(teamStack[teamStack.length - 1]['url']);
        }
    }, [teamStack]);

    // Function to handle antivirus change
    const handleAntivirusChange = (e) => {
        setTeamData(prevState => ({
            ...prevState,
            anti: e.target.value
        }));
    };

    // Function to handle OS change
    const handleOSChange = (e) => {
        setTeamData(prevState => ({
            ...prevState,
            os: e.target.value
        }));
    };

    // Function to handle knowledge level increment/decrement
    const handleKnowledgeChange = (increment) => {
        setLevel(prevState => ({
            ...prevState,
            knowledgeLevel: Math.max(0, prevState.knowledgeLevel + increment) // Ensures knowledge level does not go below 0
        }));
    };

    // Function to handle antivirus version increment/decrement
    const handleAntiVersionChange = (increment) => {
        setLevel(prevState => ({
            ...prevState,
            'anti-version': Math.max(0, prevState['anti-version'] + increment) // Ensures antivirus version does not go below 0
        }));
    };

    // Function to handle OS version increment/decrement
    const handleOSVersionChange = (increment) => {
        setLevel(prevState => ({
            ...prevState,
            'os-version': Math.max(0, prevState['os-version'] + increment) // Ensures OS version does not go below 0
        }));
    };

    return (
        <div className='grid grid-rows-6 gap-2 '>
            <div className='row-span-3 flex items-center flex-col'>
                {/* Card with dynamic URL and status */}
                {!status && 
                    <Card url={url_image} state={false} w={140} />
                }
                {teamStack.length > 0 && 
                    <Card url={url_image} state={true} w={140} />
                }
                {teamStack.length > 0 && 
                    
                    <button className='' onClick={() => {
                        console.log(teamStack.length);
                        setTeamStack(prevStack => prevStack.slice(0, -1));  // Remove the last element
                    }}>X</button>
                }
            </div>

            {/* Grid displaying all team cards */}
            <div className='grid grid-cols-8 row-span-1 gap-0.5 p-1 border-2 border-black'>
                {
                    props.teamCard.map(() => (
                        // <img className="rounded-md" src='https://i.ibb.co/hVRf1m9/132.jpg' width={150}></img>
                        <Card url="fd" state = {false} w={80}/>
                      ))
                }
            </div>

            {/* Control panel for settings */}
            <div className='row-span-2 grid grid-rows-3 border-2 border-black'>
                <div className='grid grid-cols-2'>
                    <div className='flex items-center'>Knowledge</div>
                    <div className='span-col-1 grid grid-cols-3 gap-1'>
                        <button onClick={() => handleKnowledgeChange(-1)}>-</button>
                        <div className='flex items-center justify-center'>
                            {level['knowledgeLevel']}
                        </div>
                        <button onClick={() => handleKnowledgeChange(1)}>+</button>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <select value={teamData.anti} onChange={handleAntivirusChange}>
                        <option value="" disabled>Select an antivirus</option>
                        {anti_virus.map((antivirus, index) => (
                            <option key={index} value={antivirus}>
                                {antivirus}
                            </option>
                        ))}
                    </select>
                    <div className='span-col-1 grid grid-cols-3 gap-1'>
                        <button onClick={() => handleAntiVersionChange(-1)}>-</button>
                        <div className='flex items-center justify-center'>
                            {level['anti-version']}
                        </div>
                        <button onClick={() => handleAntiVersionChange(1)}>+</button>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <select className='span-col-1' value={teamData.os} onChange={handleOSChange}>
                        <option value="" disabled>Select an OS</option>
                        {OS.map((os, index) => (
                            <option key={index} value={os}>
                                {os}
                            </option>
                        ))}
                    </select>
                    <div className='span-col-1 grid grid-cols-3 gap-1'>
                        <button onClick={() => handleOSVersionChange(-1)}>-</button>
                        <div className='flex items-center justify-center'>
                            {level['os-version']}
                        </div>
                        <button onClick={() => handleOSVersionChange(1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TeamData; 