import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import MyCaptures from './myCaptures.js';
import OtherCaptures from './otherCaptures.js';
import '../App.css'
import moment from "moment";

function PokemonPage(props) {
const pseudo = props.cookies.user.data[0].login;
const [pokemon, setPokemon] = useState([]);
const [name, setName] = useState([]);
const [captures, setCaptures] = useState([]);
const [idPkm, setIdPkm] = useState(null);
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [isShiny, setIsShiny] = useState(false);
const [isLoadConvert, setIsLoadedConvert] = useState(false);
const { id } = useParams()
useEffect(() => {
 fetch("https://pokeapi.co/api/v2/pokemon/"+id)
   .then(res => res.json())
   .then(
     (result) => {
       setIsLoaded(true);
       setPokemon(result);
         fetch(result.species.url)
             .then(res => res.json())
             .then(
                 (result) => {
                     setIsLoaded(true);
                     setName(result.names);
                     setIdPkm(result.id)
                 },
                 (error) => {
                     setIsLoaded(true);
                     setError(error);
                 }
             )
     },
     (error) => {
       setIsLoaded(true);
       setError(error);
     }
   )
}, [])
useEffect(() => {
  Axios
    .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
    .then(function(response){
        setCaptures(response.data);
  })
}, [])
function changeSprite() {
    if(isShiny === true){
        setIsShiny(false)
    }else{
        setIsShiny(true)
    }
}
    function convertShiny() {
        if(captures.length - 5 > -1){
            setIsLoadedConvert(true);
            Axios.delete('/api/deleteShiny/'+id+"/"+pseudo)
                .then(
                    (result) => {
                        Axios.post('/api/capture', {pseudo: pseudo, pkmName: name[4].name, pkmImage:pokemon.sprites.front_shiny,pkmId:id, shiny:1, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                            .then(
                                (result) => {
                                    Axios
                                        .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
                                        .then(function(response){
                                            setCaptures(response.data);
                                            setIsLoadedConvert(false);
                                        })
                                })
                    })
        }
    }
    function convertBadge() {
        if(captures.length - 5 > -1){
            setIsLoadedConvert(true);
            Axios.delete('/api/deleteShiny/'+id+"/"+pseudo)
                .then((result) => {
                    Axios.post('/api/addBadge',
                        {
                            pseudo: pseudo,
                            image: "pokemon"+idPkm,
                            stade: 0,
                            description: "Badge obtenu en capturant "+name[4].name+" !"
                        })
                        .then(
                            (result) => {
                                Axios
                                    .get("/api/getByUserAndPokemon/"+pseudo+"/"+id)
                                    .then(function(response){
                                        setCaptures(response.data);
                                        setIsLoadedConvert(false);
                                    })
                            })
                })
        }
    }
    function convertBadgeShiny() {
        if(captures.filter(item => item.shiny == 1).length - 5 > -1){
            setIsLoadedConvert(true);
            Axios.delete('/api/deleteShinyBadge/'+id+"/"+pseudo)
                .then((result) => {
                    Axios.post('/api/addBadge',
                        {
                            pseudo: pseudo,
                            image: "pokemonshiny"+idPkm,
                            stade: 0,
                            description: "Badge obtenu en obtenant 3 " + name[4].name + " shiny !"
                        })
                        .then(
                            (result) => {
                                Axios
                                    .get("/api/getByUserAndPokemon/" + pseudo + "/" + id)
                                    .then(function (response) {
                                        setCaptures(response.data);
                                        setIsLoadedConvert(false);
                                    })
                            })
                })
        }
    }
 if (error) {
   return <div>Error: {error.message}</div>;
 } else if (!isLoaded) {
   return <div></div>;
 } else {
     if(name[4] !== undefined && pokemon.sprites !== undefined){
   return (
     <>
         <div className={"pagePokemonContainer"}>
             <div className="pokemonPageContainer">
                <div>
                  <img onClick={changeSprite} className="imgPokemonPage" src={isShiny === false ? pokemon.sprites.other.home.front_default : pokemon.sprites.other.home.front_shiny}></img>
                  <p className="numberPokemonPage"># {pokemon.id}</p>
                  <p className="namePokemonPage">{name[4].name}</p>
                  <div className="pokemonTypeContainer">
                    <img src={`/images/${pokemon.types[0].type.name}.png`}></img>
                    {pokemon.types[1] &&
                      <img src={`/images/${pokemon.types[1].type.name}.png`}></img>
                    }
                  </div>
                </div>
                <div>
                    <MyCaptures captures={captures} />
                    {captures.filter(item => item.shiny == 0).length > 4 &&
                        isLoadConvert === false &&
                        <>
                            <button style={{width: "fit-content"}} className={"filterButton"}
                                    onClick={convertShiny}> Sacrifier 5 pour avoir ce pokemon en shiny
                            </button>
                            <button style={{width: "fit-content"}} className={"filterButton"}
                                    onClick={convertBadge}> Sacrifier 5 pour obtenir le badge
                            </button>
                        </>
                    }
                    {captures.filter(item => item.shiny == 1).length > 2 &&
                        isLoadConvert === false &&
                            <button style={{width: "fit-content"}} className={"filterButton"}
                                    onClick={convertBadgeShiny}> Sacrifier 3 pour obtenir le badge shiny
                            </button>
                    }
                </div>
             </div>
         </div>
     </>
   );
     }
 }
}

export default PokemonPage
