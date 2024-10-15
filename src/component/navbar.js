import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";

function NavBar(props) {
  const [count, setCount] = useState(0);
  const [stream, setStream] = useState(null);
  const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                if(response.data.length < 1){
                    console.log(response.data.length)
                    return Axios.post('/api/addCardsPoint',
                        {
                            user:pseudo
                        }
                    )
                }
            })
    }, [])
  return (

      <Navbar expanded={expanded} bg="light" expand="lg">
          <Container fluid>
              <Navbar.Toggle
                  aria-controls="navbarScroll"
                  onClick={() => setExpanded(!expanded)}
              />
              <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                     <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/">Accueil</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/profil">Profil</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/pokedex">Pokedex</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/allProfils">Classement</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/cartes">Mes cartes</Link>
                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/boutique">Ouverture Booster</Link>

                      <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/pedandex">Pedandex</Link>
                      {pseudo == "chromatyk" &&
                                    <>
<<<<<<< HEAD
                                        <Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/VXJ325De2ee8ah">Generateur</Link>
=======
                                        {/*<Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/boosters">Mes boosters</Link>*/}
                                        <Link style={{color:"red"}} onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/49Vs5sWVS2e7qs">Générateur</Link>
>>>>>>> main
                                      {/*  <Link className="navLink" to="/pokedex">Pokedex</Link>*/}
                                      {/*  <Link className="navLink" to="/leaderboard">Classement</Link>*/}
                                      {/*  <Link className="navLink myTradesLink" to="/myTrades">Mes Echanges {count > 0 && <span className="myCountProposition">{count}</span>}</Link>*/}
                                      {/*  <Link className="navLink" to="/tradePlace">Place aux echanges</Link>*/}
                                      {/*<Link className="navLink" to="/aNu5YwZ5X75m5j">Note</Link>*/}
                                      {/*  <Link className="navLink" to="/29ct92B3ZrvxGS">NostalPick</Link>*/}
                                      {/*<Link onClick={() => setExpanded(false)} className="navLink linkFromNav" to="/tcg/liste">Liste</Link>*/}
                                    </>
                      }
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}

export default NavBar;
