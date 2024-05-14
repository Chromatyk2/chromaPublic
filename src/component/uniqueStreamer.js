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

function UniqueStreamer(props) {
    const [cookies, setCookie] = useCookies();
    const pseudo = cookies.user.data[0].login;
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(props.onStream === true){
            var streamerName = props.streamer.infos[0].user_name;
        }else{
            var streamerName = props.streamer;
        }
        Axios.get(
            'https://api.twitch.tv/helix/users?name'+streamerName,
            {
                headers:{
                    'Authorization': `Bearer ${cookies.token.access_token}`,
                    'Client-Id': process.env.REACT_APP_CLIENT_ID
                }
            }
        ).then(function(response){
            setUser(response.data);
        })
    }, [])
    console.log(user);
    return (
        <>
            {user.length > 0 &&
                <>
                    <div className="uniqueStreamer">
                        {props.onStream === true ?
                            <div className={"uniqueStreamerOnline"}>
                                <p>{props.streamer.infos[0].user_name}</p>
                                <img style={{width:"15px"}} src={"/images/redCircle.png"}/>
                                <p>{props.streamer.infos[0].viewer_count}</p>
                            </div>
                            :
                            <p>{props.streamer}</p>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default UniqueStreamer;
