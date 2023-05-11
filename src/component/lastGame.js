import React,{useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios';
import $ from 'jquery';

function LastGames(props) {
    const [lastGames, setLastGames] = useState(null);
    useEffect(() => {
            Axios.get('/api/lastGame')
                .then(function(response){
                    setLastGames(response.data);
                })
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            Axios.get('/api/lastGame')
            .then(function(response){
                <p>{response.data[0].title}</p>
            })
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    return(
        <>
            {lastGames &&
                lastGames.map((val, key) => {
                    return(
                        <>
                            <div className="lastGameContainer">
                                <p>{val.title}</p>
                                <p>{val.console}</p>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
export default LastGames