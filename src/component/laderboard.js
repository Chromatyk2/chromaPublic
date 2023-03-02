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
        {topThree.legnth > 0 &&
          <div className="center">
            <div className="top3">
              <div className="two item">
                <div className="pos">
                  2
                </div>
                <div className="pic"></div>
                <div className="name">
                  {topThree[1].pseudo}
                </div>
                <div className="score">
                  {topThree[1].nbCapture}
                </div>
              </div>
              <div className="one item">
                <div className="pos">
                  1
                </div>
                <div className="pic"></div>
                <div className="name">
                  {topThree[0].pseudo}
                </div>
                <div className="score">
                  {topThree[0].nbCapture}
                </div>
              </div>
              <div className="three item">
                <div className="pos">
                  3
                </div>
                <div className="pic"></div>
                <div className="name">
                  {topThree[2].pseudo}
                </div>
                <div className="score">
                  {topThree[2].pseudo}
                </div>
              </div>
            </div>
          </div>
        }        
      </>
    )
}

export default LaderBoard
