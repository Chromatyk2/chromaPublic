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

function StreamOnLayout() {
    const [cookies, setCookie] = useCookies();
    const [count, setCount] = useState(0);
    const [team, setTeam] = useState(null);
    const [displayStream, setDisplayStream] = useState(true);
    const pseudo = cookies.user.data[0].login;
    useEffect(() => {
        Axios.get(
            'https://api.twitch.tv/helix/teams?name=streamon',
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setTeam(response);
        })
    }, [])
    console.log(team.data[0])
    return (
        <p>StreamOn</p>
    );
}

export default StreamOnLayout;
