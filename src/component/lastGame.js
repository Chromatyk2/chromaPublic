import React,{useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios';
import UniqueBox from "./UniqueBox";

function LastGames(props) {
    const [lastGames, setLastGames] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get('/api/lastGame')
            .then(function(response){
                setLastGames(response.data);
            })
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    {lastGames &&
        lastGames.map((val, key) => {
            return(
                <div className="lastGameContainer">
                    <p>{val.title}</p>
                    <p>{val.console}</p>
                </div>
            )
        })
    }
}
export default LastGames