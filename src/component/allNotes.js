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
  $('#root').css('background','transparent');
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
          <p className="alreadyTraded">{myNote}</p>
        </>
      );
    }
  }
export default AllNotes
