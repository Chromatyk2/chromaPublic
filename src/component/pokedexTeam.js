import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmListTeam from './pkmListTeam.js'

function PokedexTeam(props) {
    const [compagnonList,setCompagnonList] = useState(null);
    function handleState(e,f) {
        props.change(e,f);
    }

    useEffect(() => {
        Axios
            .get("/api/getCompagnonList/" + props.pseudo)
            .then(function (response) {
                setCompagnonList(response.data);
            })
    }, [])
    return (
        <>
            {compagnonList &&
                    <PkmListTeam compagnonList={compagnonList} change={(e, f) => handleState(e, f)}
                                 pkmToUpdate={props.pkmToUpdate} list={props.list}/>
            }
        </>
    )
}

export default PokedexTeam