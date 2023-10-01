import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";

function OnStream(props) {
    const [count, setCount] = useState(0);
    const [stream, setStream] = useState(null);
    const pseudo = props.cookies.user.data[0].login;
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/streams?user_login=Neru',
            {
                headers:{
                    'Authorization': `Bearer ${props.cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setStream(response.data);
        })
    }, [])
    console.log(stream);
    return (
        <>
            {stream &&
                stream.length > 0 &&
                    <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}>En stream !</a>
            }
        </>

    );
}

export default OnStream;
