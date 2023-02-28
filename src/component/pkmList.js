import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
    return (
      <div className="pokemonGlobalContainer">
        <div className="stats">
          <p>Shiny : {nbShiny}</p>
          <p>Total : {nbTotal}</p>
        </div>
           {pkmList == [] ? (
             <h1>Loading...</h1>
           ) : (
               pkmList.map((val, key) => {
                 return (
                   <div className="uniquePokemonContainer">
                      <img src={val.pkmImage}></img>
                  </div>
                 )
               })
           )}
        </div>
     );
}

export default PkmList
