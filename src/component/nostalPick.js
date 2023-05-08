import React,{useState, useEffect} from 'react';
import { useParams,BrowserRouter, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function NostalPick(props) {
    return(
      <>
        <div id="backgroundGlobal"></div>
        <div id="containerGlobal" style="height:100vh" class="container-fluid">
        <div id="odds">
          <p style="font-weight:bold;text-align:center">Taux :</p>
          <p style="font-weight:bold;color:green">Rare : 75% (1 Pokemon Random)</p>
          <p style="font-weight:bold;color:purple">Epic : 25% (1 Pokemon Taux Shiny x 2)</p>
          <p style="font-weight:bold;color:orange">Légendaire : 5% (1 Pokemon Légendaire)</p>
          <p class="rainbow-text" style="font-weight:bold;color:rgba(0,0,0,0.3)">Mythique : 0.5% (1 Pokemon Shiny)</p>
        </div>
        <div id="stage" class="content-width">
          <h1 id="greenTitle">NOSTAL<br/>PICK</h1>
          <h1 id="pinkTitle">NOSTAL<br/>PICK</h1>
          <object style="position:absolute;top:50px;z-index:-2;left: 1130px;" data="télécharger.svg" width="150" height="300"> </object>
            <ul class="box-list row">
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">1</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">2</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">3</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">4</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4" id="centerBox">
                <div id="one" class="button2">
                  <p class="nbBox">5</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">6</p>
                  <button type="button" class="button2 box closed"></button>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">7</p>
                  <button type="button" class="button2 box closed"></button>
                  <span class="loot-shadow"></span>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">8</p>
                  <button type="button" class="button2 box closed"></button>
                  <span class="loot-shadow"></span>
                </div>
              </li>
              <li class="col-4">
                <div id="one" class="button2">
                  <p class="nbBox">9</p>
                  <button type="button" class="button2 box closed"></button>
                  <span class="loot-shadow"></span>
                </div>
              </li>
            </ul>
            <button id="again" type="button" name="button">Round 2</button>
            <div id="modal-container">
            <div class="modal-background">
              <div style="overflow:inherit" class="modal">
                <p style="font-size:65px;color:white " class="looseTexte resultTexte">Perdu</p>
                <p style="font-size:65px;color:green " class="100Texte resultTexte">1 Pokemon Random !</p>
                <p style="font-size:65px;color:purple " class="500Texte resultTexte">1 Pokemon Taux shiny x 2 !!</p>
                <p style="font-size:65px;color:orange " class="1000Texte resultTexte">1 Pokemon Légendaire !!!</p>
                <p style="font-size:65px;color:rgba(0,0,0,0.3) " class="rainbow-text 5000Texte resultTexte">1 Pokemon shiny !!!!</p>
                <img id="imgModal" />
                <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                          <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                        </svg>
              </div>
            </div>
          </div>
          <audio id="loose">
            <source src="sounds/Loose.mp3" type="audio/mpeg" />
          </audio>
          <audio id="karateka">
            <source src="sounds/karateka.mp3" type="audio/mpeg" />
          </audio>
          <audio id="greenWin">
            <source src="sounds/GreenWin.mp3" type="audio/mpeg" />
          </audio>
          <audio id="blueWin">
            <source src="sounds/BlueWin.mp3" type="audio/mpeg" />
          </audio>
          <audio id="orangeWin">
            <source src="sounds/OrangeWin.mp3" type="audio/mpeg" />
          </audio>
          <audio id="rainbowWin">
            <source src="sounds/RainbowWin.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </>
    )
}
export default nostalPick
