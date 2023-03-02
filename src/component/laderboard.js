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
        <div class="center">
          <div class="top3">
            <div class="two item">
              <div class="pos">
                2
              </div>
              <div class="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/men/44.jpg&#39;)"></div>
              <div class="name">
                Edgar Soto
              </div>
              <div class="score">
                6453
              </div>
            </div>
            <div class="one item">
              <div class="pos">
                1
              </div>
              <div class="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/men/31.jpg&#39;)"></div>
              <div class="name">
                Clifford James
              </div>
              <div class="score">
                6794
              </div>
            </div>
            <div class="three item">
              <div class="pos">
                3
              </div>
              <div class="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/women/91.jpg&#39;)"></div>
              <div class="name">
                Nevaeh Silva
              </div>
              <div class="score">
                6034
              </div>
            </div>
          </div>
        </div>

              // {laderBoard &&
              //   laderBoard.map((val, key) => {
              //     return (
              //       <div>
              //
              //       </div>
              //     )
              //   })
              // }
      </>
    )
}

export default LaderBoard
