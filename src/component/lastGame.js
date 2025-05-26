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
                const newElement = document.createElement('span');
                newElement.innerText = response.data[0].title;
                return (
                    <div id="non-portal" ref={node => node.appendChild(newElement)}></div>
                )
            })
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    return(
        <>
            {lastGames &&
                <img src={"/images/jaquettes/" + lastGames[0].console + "/" + lastGames[0].title}/>
            }
        </>
    )
}

export default LastGames