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
import Twitch from '../twitch.png'

function OnStream() {
    const [cookies, setCookie] = useCookies();
    const [count, setCount] = useState(0);
    const [stream, setStream] = useState(null);
    const [meetUp, setMeetUp] = useState(null);
    const [displayStream, setDisplayStream] = useState(true);

    const pseudo = cookies.user.data[0].login;
    useEffect(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=Ponce',
                {
                    headers:{
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function(response){
                setStream(response.data);
                if(response.data.length > 0){setDisplayStream(true)}else{setDisplayStream(false)}
            })
    }, [])

    useEffect(() => {

        setInterval(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=Ponce',
                {
                    headers:{
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function(response){
                setStream(response.data);
                if(response.data.length > 0){setDisplayStream(true)}else{setDisplayStream(false)}
            })
        }, 60000)
    }, [])
    function displayStreamOff() {
        setDisplayStream(false);
    }
    function displayStreamOn() {
        setDisplayStream(true);
    }
    return (
        <>
            {stream &&
            stream.data.length > 0 ?
                <>
                    <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img src={Twitch}/></a>
                </>
                    :
                <a className={"linkOnAirOff"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img src={Twitch}/></a>
            }
            {stream &&
                        <div style={displayStream === false ? {visibility:"hidden", height:0} : {visibility:"visible"}} className="twitch">
                            <div className="twitch-video">
                                <iframe
                                    src="https://player.twitch.tv/?channel=ponce&parent=chromatyk.fr&autoplay=true&muted=false"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowFullScreen="true"
                                    height="720"
                                    width="1280">
                                </iframe>
                            </div>
                        </div>
            }
        </>

    );
}

export default OnStream;
