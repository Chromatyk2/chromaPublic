import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function Pokedex(props) {
const [list,setList] = useState([]);
const [totalPkm,setTotalPkm] = useState(0);
const pseudo = props.cookies.user.data[0].login;
const [compagnonList,setCompagnonList] = useState(null);
const [pokemonList,setPokemonList] = useState([]);
  useEffect(() => {

      Axios
          .get("/api/getCompagnonList/" + pseudo)
          .then(function (response) {
              setCompagnonList(response.data);
              Axios
                  .get("/api/getByUser/"+pseudo)
                  .then(function(response){
                      setList(response.data);
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
                      Axios
                          .get("/api/getTotalPokemon/"+pseudo)
                          .then(function(response){
                              setTotalPkm(response.data[0].totalCapture);
                          })
                  })
          })
    }, [])
    return (
        <>
            {totalPkm &&
                    <PkmList compagnonList={compagnonList} list={list} totalPkm={totalPkm} pkmList={pokemonList}/>
            }
        </>
    )
}

export default Pokedex
