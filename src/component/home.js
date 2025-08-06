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
              <p style={{textAlign: "center", color: "white"}}>Ici, tu peux ouvrir un booster Pokémon toutes les heures, et utiliser tes points de chaîne Twitch pour en ouvrir encore plus ou capturer des Pokémon. <br/>
                  Complète ton Pokédex, remplis ta collection de cartes, construis ton profil pour flex sur les lives !<br/>
                  Tout ça, c’est du taff, alors si tu veux me soutenir, passe sur mes streams et pense à lacher ton follow, tu me régalerais !</p>
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
