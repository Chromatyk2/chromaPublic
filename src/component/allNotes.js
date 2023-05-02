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
  const [loading, setLoading] = useState(-3);
  const [size, setSize] = useState(-3);
    useEffect(() => {
      Axios
        .get("/api/getMyNote")
        .then(function(response){
            setMyNote(response.data[0].note);
        })
    }, [])
    useEffect(() => {
      console.log(myNote);
      clearInterval(timer);
      var timer = setInterval(() => {
        if (loading === myNote ) {
          clearInterval(timer);
          return;
        }
        setLoading((prev) => prev + 1);
      }, 100);

      return () => clearInterval(timer);
    }, [loading]);

    useEffect(() => {
      clearInterval(timer);
      var timer = setInterval(() => {
        if (size === 200) {
          clearInterval(timer);
          return;
        }
        setSize((prev) => prev + 1);
      }, 2);

      return () => clearInterval(timer);
    }, [size]);

    if (myNote !== null){
      return (
        <>
          <div style={{width:"fit-content",display:"block",margin:"auto",marginTop:"100px;"}}>
            <p className="owner">CHROMA</p>
            <div style={{boxShadow:"inset 0 0 "+loading*8+"px 0 white, inset 0 0 "+loading*4+"px 0 #0f0,inset 0 0 "+loading*8+"px 0 white, inset 0 0 "+loading*8+"px 0 #f0f, 0 0 "+loading*2+"px 0 #0f0, 0 0 "+loading*4+"px 0 #f0f", height:size+"px", width:size+"px", fontSize:size/2+"px"}} class="c-progress-circle" id="circle" data-percentage={loading}>
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
          </div>
        </>
      );
    }
  }
export default AllNotes
