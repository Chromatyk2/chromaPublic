import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'

function LaderBoard() {
    const [laderBoard,setLaderboard] = useState([]);
    function displayNormalLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/0`)
          .then(function(response){
              setLaderboard(response.data);
        })
    }
    function displayShinyLaderboard(e) {
      let shiny = e.target.value;
        Axios
          .get(`https://chromatyk-pokemon.herokuapp.com/api/getLaderboard/1`)
          .then(function(response){
              setLaderboard(response.data);
        })
    }

    const topThree = laderBoard.slice(0,3);
    const others = laderBoard.slice(3);
    console.log(topThree);
    console.log(others);
    return (
      <>
        <div className="CreatePost">
          <div className="uploadPost">
            <button value="0" onClick={displayNormalLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
            <button value="1" onClick={displayShinyLaderboard}><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
            <div className="laderBoardContainer">
              {laderBoard &&
                laderBoard.map((val, key) => {
                  return (
                    <div>

                    </div>
                  )
                })
              }
            </div>
      </>
    )
}

export default LaderBoard
