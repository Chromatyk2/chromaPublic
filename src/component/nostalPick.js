import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function NostalPick(props) {
  return(
    <>
      <div id="stage" className="content-width">
      	<h1 id="greenTitle">NOSTAL<br/>PICK</h1>
        <h1 id="pinkTitle">NOSTAL<br/>PICK</h1>
        <object style={{position:"absolute",top:"50px",zIndex:"-2",left: "1130px"}} data="télécharger.svg" width="150" height="300"> </object>
        	<ul className="box-list row">
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">1</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">2</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">3</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
            <li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">4</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
            <li className="col-4" id="centerBox">
              <div id="one" className="button2">
                <p className="nbBox">5</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
            <li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">6</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">7</p>
          			<button type="button" className="button2 box closed"></button>
          			<span className="loot-shadow"></span>
              </div>
        		</li>
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">8</p>
          			<button type="button" className="button2 box closed"></button>
          			<span className="loot-shadow"></span>
              </div>
        		</li>
        		<li className="col-4">
              <div id="one" className="button2">
                <p className="nbBox">9</p>
          			<button type="button" className="button2 box closed"></button>
          			<span className="loot-shadow"></span>
              </div>
        		</li>
        	</ul>
          <button id="again" type="button" name="button">Round 2</button>
          <div id="modal-container">
          <div className="modal-background">
            <div style={{overflow:"inherit"}} className="modal">
              <p style={{fontSize:"65px",color:"white"}} className="looseTexte resultTexte">Perdu</p>
              <p style={{fontSize:"65px",color:"green"}} className="100Texte resultTexte">1 Pokemon Random !</p>
              <p style={{fontSize:"65px",color:"purple"}} className="500Texte resultTexte">1 Pokemon Taux shiny x 2 !!</p>
              <p style={{fontSize:"65px",color:"orange"}} className="1000Texte resultTexte">1 Pokemon Légendaire !!!</p>
              <p style={{fontSize:"65px",color:"rgba(0,0,0,0.3)"}} className="rainbow-text 5000Texte resultTexte">1 Pokemon shiny !!!!</p>
              <img id="imgModal" />
              <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
        								<rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                      </svg>
            </div>
          </div>
        </div>
        <audio id="loose">
          <source src="sounds/Loose.mp3" type="audio/mpeg"/>
        </audio>
        <audio id="karateka">
          <source src="sounds/karateka.mp3" type="audio/mpeg"/>
        </audio>
        <audio id="greenWin">
          <source src="sounds/GreenWin.mp3" type="audio/mpeg"/>
        </audio>
        <audio id="blueWin">
          <source src="sounds/BlueWin.mp3" type="audio/mpeg"/>
        </audio>
        <audio id="orangeWin">
          <source src="sounds/OrangeWin.mp3" type="audio/mpeg"/>
        </audio>
        <audio id="rainbowWin">
          <source src="sounds/RainbowWin.mp3" type="audio/mpeg"/>
        </audio>
      </div>
    </>
  )
}
export default NostalPick
