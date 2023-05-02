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
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    Axios
      .get("/api/getMyNote")
      .then(function(response){
          setMyNote(response.data[0].note);
          var i = 0;
      })
    }, [])
    useEffect(() => {
      const interval = setInterval(() => {
        while(loading < myNote){
          setLoading((loading) => loading + 1);          
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);
    if (myNote !== null){
      return (
        <>
          <div class="c-progress-circle" id="circle" data-percentage={loading}>
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
