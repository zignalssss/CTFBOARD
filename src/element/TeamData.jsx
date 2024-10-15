import { useEffect, useState } from 'react';
import Card from './Card';

function TeamData(props) {
    const anti_virus = ['Norton', 'Bitdefender', 'Avira Antivirus', 'McAfee'];
    const OS = ['Windows', 'Linux'];
    const [teamData, setTeamData] = useState({ 'anti': '', 'os': '' });
    const [level, setLevel] = useState({ 'Knowledge Level': 0, 'Anti-Malware Version': 0, 'OS Version': 0 });
    const [teamStack, setTeamStack] = useState([]);
    const [status, setStatus] = useState(false);
    const [url_image, setUrlImage] = useState("");
    const [countCard,setCountCard] = useState(0);
    const [checkStatus,setCheckStatus] = useState([false,false,false,false,false,
                                                    false,false,false,false,false,
                                                    false,false,false,false,false,
                                                    false,false,false,false,false,
                                                    false,false,false
                                                    ])
    const check_Protenct =  ["MFA",
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

    const ransomware_type = ["Password Spraying","Privilege Escalation",
                            "Phishing or Social_Engineering","MITM_Attack",
                            "Malware","Zero_Day_Exploit"]

    // Update teamStack when thisTurn changes
    useEffect(() => {
        const newTeamStack = props.teamCard.filter((element) => props.thisTurn === element['Times']);
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
            console.log(teamStack[teamStack.length - 1]['ImageURL']);
            setCountCard(countCard+1);
            setUrlImage(teamStack[teamStack.length - 1]['ImageURL']);
        }
    }, [teamStack]);


    props.teamCard.map((card,index) => {
        if(card['Times'] > props.thisTurn)
        {
            if(card['TT'] === 1){
                // console.log('true')
                checkStatus.map((elemet,i) => {
                    if(elemet && card['Defence'].includes(check_Protenct[i])){
                        console.log(check_Protenct[i]);
                    }
                })
            }
        }
    })


    function test(index)
    {
        console.log(index);const tmp = [...checkStatus];
        tmp[index] = true;
        setCheckStatus(tmp);
        console.log(checkStatus[index]);
        console.log(checkStatus)
    }
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
            'Knowledge Level': Math.max(0, prevState['Knowledge Level'] + increment) // Ensures knowledge level does not go below 0
        }));
    };

    // Function to handle antivirus version increment/decrement
    const handleAntiVersionChange = (increment) => {
        setLevel(prevState => ({
            ...prevState,
            'Anti-Malware Version': Math.max(0, prevState['Anti-Malware Version'] + increment) // Ensures antivirus version does not go below 0
        }));
    };

    // Function to handle OS version increment/decrement
    const handleOSVersionChange = (increment) => {
        setLevel(prevState => ({
            ...prevState,
            'OS Version': Math.max(0, prevState['OS Version'] + increment) // Ensures OS version does not go below 0
        }));
    };

    return (
        <div className='grid grid-rows-6 gap-2 bg-red-100'>
            <div className='row-span-3 flex items-center flex-col'>
                {/* Card with dynamic URL and status */}
                {!status && 
                    <Card url={url_image} state={false} w={160} />
                }
                {teamStack.length > 0 && 
                    <Card url={url_image} state={true} w={160} />
                }
                {teamStack.length > 0 && 
                    
                    <button className='' onClick={() => {
                        console.log(teamStack.length);
                        setTeamStack(prevStack => prevStack.slice(0, -1));  // Remove the last element
                    }}>X</button>
                }
            </div>

            {/* Grid displaying all team cards */}
            <div className='grid grid-cols-4 row-span-2 gap-1 p-1 border-2 border-black w-full'>
                <div className='col-span-1 bg-blue-100 flex items-center'>
                    <h1 >{Math.max(props.teamCard.length - countCard,0)}</h1>
                </div>
                <div className='bg-green-100 col-span-3 grid grid-cols-5'>
                    {
                        check_Protenct.map((element, index) => (
                            <div className='grid grid-cols-2'>
                                <input type="checkbox" onChange={()=>{test(index)}} id={`checkbox-${index} `} />
                                {index+1}
                            </div>
                        ))
                        
                    }
                </div>
            </div>

            {/* Control panel for settings */}
            <div className='row-span-1 grid grid-rows-3 border-2 border-black'>
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