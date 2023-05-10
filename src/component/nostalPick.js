import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";

function NostalPick(props) {
  var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
  var numbers = [1,2,3,4,5,6,7,8,9];
  return(
      <>
        <ul className="box-list">
          {numbers.map((val, key) => {
            var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
            var consoleIndex = consoles.indexOf(uniqueConsole);
            consoles.splice(consoleIndex, 1);
            return (
                  <UniqueBox number={val} console={uniqueConsole}/>
            )
          })}
        </ul>
          <div id="modal-container" className="one out">
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
          <audio id="karateka">
              <source src="sounds/karateka.mp3" type="audio/mpeg"/>
          </audio>
          <audio id="loose">
              <source src="sounds/Loose.mp3" type="audio/mpeg"/>
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
      </>
  )
}
export default NostalPick
