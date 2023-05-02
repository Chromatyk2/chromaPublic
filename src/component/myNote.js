import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function MyNote(props) {
  const [note, setNote] = useState(0);
  function handleSubmit() {
    const idMainCapture = parseInt(e.target.value);
    setDisable(true);
    return Axios.post('/api/chromaGuess',
    {
      note:note
    }
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}
export default MyNote
