import React,{useState, useEffect} from 'react';
import '../App.css';
import BangerBox from "./BangerBox";
import $ from 'jquery';

function BangerOverlay(props) {
  var consoles = ["GBA","GBC","GB","MEGADRIVE","MasterSystem","N64","NDS","NGC","PS1","PSP","NES","SNES"];
  var numbers = [1,2,3,4,5,6,7,8,9];
    function displayModal(e) {
        $('audio#loose')[0].pause();
        $('audio#loose')[0].currentTime = 0;
        $('audio#greenWin')[0].pause();
        $('audio#greenWin')[0].currentTime = 0;
        $('audio#blueWin')[0].pause();
        $('audio#blueWin')[0].currentTime = 0;
        $('audio#orangeWin')[0].pause();
        $('audio#orangeWin')[0].currentTime = 0;
        $('audio#rainbowWin')[0].pause();
        $('audio#rainbowWin')[0].currentTime = 0;
        $('#containerGlobal').css("background-color","rgba(0,0,0,0)");
        var others = $('.box-list li').not($("[checked=checked],[alreadyopen=alreadyopen]"));
        others.css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 1500);
        $('[alreadyopen]').css("visibility","hidden")
        $('[alreadyopen]').css("top","0")
        $('[alreadyopen]').css("left","0")
        $("[checked=checked]").css("visibility","hidden");
        $("[checked=checked]").attr("alreadyopen","alreadyopen");
        $("[checked=checked]").removeAttr("checked");
        $('.one').addClass('out');
        $('body').removeClass('modal-active');
    };
      var uniqueConsole = consoles[Math.floor(Math.random()*consoles.length)];
      var consoleIndex = consoles.indexOf(uniqueConsole);
  return(
      <>
        <ul className="box-list">
          <BangerBox number={1} console={uniqueConsole}/>
        </ul>
          <div onClick={displayModal} id="modal-container" className="one out">
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
export default BangerOverlay
