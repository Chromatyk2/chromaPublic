import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function PkmList(props) {
  if(props.list.length > 0){
    const listDisplay = (
      {props.list.map((pokemon) =>
        <img src={pokemon.pkmImage}></img>
    )}
    )
  }
}

export default PkmList
