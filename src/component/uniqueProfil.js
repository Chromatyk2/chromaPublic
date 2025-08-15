import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../index.css'
import {Link} from "react-router-dom";

function UniqueProfil(props) {
    const [compagnonList,setCompagnonList] = useState(null);
    Axios
        .get("/api/getCompagnonList/" + props.user.pseudo)
        .then(function (response) {
            setCompagnonList(response.data);
        })
    return (
        <div style={{background: "rgba(0,0,0,.5)", borderRadius: "50px", padding: "20px 20px 0px 20px"}}>
            <p className={"pseudoProfilList"}>{props.user.pseudo}</p>
            <p className={"levelProfilList"}>Niveau {props.user.level} <small>( {props.user.xp} xp )</small></p>
            <div className={"profilVisualsList"}>
                <div
                    style={{backgroundImage: props.user.first_pokemon ? 'url(' + props.user.first_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"first_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.first_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.first_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                </div>
                <div
                    style={{backgroundImage: props.user.second_pokemon ? 'url(' + props.user.second_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"second_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.second_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.second_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame middlePokemonProfilList" : "anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList"}>
                </div>
                <div
                    style={{backgroundImage: props.user.third_pokemon ? 'url(' + props.user.third_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"third_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.third_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.third_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame closePokemonProfilList" : "anchorTooltip uniquePokemonContainerTeam closePokemonProfilList"}>
                </div>
                <div style={{width: "150px"}} className="anchorTooltip uniquePokemonContainer">
                    {props.user.profil_picture ?
                        <img style={{width: "100%"}}
                             src={"/images/Trainers/Trainer" + props.user.profil_picture + ".png"}/>
                        :
                        <img style={{width: "100%"}} src={"/images/random.png"}/>
                    }
                </div>
                <div
                    style={{backgroundImage: props.user.fourth_pokemon ? 'url(' + props.user.fourth_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"fourth_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.fourth_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.fourth_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame closePokemonProfilList" : "anchorTooltip uniquePokemonContainerTeam closePokemonProfilList"}>
                </div>
                <div
                    style={{backgroundImage: props.user.fifth_pokemon ? 'url(' + props.user.fifth_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"fifth_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.fifth_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.fifth_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame middlePokemonProfilList" : "anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList"}>
                </div>
                <div
                    style={{backgroundImage: props.user.sixth_pokemon ? 'url(' + props.user.sixth_pokemon + ')' : 'url(/images/random.png)'}}
                    value={"sixth_pokemon"}
                    className={compagnonList && compagnonList.find((item)=>item.pokemon == props.user.sixth_pokemon.match(/\d/g).join("") && item.level == 100 && item.shiny == props.user.sixth_pokemon.includes('shiny') ? 1 : 0) ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                </div>
            </div>
            <div className={"linkList"}>
                <Link style={{width: "50px"}} className="navLink linkFromNav" to={"/pokedex/" + props.user.pseudo}><img
                    style={{width: "100%"}} src={"/images/pokedex.png"}/></Link>
                <Link style={{width: "50px"}} className="navLink linkFromNav" to={"/profil/" + props.user.pseudo}><img
                    style={{width: "100%"}} src={"/images/profil.png"}/></Link>
                <Link style={{width: "50px"}} className="navLink linkFromNav" to={"/tcg/cartes/" + props.user.pseudo}><img
                    style={{width: "100%"}} src={"/images/card.png"}/></Link>
            </div>
        </div>
    )
}

export default UniqueProfil
