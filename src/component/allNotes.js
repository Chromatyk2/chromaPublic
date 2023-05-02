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
    if (myNote !== null){
      return (
        <>
          <div className="arrows">
            <img className="arrowImage" src={`/images/slimeBack.png`}></img>
            <p className="myNote">{myNote}</p>
          </div>
        </>
      );
    }
  }
export default AllNotes
