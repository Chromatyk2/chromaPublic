import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import OpeningBooster from "./openingBooster";
import Modal from 'react-modal';
import PokedexTeam from "./pokedexTeam";
import {useParams} from "react-router-dom";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
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
    function handleProfileImage() {
        setIsOpen(true);
    }
    function handleTeam(e) {
        const teamToUpdate = e.target.value;
        setTeamToHandle(teamToUpdate);
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function changeSkin(e) {
        const skin = e.target.value;
        Axios.post('/api/updateSkin',
            {
                user:pseudo,
                skin:e.target.value
            }
        )
        .then(function(response){
            Axios
                .get("/api/getProfil/"+pseudo)
                .then(function(response){
                    setProfil(response.data);
                    setIsOpen(false);
                })
        })
    }
    function openSkin(e) {
        if(profil[0].box - 1 > -1){
            Axios.post('/api/removeBoxSkin',
                {
                    user:pseudo
                }
            )
                .then(function(response){
                    Axios.post('/api/addSkin',
                        {
                            user:pseudo,
                            skin:Math.floor((Math.random() * 734) + 1)
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setProfil(response.data);
                                    Axios
                                        .get("/api/getSkins/"+pseudo)
                                        .then(function(response){
                                            setSkins(response.data);
                                        })
                                })
                        })
                })
        }
    }
    function handleState() {
        Axios.get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
                Axios
                    .get("/api/getSkins/"+pseudo)
                    .then(function(response){
                        setSkins(response.data);
                        setIsOpenTeam(false);
                    })
            })
    }
    return (
        <>
        {profil &&
        profil.length > 0 ?
            <div className={"contentContainer"}>
                <div className={"profilVisuals"}>
                    <div className={"profilStats"}>
                        <button onClick={handleProfileImage} style={{width: "200px"}}
                                className="anchorTooltip uniquePokemonContainer">
                            {profil[0].box > 0 &&
                                <div className="infoPkm">
                                    <div className="infoNbBox">{profil[0].box}</div>
                                </div>
                            }
                            {profil[0].profil_picture ?
                                <img style={{width: "100%"}}
                                     src={"/images/Trainers/Trainer" + profil[0].profil_picture + ".png"}/>
                                :
                                <img style={{width: "100%"}} src={"/images/random.png"}/>
                            }
                        </button>
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
                        <button
                            style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"first_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam">
                        </button>
                        <button
                            style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"second_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                        </button>
                        <button
                            style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"third_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                        </button>
                        <button
                            style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"fourth_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                        </button>
                        <button
                            style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"fifth_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                        </button>
                        <button
                            style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                            onClick={handleTeam} value={"sixth_pokemon"}
                            className="anchorTooltip uniquePokemonContainerTeam">
                        </button>
                    </div>
                </div>
                <div className={"profilVisualsMobile"}>
                    <button onClick={handleProfileImage} style={{width: "200px"}}
                            className="anchorTooltip uniquePokemonContainer">
                        {profil[0].box > 0 &&
                            <div className="infoPkm">
                                <div className="infoNbBox">{profil[0].box}</div>
                            </div>
                        }
                        {profil[0].profil_picture ?
                            <img style={{width: "100%"}}
                                 src={"/images/Trainers/Trainer" + profil[0].profil_picture + ".png"}/>
                            :
                            <img style={{width: "100%"}} src={"/images/random.png"}/>
                        }
                    </button>

                    <button
                        style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}}
                        onClick={handleTeam} value={"third_pokemon"}
                        className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                    </button>
                    <button
                        style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                        onClick={handleTeam} value={"fourth_pokemon"}
                        className="anchorTooltip uniquePokemonContainerTeam closePokemonProfil">
                    </button>
                    <button
                        style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}}
                        onClick={handleTeam} value={"second_pokemon"}
                        className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                    </button>
                    <button
                        style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                        onClick={handleTeam} value={"fifth_pokemon"}
                        className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfil">
                    </button>
                    <button
                        style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}}
                        onClick={handleTeam} value={"first_pokemon"}
                        className="anchorTooltip uniquePokemonContainerTeam">
                    </button>
                    <button
                        style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                onClick={handleTeam} value={"sixth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </button>
                        </div>
            </div>
            :
            <div className={"contentContainer"}>
                <p className={"pseudoProfil"}>Capture ton premier pokémon pour débuter ton profil !</p>
                <p className={"pseudoProfil"}>Pour ça, rendez-vous sur le stream de <a href={"twitch.tv/chromatyk"}
                                                                                       target={"_blank"}>Chromatyk</a> quand
                    il est en live !</p>
            </div>
        }
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <p style={{textAlign: "center"}}>Choisis ton Skin</p>
                {profil &&
                    profil.length > 0 &&
                    profil[0].box > 0 &&
                    <button className={"openSkinBox"} onClick={openSkin} style={{backgroundImage: "url(/basic.png)"}}>
                        <div className="infoPkm">
                            <div className="infoNbBoxSkin">{profil[0].box}</div>
                        </div>
                    </button>
                }
                <div style={{
                    overflow: "overlay",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    flexFlow: "row"
                }}>
                    {skins &&
                        skins.map((val, key) => {
                            return (
                                <button value={val.skin} style={{
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage: "url(/images/Trainers/Trainer" + val.skin + ".png)",
                                    border: "solid",
                                    borderRadius: "25px",
                                    padding: "20px",
                                    width: "100px",
                                    height: "100px"
                                }} onClick={changeSkin}></button>
                            )
                        })
                    }
                < /div>
            </Modal>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam} style={customStyles}
                   contentLabel="Example Modal">
                <PokedexTeam change={handleState} pkmToUpdate={teamToHandle} cookies={props.cookies}/>
            </Modal>
        </>
    )
}

export default Profil
