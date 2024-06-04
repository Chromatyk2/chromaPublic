import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import OpeningBooster from "./openingBooster";
import Modal from 'react-modal';
import PokedexTeam from "./pokedexTeam";
import {useParams} from "react-router-dom";
function OtherProfil(props) {
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
    const { pseudo } = useParams()
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
            })
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getSkins/"+pseudo)
            .then(function(response){
                setSkins(response.data);
            })
    }, [setIsOpen])

    const customStyles = {
        extBar: {
            backgroundColor: '#fc72a1',
            position: 'relative',
            zIndex: '1',
            borderRadius: '50px',
            margin:'auto',
            marginBottom: '15px',
            height:'30px',
            width:'300px'
        }
    };
    return (

        <>
            {profil &&
                <div className={"contentContainer"}>
                    <div className={"profilVisuals"}>
                        <div style={{width: "200px",display:"block",margin:"auto"}} className="anchorTooltip uniquePokemonContainer">
                            {profil[0].profil_picture ?
                                <img style={{width: "100%"}}
                                     src={"/images/Trainers/Trainer" + profil[0].profil_picture + ".png"}/>
                                :
                                <img style={{width: "100%"}} src={"/images/random.png"}/>
                            }
                        </div>
                        <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                        <p className={"levelProfil"}>Niveau {profil[0].level}</p>
                        <div style={customStyles.extBar} className="fullProgressBar">
                            <div
                                style={{
                                    width: parseFloat(profil[0].xp / (profil[0].level * 1000) * 100).toFixed(2) + "%",
                                    position: 'relative',
                                    background: '#74fbcf',
                                    textWrap: 'nowrap',
                                    color: 'black',
                                    borderRadius: '50px 0 0 50px',
                                    height: '30px'
                                }}>
                            </div>
                            <div className={"pourcentLevel"}>
                                {profil[0].xp + " / " + profil[0].level * 1000 + "(" + parseFloat(profil[0].xp / (profil[0].level * 1000) * 100).toFixed(2) + "%)"}
                            </div>
                        </div>
                        <div className={"allPokemonTeam"}>
                            <div
                                style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}} value={"first_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                            <div
                                style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}} value={"second_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                            </div>
                            <div
                                style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}} value={"third_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                            </div>
                            <div
                                style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}} value={"fourth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                            </div>
                            <div
                                style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}} value={"fifth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                            </div>
                            <div
                                style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}} value={"sixth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OtherProfil
