import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../index.css'

function RandomProfil(props) {
    const [allProfil,setAllProfil] = useState([]);
    const [randomIndex,setRandomIndex] = useState(-1);
    const [pokemonList,setPokemonList] = useState([]);
    const [compagnonList,setCompagnonList] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getAllProfilRandom")
            .then(function(response){
                setAllProfil(response.data);
                setRandomIndex(Math.floor(Math.random() * response.data.length));
            })
    }, [])
    useEffect(() => {
        setInterval(() => {
            console.log(allProfil);
            console.log(randomIndex)
            setPokemonList([])
            Axios
                .get("/api/getCompagnonList/" + allProfil[randomIndex].pseudo)
                .then(function (response) {
                    setCompagnonList(response.data);
                    response.data.map((val, key) => {
                        fetch("https://pokeapi.co/api/v2/pokemon-form/" + val.pkmId + "/")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    fetch(result.pokemon.url)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                setPokemonList(items => [...items,{form_id:val.pkmId,pkm_id:result.id}]);
                                            })
                                })
                    })
                })
        }, 5000)
    }, [allProfil.length > 0]);
    return (
        <>
            {randomIndex > -1 &&
                    <div style={{
                        width: "65%",
                        margin: "auto",
                        background: "rgba(0,0,0,.5)",
                        borderRadius: "50px",
                        padding: "20px",
                        position:"absolute",
                        left:"300px",
                        top:"300px"
                    }}>
                        { allProfil[randomIndex].badge !== null &&
                            <img style={{position: "absolute",top: "-150px",right: "-150px",width: "320px"}} src={"/Ribbon/"+allProfil[randomIndex].badge+".png"}/>
                        }
                        {/*<img style={{position: "absolute",top: "-80px",right: "-80px",width: "250px"}} src={"/Ribbon/lv11.png"}/>*/}
                        <p className={"pseudoProfilList"}>{allProfil[randomIndex].pseudo}</p>
                        <p className={"levelProfilList"}>Niveau {allProfil[randomIndex].level}
                            <small> ( {allProfil[randomIndex].xp} xp )</small>
                        </p>
                        <p className={"levelProfilList"}>
                            <small> Rang : {randomIndex + 1}</small>
                        </p>
                        <div className={"profilVisualsList"}>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].first_pokemon ? 'url(' + allProfil[randomIndex].first_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"first_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].first_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].first_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>

                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].second_pokemon ? 'url(' + allProfil[randomIndex].second_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"second_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].second_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].second_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].third_pokemon ? 'url(' + allProfil[randomIndex].third_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"third_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].third_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].third_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                            </div>
                            <div style={{width: "150px"}} className="anchorTooltip uniquePokemonContainer">
                                {allProfil[randomIndex].profil_picture ?
                                    <img style={{width: "100%"}}
                                         src={"/images/Trainers/Trainer"+allProfil[randomIndex].profil_picture+".png"}/>
                                    :
                                    <img style={{width: "100%"}} src={"/images/random.png"}/>
                                }
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fourth_pokemon ? 'url(' + allProfil[randomIndex].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fourth_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].fourth_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].fourth_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fifth_pokemon ? 'url(' + allProfil[randomIndex].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fifth_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].fifth_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].fifth_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].sixth_pokemon ? 'url(' + allProfil[randomIndex].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"sixth_pokemon"}
                                className={pokemonList.filter((item) => item.form_id == allProfil[randomIndex].sixth_pokemon.match(/\d/g).join("")).length > 0 && compagnonList.filter((item) => item.pokemon == pokemonList.filter((item) => item.form_id == allProfil[randomIndex].sixth_pokemon.match(/\d/g).join(""))[0].pkm_id && item.level == 100 && item.shiny == allProfil[randomIndex].first_pokemon.includes('shiny') ? 1 : 0).length > 0 ? "anchorTooltip uniquePokemonContainerTeam maxLevelFrame" : "anchorTooltip uniquePokemonContainerTeam"}>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default RandomProfil
