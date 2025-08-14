import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmListTeam from './pkmListTeam.js'

function PokedexTeam(props) {
    const [compagnonList,setCompagnonList] = useState(null);
    const [pokemonList,setPokemonList] = useState([]);
    function handleState(e,f) {
        props.change(e,f);
    }

    useEffect(() => {
        Axios
            .get("/api/getCompagnonList/" + props.pseudo)
            .then(function (response) {
                setCompagnonList(response.data);
                props.list.map((val, key) => {
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
    }, [])
    return (
        <>
            {compagnonList &&
                    <PkmListTeam compagnonList={compagnonList} change={(e, f) => handleState(e, f)}
                                 pkmToUpdate={props.pkmToUpdate} list={props.list} pkmList={pokemonList}/>
            }
        </>
    )
}

export default PokedexTeam