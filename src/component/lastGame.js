import React,{useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios';
import UniqueBox from "./UniqueBox";

function LastGames(props) {
    const [lastGames, setLastGames] = useState(null);
    useEffect(() => {
        Axios.get('/api/lastGame')
            .then(function(response){
                setLastGames(response.data);
            })
    }, [])
        {lastGames.map((val, key) => {
            return(
                <div className="lastGameContainer">
                    <p>{val.title}</p>
                    <p>{val.console}</p>
                </div>
            )
        })}
}
export default LastGames