import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';
import $ from 'jquery';

var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
function checkOpen() {
  var allBoxes = $('.box-list li button');
  var allOpenBoxes = $('.box-list li button.open');
  var allBoxesAreOpen = (allBoxes.length === allOpenBoxes.length);

  if(allBoxesAreOpen)
    {
      $('#again').show();
    }
}
$('.box-list li').on('click', '.box', function (){
  $('audio#karateka')[0].play()
  $('.looseTexte').css('display','none');
  $('.100Texte').css('display','none');
  $('.500Texte').css('display','none');
  $('.1000Texte').css('display','none');
  $('.5000Texte').css('display','none');
  $('#containerGlobal').removeClass('shakeGreen');
  $('#containerGlobal').removeClass('shakeBlue');
  $('#containerGlobal').removeClass('shakeOrange');
  $('#containerGlobal').removeClass('shakeRainbow');
  $("#containerGlobal").animate({backgroundColor:'rgba(0,0,0,0.8)'}, 1500);
  function getNumber(selectedConsole) {
    var numbers = [];
    if(selectedConsole == "DREAMCAST"){
      var max = 77
    }
    if(selectedConsole == "GB"){
      var max = 432
    }
    if(selectedConsole == "GBA"){
      var max = 424
    }
    if(selectedConsole == "GBC"){
      var max = 233
    }
    if(selectedConsole == "MASTER SYSTEM"){
      var max = 194
    }
    if(selectedConsole == "MEGADRIVE"){
      var max = 400
    }
    if(selectedConsole == "N64"){
      var max = 133
    }
    if(selectedConsole == "NDS"){
      var max = 488
    }
    if(selectedConsole == "NES"){
      var max = 280
    }
    if(selectedConsole == "NGC"){
      var max = 234
    }
    if(selectedConsole == "PS1"){
      var max = 147
    }
    if(selectedConsole == "PSP"){
      var max = 286
    }
    if(selectedConsole == "SNES"){
      var max = 458
    }
    return Math.floor((Math.random() * max) + 1);
  }
  function getConsole() {
      var selectedConsole = consoles[Math.floor(Math.random()*consoles.length)]
      var consoleIndex = consoles.indexOf(selectedConsole);
      consoles.splice(consoleIndex, 1);
      return selectedConsole;
  }
  setTimeout(function (){
    var selectedConsole = getConsole();
    console.log(selectedConsole);
    var number = getNumber(selectedConsole);
    $('#imgModal').attr("src","Images/"+selectedConsole+"/Jaquette ("+number+").png");
    var cookieArray = localStorage.getItem("array100").split(/,/);
    cookieArray.splice(cookieArray.indexOf(number), 1);
    localStorage.setItem("array100",cookieArray);
  },0)
  var box = $(this);
  box.parent(".button2").parent(".box-list li").attr('checked','checked');
  if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
        $("[checked=checked]").animate({"top": $("#centerBox").position().top, "left": $("#centerBox").position().left}, 1500);
  }else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
      $("[checked=checked]").animate({"top": "-200px", "left": "-250px"}, 1500);
  }else if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)){
    $("[checked=checked]").animate({"top": "200px"}, 1500);
  }else if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)){
    $("[checked=checked]").animate({"top": "200px", "left":"-250px"}, 1500);
  }else if(($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
    $("[checked=checked]").animate({"left":"250px"}, 1500);
  }else if(($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)){
    $("[checked=checked]").animate({"left":"-250px"}, 1500);
  }else if(($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
    $("[checked=checked]").animate({"top":"-200px","left":"250px"}, 1500);
  }else if(($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)){
    $("[checked=checked]").animate({"top":"-200px"}, 1500);
  }
  var others = $('.box-list li').not($("[checked=checked],[alreadyopen=alreadyopen]"));
  others.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 1500);
  if(box.hasClass('open'))
    {
      return;
    }
  setTimeout(function (){
    let rare = Math.floor((Math.random() * 100) + 1);
    $(box).animate(
      { deg: 360 },
      {
        duration: 500,
        step: function(now) {
          $(this).css({ transform: 'rotate(' + now + 'deg)' });
        }
      }
    );
    if(rare <= 99){
      let epic = Math.floor((Math.random() * 2) + 1);
      setTimeout(function (){
        $(box).toggleClass("rareBox");
        $('#containerGlobal').toggleClass('shakeGreen');
      },1000);
      setTimeout(function (){
        $(box).animate(
          { deg: 1440 },
          {
            duration: 500,
            step: function(now) {
              $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
          }
        );
      },2000);
      if(epic == 1){
        let legendary = Math.floor((Math.random() * 5) + 1);;
        setTimeout(function (){
          $(box).removeClass('rareBox'),
          $(box).toggleClass("epicBox"),
          $('#containerGlobal').toggleClass('shakeBlue');
          $(box).toggleClass('shakeBlue');
          $(box).toggleClass('shakeBlue');
        },3000);
        setTimeout(function (){
          $(box).animate(
            { deg: 2880 },
            {
              duration: 500,
              step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
              }
            }
          );
        },4000);
        if(legendary == 1){
          let ultra = Math.floor((Math.random() * 10) + 1);
          setTimeout(function (){
            $(box).removeClass('epicBox'),
            $(box).toggleClass("legendaryBox"),
            $('#containerGlobal').toggleClass('shakeOrange');
            $(box).toggleClass('shakeOrange');
            $(box).toggleClass('shakeOrange');
          },5000);
          setTimeout(function (){
            $(box).animate(
              { deg: 11520 },
              {
                duration: 3000,
                step: function(now) {
                  $(this).css({ transform: 'rotate(' + now + 'deg)' });
                }
              }
            );
          },6000);
          if(ultra == 1){
            $('.5000Texte').css('display','block');
          setTimeout(function (){
            $(box).removeClass('legendaryBox'),
            $(box).toggleClass("ultraBox"),
            $('#containerGlobal').toggleClass('shakeRainbow');
            $(box).toggleClass('shakeRainbow');
            $(box).toggleClass('shakeRainbow');
          },10000);
          setTimeout(function (){
          $('audio#rainbowWin')[0].play()
            box.removeClass('click');
            box.toggleClass('closed open');
            checkOpen();
          }, 10501);
          setTimeout(function (){
            $('#modal-container').removeAttr('class').addClass("one");
            $('audio#karateka')[0].pause()
            $('audio#karateka')[0].currentTime = 0
          },10502);
          }else{
            $('.1000Texte').css('display','block');
            setTimeout(function (){
              box.removeClass('click');
              box.toggleClass('closed open');
              checkOpen();
            }, 10501);
            setTimeout(function (){
              $('#modal-container').removeAttr('class').addClass("one");
              $('audio#orangeWin')[0].play()
              $('audio#karateka')[0].pause()
              $('audio#karateka')[0].currentTime = 0
            },10502);
          };
        }else{
          $('.500Texte').css('display','block');
          setTimeout(function (){
            box.removeClass('click');
            box.toggleClass('closed open');
            checkOpen();
          }, 4501);
          setTimeout(function (){
            $('#modal-container').removeAttr('class').addClass("one");
            $('audio#blueWin')[0].play()
            $('audio#karateka')[0].pause()
            $('audio#karateka')[0].currentTime = 0
          },4502);
        };
      }else{
        $('.100Texte').css('display','block');
        setTimeout(function (){
          box.removeClass('click');
          box.toggleClass('closed open');
          checkOpen();
        }, 2501);
        setTimeout(function (){
          $('#modal-container').removeAttr('class').addClass("one");
          $('audio#greenWin')[0].play()
          $('audio#karateka')[0].pause()
          $('audio#karateka')[0].currentTime = 0
        },2502);
      };
    }else{
      $('.looseTexte').css('display','block');
      setTimeout(function (){
        box.removeClass('click');
        box.toggleClass('closed open');
        checkOpen();
      }, 501);
      setTimeout(function (){
        $('#modal-container').removeAttr('class').addClass("one");
        $('audio#loose')[0].play()
        $('audio#karateka')[0].pause()
        $('audio#karateka')[0].currentTime = 0
      },502);
    };
  },1501);
});
function NostalPick(props) {
  return(
    <>
      <div style={{backgroundImage:"url(/images/thumb-1920-950765.png)"}} id="backgroundGlobal"></div>
      <div id="stage" className="content-width">
      	<h1 id="greenTitle">NOSTAL<br/>PICK</h1>
        <h1 id="pinkTitle">NOSTAL<br/>PICK</h1>
        <object style={{position:"absolute",top:"50px",zIndex:"-2",left: "1130px"}} data="télécharger.svg" width="150" height="300"> </object>
        	<ul className="box-list row">
        		<li onClick={PickBox} className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">1</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
        		<li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">2</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
        		<li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">3</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
        		</li>
            <li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">4</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
            <li className="col-4 uniqueBox" id="centerBox">
              <div id="one" className="button2">
                <p className="nbBox">5</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
            <li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">6</p>
          			<button type="button" className="button2 box closed"></button>
              </div>
            </li>
        		<li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">7</p>
          			<button type="button" className="button2 box closed"></button>
          			<span className="loot-shadow"></span>
              </div>
        		</li>
        		<li className="col-4 uniqueBox">
              <div id="one" className="button2">
                <p className="nbBox">8</p>
          			<button type="button" className="button2 box closed"></button>
          			<span className="loot-shadow"></span>
              </div>
        		</li>
        		<li className="col-4 uniqueBox">
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
