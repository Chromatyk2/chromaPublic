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
                    const intervalDisplay = setInterval(() => {
                        Axios.get('/api/lastGame')
                            .then(function(response){
                                setLastGames(response.data);
                            })
                    }, 30000);
                    return () => clearInterval(intervalDisplay);
                })
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    return(
        <>
            {lastGames &&
                <img style={{width: "500px",
                    position: "absolute",
                    top: "300px",
                    left: 0,
                    right: 0}} src={"/images/jaquettes/" + lastGames[0].console + "/" + lastGames[0].title}/>
            }
        </>
    )
}

export default LastGames