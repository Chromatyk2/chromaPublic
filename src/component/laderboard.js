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
            <button value="0" onClick={displayNormalLaderboard}><i className="fa-solid fa-magnifying-glass"></i></button>
            <button value="1" onClick={displayShinyLaderboard}><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div>
          <div className="top3">
            <div className="two item">
              <div className="pos">
                2
              </div>
              <div className="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/men/44.jpg&#39;)"></div>
              <div className="name">
                Edgar Soto
              </div>
              <div className="score">
                6453
              </div>
            </div>
            <div className="one item">
              <div className="pos">
                1
              </div>
              <div className="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/men/31.jpg&#39;)"></div>
              <div className="name">
                Clifford James
              </div>
              <div className="score">
                6794
              </div>
            </div>
            <div className="three item">
              <div className="pos">
                3
              </div>
              <div className="pic" style="background-image: url(&#39;https://randomuser.me/api/portraits/women/91.jpg&#39;)"></div>
              <div className="name">
                Nevaeh Silva
              </div>
              <div className="score">
                6034
              </div>
            </div>
          </div>
        </div>
      </>    
    )
}

export default LaderBoard
