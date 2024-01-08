import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import {useCookies} from "react-cookie";

function OnStream() {
    const [cookies, setCookie] = useCookies();
    const [count, setCount] = useState(0);
    const [stream, setStream] = useState(null);
    const [displayStream, setDisplayStream] = useState(true);

    const pseudo = cookies.user.data[0].login;
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/streams?user_login=Chromatyk',
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setStream(response.data);
        })
    }, [])
    function displayStreamOff() {
        setDisplayStream(false);
    }
    function displayStreamOn() {
        setDisplayStream(true);
    }
    return (
        <>
            <div className={"buttonToDisplayStream"}>
                <button onClick={displayStreamOff}>Cacher le stream</button>
                <button onClick={displayStreamOn}>Afficher le stream</button>
            </div>
            {displayStream === true &&
                <div className="twitch">
                    <div className="twitch-video">
                        <iframe
                            src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr&autoplay=true&muted=false"
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen="true"
                            height="720"
                            width="1280">
                        </iframe>
                    </div>
                    <div className="twitch-chat">
                        <iframe
                            frameBorder="0"
                            scrolling="no"
                            src="https://www.twitch.tv/embed/chromatyk/chat?parent=chromatyk.fr"
                            height="100%"
                            width="100%">
                        </iframe>
                    </div>
                </div>

            }
        </>

    );
}

export default OnStream;
