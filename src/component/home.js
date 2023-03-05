import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function HomePage() {

const [pseudo,setPseudo] = useState("");
const [list,setList] = useState([]);
const submitPost = () => {
    Axios
      .get(`https://chromatyk-pokemon.herokuapp.com/api/getByUser/${pseudo}`)
      .then(function(response){
          setList(response.data);
    })
}
    return (
      <>
      <h1>Bienvenu sur le site pokemon de chromatyk</h1>
      <p>Ici tu pourras voir le live de Chromatyk, voir les pokemons que tu as obtenu sur le stream grâce à tes points de chaines ainsi que le classement des meilleurs dresseurs</p>
      <iframe src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.netlify.app" frameborder="0" allowfullscreen="true" scrolling="no" height="756" width="1240"></iframe>
      </>
    )
}

export default HomePage
