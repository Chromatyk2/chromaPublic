import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function LaderBoard() {
    const [laderBoard,seladerboard] = useState([]);
    function displayNormalLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/${shiny}`)
          .then(function(response){
              seladerboard(response.data);
        })
    }
    function displayShinyLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/${shiny}`)
          .then(function(response){
              seladerboard(response.data);
        })
    }
    return (
      <>
        <div className="CreatePost">
          <div className="uploadPost">
            <button className="buttonPseudo" value="0" onClick={displayNormalLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
            <button className="buttonPseudo" value="1" onClick={displayShinyLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div>
          <ul>
            {laderboard &&
              laderboard.map((val, key) => {
                <li>
                  {val.pseudo}
                </li>
                )
              })
            }
          <ul>
        </div>
      </>
    )
}

export default LaderBoard
