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
      <iframe src="https://player.twitch.tv/?channel=chromatyk&parent=https://chromatyk.netlify.app/" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
      </>
    )
}

export default HomePage
