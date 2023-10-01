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
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="navLink" to="/">Accueil</Link>
                        <Link className="navLink" to="/29ct92B3ZrvxGT">TCG</Link>
                        {pseudo == "chromatyk" &&
                            <>
                                <Link className="navLink" to="/pokedex">Pokedex</Link>
                                <Link className="navLink" to="/leaderboard">Classement</Link>
                                <Link className="navLink myTradesLink" to="/myTrades">Mes Echanges {count > 0 && <span className="myCountProposition">{count}</span>}</Link>
                                <Link className="navLink" to="/tradePlace">Place aux echanges</Link>
                                <Link className="navLink" to="/aNu5YwZ5X75m5j">Note</Link>
                                <Link className="navLink" to="/29ct92B3ZrvxGS">NostalPick</Link>
                            </>
                        }
                        {stream &&
                            stream.length > 0 &&
                            <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}>En stream !</a>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default OnStream;
