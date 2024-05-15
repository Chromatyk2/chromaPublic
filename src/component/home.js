import React from 'react';
import '../App.css'

function HomePage(props) {
  return (
    <>
        <div className="homeContainer">
            <div className={"homeContent"}>
                <img style={{width: "40%"}} src={"images/logoSofk.png"}/>
                <div>
                    <p className={"paragraphHome"}>
                        Le <span>Stream On for Kids</span> est un évènement caritatif en ligne se déroulant chaque année à l’occasion
                        de la <span>Journée Internationale des Enfants Disparus</span> pour collecter des dons en faveur du <span>116 000 Enfants
                        Disparus</span>. Ce numéro d’urgence gratuit, disponible <span>24h/24 et 7j7</span>, accompagne les familles
                        confrontées à la disparition de leur enfant.
                    </p>
                    <p className={"paragraphHome"}>
                        Créé à l’initiative de <span>Vaykhin</span> en 2021, le <span>Stream On for Kids</span> se déroule sur Twitch, une
                        plateforme de vidéos en direct sur laquelle des streamers diffusent du contenu en interagissant avec leurs
                        spectateurs. L’événement a permis de collecter près de <span>30 000 €</span> en faveur du numéro d’urgence
                        lors de ses trois premières éditions et permet également d’accroitre la notoriété du numéro <span>116 000</span>
                        auprès du public.
                    </p>
                </div>
            </div>
            <a className="socialLink" target='_blank' href="https://streamlabscharity.com/teams/@stream-on-for-kids-2024/stream-on-for-kids-2024?member=643451324922470142&l=fr-FR">Faire un Don</a>
            <h1>Editions précédentes</h1>
        </div>
    </>
  )
}

export default HomePage
