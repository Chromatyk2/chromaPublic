import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import ProfilList from "./profilList";

function AllProfils(props) {
    const [allProfil,setAllProfil] = useState([]);
    useEffect(() => {
        Axios
            .get("/api/getAllProfil")
            .then(function(response){
                setAllProfil(response.data);
            })
    }, [])
    return (
        <>
            <div className={"contentContainer"}>
                <ProfilList list={allProfil}/>
            </div>
        </>
    )
}

export default AllProfils
