import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";
import {Link} from "react-router-dom";

function HomePage(props) {
  return (
      <>
              <p style={{textAlign: "center", color: "white"}}>Bienvenue, {props.cookies.user.data[0].login}</p>
              <p style={{textAlign: "center", color: "white"}}>Ici, tu peux ouvrir un booster Pokémon toutes les heures, et utiliser tes points de chaîne Twitch pour en ouvrir encore plus ou capturer des Pokémon. <br/>
                  Complète ton Pokédex, remplis ta collection de cartes, construis ton profil pour flex sur les lives !<br/>
                  Tout ça, c’est du taff, alors si tu veux me soutenir, passe sur mes streams et pense à lacher ton follow, tu me régalerais !</p>
          <div className="socialContainer">
              <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i
                  className="fa-brands fa-discord"></i>Discord</a>
              <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i
                  className="fa-brands fa-twitch"></i>Twitch</a>
              <Link style={{color:"gold"}} className="navLink linkFromNav socialLink" to="/shinydex">Shinydex</Link>
          </div>
      </>
  )
}

export default HomePage
