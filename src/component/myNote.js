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
  return(
    <form>
      <label>Enter your name:
        <input
          type="number"
          value={name}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
    </form>
  )
}
export default MyNote
