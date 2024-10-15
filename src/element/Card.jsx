import { useState } from 'react'

function Card(props) {
    const [stateDisplay,setStateDisplay] = useState(props.state);
    return (
        <div >
            {stateDisplay ? <img src= {props.url} width={props.w} ></img> : <img src= '/images/backCard.jpg' width={props.w}></img>}
        </div>
    )
}

export default Card;