import { useEffect, useState } from 'react';

function TeamManager(props) {
    const anti_virus = ['Norton', 'Bitdefender', 'Avira Antivirus', 'McAfee'];
    const OS = ['Windows', 'Linux'];

    // State to manage the level for each antivirus and OS
    const initialLevels = {
        "Knowledge Level": 0,
        ...anti_virus.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
        ...OS.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}),
    };

    const [levels, setLevels] = useState(initialLevels);

    // Function to handle level changes for each member
    const handleLevelChange = (key, increment) => {
        setLevels((prevState) => ({
            ...prevState,
            [key]: Math.max(0, prevState[key] + increment), // Ensures the level doesn't go below 0
        }));
    };


    useEffect(()=>{
        //console.log(levels);
        if (props.onLevelsChange){
            props.onLevelsChange(levels);
        }
    },[Object.values(levels),props.onLevelsChange])
    return (
        <div className="team-manager px-2">
            <h1>Team Manager</h1>
            {/* Display Knowledge Level */}
            <div className="control-panel flex justify-between px-5">
                <h3>Knowledge Level</h3>
                <div className='flex flex-cols-2 gap-10'>
                <button onClick={() => handleLevelChange('Knowledge Level', -1)}>-</button>
                <span>{levels["Knowledge Level"]}</span>
                <button onClick={() => handleLevelChange('Knowledge Level', 1)}>+</button>
                </div>
            </div>

            {/* Display Antivirus Members with Level Control */}
            <div className="control-panel">
                <h3>Antivirus</h3>
                {anti_virus.map((antivirus, index) => (
                    <div key={index} className="control-panel flex justify-between px-5">
                        <span>{antivirus}</span>
                        <div className='flex flex-cols-2 gap-10'>
                        <button onClick={() => handleLevelChange(antivirus, -1)}>-</button>
                        <span> {levels[antivirus]}</span>
                        <button onClick={() => handleLevelChange(antivirus, 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display OS Members with Level Control */}
            <div className="control-panel">
                <h3>OS</h3>
                {OS.map((os, index) => (
                    <div key={index} className="control-panel flex justify-between px-5">
                        <span>{os}</span>
                        <div className='flex flex-cols-2 gap-10'>
                            <button onClick={() => handleLevelChange(os, -1)}>-</button>
                            <span>{levels[os]}</span>
                            <button onClick={() => handleLevelChange(os, 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamManager;
