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
  const [myNote, setMyNote] = useState(null);
  useEffect(() => {
    Axios
      .get("/api/getMyNote")
      .then(function(response){
          setMyNote(response.data);
      })
    }, [])
  }
  if (myNote !== null){
    return (
      <>
        <p className="alreadyTraded">{myNote}</p>
      </>
    );
  }
}
export default AllNotes
