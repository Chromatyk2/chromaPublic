import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import Axios from "axios";

function Shinydex() {
    return (

        <Navbar expanded={expanded} bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand><a href={"https://twitch.tv/chromatyk"}><img src={"/logo.png"} /></a></Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="navbarScroll"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/">Accueil</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/profil">Profil</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/compagnon">Compagnon</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/pokedex">Pokedex</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/allProfils">Communauté</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/cartes">Mes cartes</Link>
                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/boutique">Ouverture Booster</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Shinydex;
