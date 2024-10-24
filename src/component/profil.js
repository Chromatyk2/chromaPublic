import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import OpeningBooster from "./openingBooster";
import Modal from 'react-modal';
import PokedexTeam from "./pokedexTeam";
import {useParams} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import OnStream from "./onStream";
import SpawnPokemonToken from "./spawnPokemonToken";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
    const [list,setList] = useState([]);
    const [pourcent, setPourcent] = useState();
    const [modalIsOpenToken, setIsOpenToken] = React.useState(false);
    const [openTime, setOpenTime] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(true);
    function openToken() {
        setOpenTime(true)
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                if(response.data[0].pkmToken -1 > -1){
                    Axios.post('/api/removeToken',
                        {
                            user:pseudo
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setOpenTime(false)
                                    setProfil(response.data);
                                    setIsOpenToken(true);
                                    Axios
                                        .get("/api/getByUser/"+pseudo)
                                        .then(function(response){
                                            setList(response.data);
                                            setPourcent(Math.round((response.data.length / 1025) * 100));
                                        })
                                })
                        })
                }
            })
    }
    function closeModalToken() {
        setIsOpenToken(false);
    }
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
                setIsLoad(false)
                    Axios
                        .get("/api/getByUser/"+pseudo)
                        .then(function(response){
                            setList(response.data);
                            setPourcent(Math.round((response.data.length / 1025) * 100));
                        })
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
                backgroundColor: '#00368a',
                position: 'relative',
                zIndex: '1',
                borderRadius: '50px',
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
        <div className={"contentContainer"}>
            {isLoad === false &&
                profil &&
                profil.length > 0 &&
                <>
                    <OnStream/>
                    <div className={"profilVisuals"}>

                        <div style={{display: "flex", width: "800px", justifyContent: "center", flexWrap: "wrap"}}>

                            <div style={{margin: "0", width: "65px", display: pourcent >= 10 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="10% du pokédex complété">
                                <img style={{width: "100%"}} src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 20 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="20% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 30 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="30% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 40 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="40% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 50 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="50% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 60 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="60% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 70 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="70% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 80 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="80% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 90 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="90% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                            <div style={{margin: "0", width: "65px", display: pourcent >= 100 ? "block" : "none"}}
                                 className="anchorTooltip uniquePokemonContainer"
                                 data-tooltip-content="100% du pokédex complété">
                                <img style={{width: "100%"}}
                                     src={"/images/star.png"}/>
                            </div>
                        </div>

                        <Tooltip style={{zIndex: "1"}} anchorSelect=".anchorTooltip"/>

                        <button onClick={handleProfileImage} style={{width: "200px", display: "block", margin: "auto"}}
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
                        <div style={{display: "flex", alignItems: "center", gap: "50px", marginBottom: "20px"}}>
                            {profil[0].pkmToken > 0 &&
                                <button disabled={openTime} className={"openLeaderBoardButton"} onClick={openToken}
                                        style={{filter: "drop-shadow(0px 0px 15px white)", backgroundImage: "url(/token.png)"}}>
                                    <div className="infoPkm">
                                        <div className="infoNbPkmToken">{profil[0].pkmToken != 0 ? profil[0].pkmToken : 0}</div>
                                    </div>
                                </button>}
                            <div>
                                <p className={"levelProfil"}>Niveau {profil[0].level}</p>
                                <div style={customStyles.extBar} className="fullProgressBar">
                                    <div
                                        style={{
                                            width: parseFloat(profil[0].xp / (profil[0].level * 500) * 100).toFixed(2) + "%",
                                            position: 'relative',
                                            background: '#120747',
                                            textWrap: 'nowrap',
                                            color: 'white',
                                            borderRadius: '50px 50px 50px 50px',
                                            height: '30px'
                                        }}>
                                    </div>
                                    <div className={"pourcentLevel"}>
                                        {profil[0].xp + " / " + profil[0].level * 500 + "(" + parseFloat(profil[0].xp / (profil[0].level * 500) * 100).toFixed(2) + "%)"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"allPokemonTeam"}>
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
                </>
        }
        </div>
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <p style={{textAlign: "center"}}>Choisis ton Skin</p>
                {profil &&
                    profil.length > 0 &&
                    profil[0].box > 0 &&
                    <button className={"openSkinBox"} onClick={openSkin} style={{backgroundImage: "url(/images/skinClose.png)"}}>
                        <div className="infoPkm">
                            <div className="infoNbBoxSkin">{profil[0].box}</div>
                        </div>
                    </button>
                }
                <div style={{
                    overflow: "overlay",
                    display: "flex",
                    gap: "10px",
                    flexFlow: "row",
                    flexWrap:"wrap",
                    justifyContent:"center"
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
                <PokedexTeam list={list} change={handleState} pkmToUpdate={teamToHandle} cookies={props.cookies}/>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalToken"} isOpen={modalIsOpenToken} onRequestClose={closeModalToken} contentLabel="Example Modal">
                <SpawnPokemonToken pseudo={pseudo}/>
            </Modal>
        </>
    )
}

export default Profil
