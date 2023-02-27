import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  const pkmList = props.list;
  if(pkmList.length > 0){
    const listDisplay = (
      {pkmList.map((pokemon) =>
        <img src={pokemon.pkmImage}></img>
    )}
    )
  }
}

export default PkmList
