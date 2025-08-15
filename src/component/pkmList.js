import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
function PkmList(props) {
  const pkmList = props.list;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
  const [cookies, setCookie] = useCookies();
    return (
        <>
            {props.user &&
                    <div className={"linkList"}>
                        <Link style={{width: "50px"}} className="navLink linkFromNav" to={"/pokedex/" + props.user}><img
                        style={{width: "100%"}} src={"/images/pokedex.png"}/></Link>
                        <Link style={{width: "50px"}} className="navLink linkFromNav" to={"/profil/" + props.user}><img
                        style={{width: "100%"}} src={"/images/profil.png"}/></Link>
                        <Link style={{width: "50px"}} className="navLink linkFromNav"
                        to={"/tcg/cartes/" + props.user}><img
                        style={{width: "100%"}} src={"/images/card.png"}/></Link>
                    </div>
            }
            <div className="stats">
                <p className="labelStats">Shiny<br/><span className="valueStats">{nbShiny}</span></p>
                <p className="labelStats">Total<br/><span className="valueStats">{nbTotal}</span></p>
            </div>
            <p style={{textAlign: "center", color: "white"}}>{"Captures totales = " + props.totalPkm}</p>
            <p style={{textAlign: "center", color: "white"}}>Clique sur les Pokémons pour + de détails</p>
            <Pagination
                itemsPerPage={32}
                items={props.list}
                compagnonList={props.compagnonList}
                pkmList={props.pkmList}
            />
        </>
    );
}

export default PkmList
