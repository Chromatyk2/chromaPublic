import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function ProgressBarCard(props) {
    const customStyles = {
    extBar: {
        width: '75%',
        backgroundColor: '#90e5b5',
        position: 'relative',
        zIndex: '-1',
        borderRadius: '50px'
    },
    intBar: {
        width: parseFloat(props.getNb/props.item*100).toFixed(2)+"%",
        position: 'relative',
        background: '#0a3a2c',
        textWrap: 'nowrap',
        color: 'white',
        padding: '15px',
        borderRadius: '50px 0 0 50px'
    },
};

    return (
    <div style={customStyles.extBar} className="fullProgressBar">
        <div style={customStyles.intBar}>{props.getNb+" / "+props.item+"("+parseFloat(props.getNb/props.item*100).toFixed(2)+"%)"}</div>
    </div>
    )
}
export default ProgressBarCard
