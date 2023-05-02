import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function AllNotes(props) {
  document.getElementById("root").style.background = 'transparent';
  const [myNote, setMyNote] = useState(null);
  useEffect(() => {
    Axios
      .get("/api/getMyNote")
      .then(function(response){
          console.log(response);
          setMyNote(response.data[0].note);
      })
    }, [])
    var progressCircles = document.querySelectorAll('.c-progress-circle');

setTimeout(function(){
  for(var i=0; i < progressCircles.length; i++) {
    var circle = progressCircles[i],
        val = Number(circle.getAttribute('data-percentage')),
        bar = circle.querySelectorAll('.c-progress-circle__bar')[0];

    if (isNaN(val)) {
      val = 100;
    }
        else {
          var r = bar.getAttribute('r');
          var c = Math.PI*(r*2);

          if (val < 0) { val = 0;}
          if (val > 100) { val = 100;}

          var pct = ((100-val)/100)*c;

          bar.style.strokeDashoffset = pct;
          bar.setAttribute('data-percentage', val);
        }
      }
    }, 500);
    if (myNote !== null){
      return (
        <>
          <div class="c-progress-circle" id="circle" data-percentage="44">
            <svg class="c-progress-circle__svg">
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stop-color="#71b0ff" />
                  <stop offset="100%" stop-color="#8c6cff" />
                </linearGradient>
              </defs>
              <circle class="c-progress-circle__bar" r="90" cx="50%" cy="50%" stroke="url(#gradient)"></circle>
            </svg>
          </div>
          <div className="allNotesContainer">
            <div className="myNoteContainer">
              <p className="myNoteText">Chroma</p>
              <p className="myNote">{myNote}</p>
            </div>
            <div className="viewersNoteContainer">
              <p className="myNoteText">Chat</p>
              <p className="myNote">1</p>
            </div>
          </div>
        </>
      );
    }
  }
export default AllNotes
