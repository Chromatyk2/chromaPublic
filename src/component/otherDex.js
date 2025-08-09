import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import {useParams} from "react-router-dom";

function Otherdex(props) {
    const [list,setList] = useState([]);
    const [totalPkm,setTotalPkm] = useState(null);
    const { pseudo } = useParams()
    const [compagnonList,setCompagnonList] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getCompagnonList/" + pseudo)
            .then(function (response) {
                setCompagnonList(response.data);
                Axios
                    .get("/api/getByUser/"+pseudo)
                    .then(function(response){
                        setList(response.data);
                        Axios
                            .get("/api/getTotalPokemon/"+pseudo)
                            .then(function(response){
                                setTotalPkm(response.data[0].totalCapture);
                            })
                    })
            })
    }, [])
    return (
        <>
            {totalPkm &&
                    <PkmList compagnonList={compagnonList} list={list} totalPkm={totalPkm}/>

            }
        </>
    )
}

export default Otherdex
