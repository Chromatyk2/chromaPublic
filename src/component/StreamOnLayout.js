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
import UniqueStreamer from './uniqueStreamer.js';

function StreamOnLayout() {
    const [cookies, setCookie] = useCookies();
    const [loading, stLoading] = useCookies(true);
    const [count, setCount] = useState(0);
    const [team, setTeam] = useState([]);
    const [onsStream, setOnStream] = useState([]);
    const [streams,setStreams] = useState([]);
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
            setTeam(response.data.data[0].users);
            response.data.data[0].users.map((val, key) => {
                Axios.get(
                    'https://api.twitch.tv/helix/streams?user_login='+val.user_name,
                    {
                        headers:{
                            'Authorization': `Bearer ${cookies.token.access_token}`,
                            'Client-Id': process.env.REACT_APP_CLIENT_ID
                        }
                    }
                ).then(function(response){
                    setStreams(oldArray => [...oldArray,response.data] );
                })
            })
        })
    }, [])
    if(streams.length == team.length){
        setOnStream(streams.filter((stream) => stream.data.length > 0));
    }
    return (
        <>
            {streams.length == team.length &&
                onsStream.map((val, key) => {
                    return(
                        <UniqueStreamer streamer={val.user_name} />
                    )
                })

            }
        </>
    );
}

export default StreamOnLayout;
