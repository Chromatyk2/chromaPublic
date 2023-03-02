import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function LaderBoard() {
    const [laderBoard,setLaderboard] = useState([]);
    function displayNormalLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/${shiny}`)
          .then(function(response){
              setLaderboard(response.data);
        })
    }
    function displayShinyLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/${shiny}`)
          .then(function(response){
              setLaderboard(response.data);
        })
    }
    console.log(laderBoard);
    return (
      <>
        <div className="CreatePost">
          <div className="uploadPost">
            <button value="0" onClick={displayNormalLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
            <button value="1" onClick={displayShinyLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div>
          <ul>
            {laderBoard &&
              laderBoard.map((val, key) => {
                return (
                  <li>
                    {val.pseudo}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>
    )
}

export default LaderBoard
