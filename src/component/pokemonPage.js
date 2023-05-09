import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import MyCaptures from './myCaptures.js';
import OtherCaptures from './otherCaptures.js';
import '../App.css'

function PokemonPage(props) {
const pseudo = props.cookies.user.data[0].login;
const [pokemon, setPokemon] = useState([]);
const [name, setName] = useState([]);
const [captures, setCaptures] = useState([]);
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const { id } = useParams()
useEffect(() => {
 fetch("https://pokeapi.co/api/v2/pokemon/"+id)
   .then(res => res.json())
   .then(
     (result) => {
       setIsLoaded(true);
       setPokemon(result);
     },
     (error) => {
       setIsLoaded(true);
       setError(error);
     }
   )
}, [])
useEffect(() => {
fetch("https://pokeapi.co/api/v2/pokemon-species/"+id+"/")
  .then(res => res.json())
  .then(
    (result) => {
      setIsLoaded(true);
      setName(result.names);
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
 if (error) {
   return <div>Error: {error.message}</div>;
 } else if (!isLoaded) {
   return <div></div>;
 } else {
   if(name[4] !== undefined && pokemon.sprites !== undefined){
   return (
     <>
     <div className="pokemonPageContainer">
        <div>
          <img className="imgPokemonPage" src={pokemon.sprites.other.home.front_default}></img>
          <p className="numberPokemonPage"># {pokemon.id}</p>
          <p className="namePokemonPage">{name[4].name}</p>
          <div className="pokemonTypeContainer">
            <img src={`/images/${pokemon.types[0].type.name}.png`}></img>
            {pokemon.types[1] &&
              <img src={`/images/${pokemon.types[1].type.name}.png`}></img>
            }
          </div>
          <MyCaptures captures={captures} />
        </div>
        <div>
          <OtherCaptures pkmId={id} />
        </div>
      </div>
     </>
   );
  }
 }
}
export default PokemonPage
