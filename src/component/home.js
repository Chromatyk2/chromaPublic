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
      <iframe src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.netlify.app" frameborder="0" allowfullscreen="true" scrolling="no" height="756" width="1240"></iframe>
      <a href="https://discord.gg/8V6fyQdSCG">Discord</a>
      </>
    )
}

export default HomePage
