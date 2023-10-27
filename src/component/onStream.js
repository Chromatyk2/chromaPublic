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
    const pseudo = cookies.user.data[0].login;
    console.log(cookies);
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/streams?user_login=Chromatyk',
            {
                headers:{
                    'Authorization': `Bearer ${cookies.api_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setStream(response.data);
        })
    }, [])
    return (
        <>
            {stream &&
                stream.data.length > 0 ?
                    <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}>Live On <span className={"spanOnair"}>(clique et viens gagner des points)</span></a>
                :
                    <a className={"linkOnAirOff"} href={"https://twitch.tv/chromatyk"} target={"_blank"}>Live Off <span className={"spanOnair"}>(clique et lache ton follow ça fait plaisir)</span></a>
            }
        </>

    );
}

export default OnStream;
