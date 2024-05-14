import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function HomePage(props) {
  return (
    <>
        <div className="socialContainer">
            <div>
                <img style={{width: "35%"}} src={"images/logoSofk.png"}/>
                <p>
                    Le Stream On for Kids est un évènement caritatif en ligne se déroulant chaque année à l’occasion de la
                    Journée Internationale des Enfants Disparus pour collecter des dons en faveur du 116 000 Enfants
                    Disparus. Ce numéro d’urgence gratuit, disponible 24h/24 et 7j7, accompagne les familles confrontées à
                    la disparition de leur enfant.
                </p>
                <p>
                    Créé à l’initiative de Vaykhin en 2021, le Stream On for Kids se déroule sur Twitch, une plateforme de
                    vidéos en direct sur laquelle des streamers diffusent du contenu en interagissant avec leurs
                    spectateurs. L’événement a permis de collecter près de 30 000 € en faveur du numéro d’urgence lors de
                    ses trois premières éditions et permet également d’accroitre la notoriété du numéro 116 000 auprès du public.
                </p>
            </div>
            <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk">Faire un Don</a>
        </div>
    </>
  )
}

export default HomePage
