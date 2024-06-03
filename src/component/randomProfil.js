import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import ProfilList from "./profilList";
import {Link} from "react-router-dom";
import allProfils from "./allProfils";

function RandomProfil(props) {
    const [allProfil,setAllProfil] = useState([]);
    const [randomIndex,setRandomIndex] = useState(0);
    useEffect(() => {
        Axios
            .get("/api/getAllProfil")
            .then(function(response){
                setAllProfil(response.data);
            })
    }, [])
    useEffect(() => {
        const interval = setInterval(
            () => setRandomIndex(Math.floor(Math.random() * allProfil.length)), 10000
        );
        return () => {
            clearInterval(interval);
        };
    }, [allProfil.length > 0]);
    console.log(allProfil);
    console.log(randomIndex);
    return (
        <>
            {allProfil.length > 0 &&
                <div className={"contentContainer"}>
                    <div style={{background: "rgba(0,0,0,.5)", borderRadius: "50px", padding: "20px"}}>
                        <p className={"pseudoProfilList"}>{allProfil[randomIndex].pseudo}</p>
                        <p className={"levelProfilList"}>Niveau {allProfil[randomIndex].level}
                            <small>( {allProfil[randomIndex].xp} xp )</small></p>
                        <div className={"profilVisualsList"}>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].first_pokemon ? 'url(' + allProfil[randomIndex].first_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"first_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].second_pokemon ? 'url(' + allProfil[randomIndex].second_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"second_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].third_pokemon ? 'url(' + allProfil[randomIndex].third_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"third_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                            </div>
                            <div style={{width: "150px"}} className="anchorTooltip uniquePokemonContainer">
                                {allProfil[randomIndex].profil_picture ?
                                    <img style={{width: "100%"}}
                                         src={"/images/Trainers/Trainer" + allProfil[randomIndex].profil_picture + ".png"}/>
                                    :
                                    <img style={{width: "100%"}} src={"/images/random.png"}/>
                                }
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fourth_pokemon ? 'url(' + allProfil[randomIndex].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fourth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fifth_pokemon ? 'url(' + allProfil[randomIndex].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fifth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].sixth_pokemon ? 'url(' + allProfil[randomIndex].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"sixth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RandomProfil
