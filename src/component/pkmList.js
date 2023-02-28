import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
    return (
      <div className="pokemonGlobalContainer">
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
