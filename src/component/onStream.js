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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2";


function OnStream() {
    const [cookies, setCookie] = useCookies();
    const [stream, setStream] = useState(null);
    const [displayStream, setDisplayStream] = useState(true);

    const pseudo = cookies.user.data[0].login;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        button:{

            background: "none",
            border: "none",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginBottom: "20px",
            fontWeight: "bolder"
        }
    };
    useEffect(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=chromatyk',
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

    useEffect(() => {

        setInterval(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=chromatyk',
                {
                    headers:{
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function(response){
                setStream(response.data);
            })
        }, 60000)
    }, [])
    function hiddeStream() {
        setDisplayStream(false);
        document.getElementById("twitchPlayer").style.height = 0;
    }
    function showStream() {
        setDisplayStream(true);
        document.getElementById("twitchPlayer").style.height = "auto";
    }
    return (
        <>
            {stream &&
            stream.data.length > 0 ?
                <>
                    <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img style={{width:"50px"}} src={Twitch}/><p style={{fontSize: "15px",position: "absolute", left: "-75px", top: "30px"}}>En live !</p></a>
                </>
                    :
                <a className={"linkOnAirOff"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img style={{width:"50px"}} src={Twitch}/></a>
            }
            {stream &&
                <div style={{visibility: "visible",
                    position: "absolute",
                    height: "auto",
                    bottom: "0px",
                    left: "0px",
                    width: "300px",
                    zIndex: 10000}}>
                    {displayStream === true ?
                        <button style={{
                            width: "300px",
                            color: "white",
                            background: "none",
                            border: "none",
                            textAlign: "center"}} onClick={hiddeStream}>Fermer le stream</button>
                        :
                        <button style={{
                            width: "300px",
                            color: "white",
                            background: "none",
                            border: "none",
                            textAlign: "center"}} onClick={showStream}>Voir le stream</button>

                    }
                    <div className="twitch">
                    <div className="twitch-video">
                            <iframe
                                id={"twitchPlayer"}
                                src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr&autoplay=true&muted=false"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen="true"
                                height="720"
                                width="1280">
                            </iframe>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default OnStream;
