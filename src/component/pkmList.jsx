import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
  if(props.list.length > 0){
    return(
      {pkmList.map((pokemon) =>
        <img src={pokemon.pkmImage}></img>
      )}
    )
  }
}

export default PkmList
