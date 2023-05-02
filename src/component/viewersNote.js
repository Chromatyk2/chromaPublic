import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function ViewersNote(props) {
  document.getElementById("root").style.background = 'transparent';
  const [myNote, setMyNote] = useState(null);
  const [loading, setLoading] = useState(-3);
  const [size, setSize] = useState(-3);
    useEffect(() => {
      Axios
        .get("/api/getViewersNote")
        .then(function(response){
          var sum = 0;
          response.data.map((val, key) => {
            sum+=val.note;
          });
          setMyNote(sum/response.data.length);
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
        if (size === 600) {
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
            <p className="owner">CHAT</p>
            <div style={{boxShadow:"rgb(255, 0, 255) 0px 0px "+loading*8+"px 40px inset, rgb(0, 255, 0) 0px 0px "+loading*10+"px "+loading+"px,rgb(0, 255, 0) 0px 0px "+loading*10+"px "+loading+"px, rgb(255, 255, 255) "+loading*2+"px "+loading+"px "+loading*40+"px "+loading*5+"px, 0 0 "+loading*2+"px 0 #0f0, 0 0 "+loading*4+"px 0 #f0f, rgb(255, 255, 255) "+loading*2+"px "+loading+"px "+loading*40+"px "+loading*5+"px,rgb(255, 255, 255) "+loading+"px 0px "+loading*2+"px "+loading*14+"px inset", height:"600px", width:"600px", fontSize:size+"px"}} class="c-progress-circle" id="circle" data-percentage={loading}>
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
export default ViewersNote
