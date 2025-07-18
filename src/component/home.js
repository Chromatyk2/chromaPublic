import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function HomePage(props) {
  return (
      <>
          <div className={"contentContainer"}>
              <p style={{textAlign: "center", color: "white"}}>Bienvenue, {props.cookies.user.data[0].login}</p>
              <p style={{textAlign: "center", color: "white"}}>Ici, tu peux ouvrir un booster Pokémon toutes les 2h, et utiliser tes points de chaîne Twitch pour en ouvrir encore plus ou capturer des Pokémon. <br/>
                  Construis ton profil, complète ton Pokédex, remplis ta collection de cartes et viens flexer en live !<br/>
                  Tout ça, c’est un gros taff, alors si tu veux me soutenir, passe sur mes streams et pense à drop un p’tit follow — ça fait grave plaisir !</p>
              <div className="socialContainer">
                  <p className="myNetworks">Mes reseaux</p>
                  <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i
                      class="fa-brands fa-discord"></i>Discord</a>
                  <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i
                      class="fa-brands fa-twitch"></i>Twitch</a>
                  <a className="socialLink" target='_blank' href="https://twitter.com/Chromatyk_"><i
                      class="fa-brands fa-twitter"></i>Twitter</a>
                  <a className="socialLink" target='_blank' href="https://www.instagram.com/chromatyk_/"><i
                      class="fa-brands fa-instagram"></i>Instagram</a>
              </div>
          </div>
      </>
  )
}

export default HomePage
