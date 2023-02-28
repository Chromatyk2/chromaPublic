import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
    return (
      <>
        <div className="stats">
          <p>Shiny : <span>{nbShiny}</span></p>
          <p>Total : <span>{nbTotal}</span></p>
        </div>
        <div className="pokemonGlobalContainer">
             {pkmList == [] ? (
               <h1>Loading...</h1>
             ) : (
                 pkmList.map((val, key) => {
                   return (
                     <div className="uniquePokemonContainer">
                     {val.nbCapture > 1 ? <div>{val.nbCapture}</div> : <div></div>}
                        <img src={val.pkmImage}></img>
                    </div>
                   )
                 })
             )}
          </div>
        </>
     );
}

export default PkmList
