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
        backgroundColor: 'rgb(116, 251, 207)',
        position: 'relative',
        zIndex: '1',
        borderRadius: '50px',
        margin:'auto',
        marginBottom: '15px'
    },
    intBar: {
        width: parseFloat(props.getNb/props.item*100).toFixed(2)+"%",
        position: 'relative',
        background: 'rgb(252, 114, 161)',
        textWrap: 'nowrap',
        color: 'black',
        padding: '15px',
        borderRadius: '50px 50px 50px 50px'
    },
};

    return (
    <div style={customStyles.extBar} className="fullProgressBar">
        <div style={customStyles.intBar}>{props.getNb+" / "+props.item+"("+parseFloat(props.getNb/props.item*100).toFixed(2)+"%)"}</div>
    </div>
    )
}
export default ProgressBarCard
