import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {BrowserRouter, Link} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import moment from 'moment';

function Items(props) {
    const [cookies, setCookie] = useCookies(['oauth']);
    const [user, setUser] = useCookies(['user']);
    const [pkmToUpdate, setPkmToUpdate] = useState(props.pkmToUpdate)
    const pkmList = props.currentItems;
    const shinys = pkmList.filter(item => item.shiny == 1);
    const nbShiny = shinys.length;
    const nbTotal = pkmList.length;
    const compagnonList = props.compagnonList;
    const formList = props.pkmList;
    function updateTeam(e) {
        const imgToAdd = e.target.value;
        const id = e.target.id;
        const shiny = e.target.getAttribute("shiny");
        const negative = e.target.getAttribute("negative");
        const pkToUpdate = pkmToUpdate;
        if(pkmToUpdate !== "none"){
            Axios.post('/api/updatePokemonTeam',
                {
                    pkm:pkToUpdate,
                    image:imgToAdd,
                    user:user.user.data[0].login
                }
            )
                .then(function(response){
                    props.change();
                })
        }else{
            props.change(id, shiny, negative);
        }
    }
    console.log(formList)
    return (
        <>
            <div className="pokemonGlobalContainer">
                {pkmList == [] ? (
                    <h1>Loading...</h1>
                ) : (
                    pkmList.map((val, key) => {
                        return (
                            <>
                                <button
                                    onClick={updateTeam}
                                    value={val.pkmImage}
                                    id={val.pkmId}
                                    shiny={val.shiny}
                                    negative={val.negative}
                                    style={{
                                        backgroundImage:"url("+val.pkmImage+")",
                                        height:"100px",
                                        width:"100px",
                                        backgroundRepeat:"no-repeat",
                                        backgroundPosition:"center",
                                        backgroundColor: "rgba(37, 87, 72, .2)",
                                        backgroundSize:"80px",
                                        filter : val.negative === 1 ?  "invert(1)" : "invert(0)"

                                    }}
                                    className={formList.filter((item) => item.form_id == val.pkmId).length > 0 && compagnonList.filter((item) => item.pokemon == formList.filter((item) => item.form_id == val.pkmId)[0].pkm_id && item.level == 100 && item.shiny == val.shiny && item.negative == val.negative).length > 0 ? "maxLevelFrame" : ""}>
                                </button>
                            </>
                        )
                    })
                )}
                <Tooltip anchorSelect=".anchorTooltip" />
            </div>
        </>
    );
}

function PaginationTeam(props) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [pkmListFiltered,setPkmListFiltered] = useState([]);
    const [filtredPokemon, setFiltredPokemon] = useState(props.items);
    const hasShiny = props.items.filter(item => item.shiny == 1);
    useEffect(() => {
        setFiltredPokemon(props.items);
    }, [props.items]);
    function handlePokemon(e) {
        let shiny = e.target.value;
        shiny != 0
            ? setFiltredPokemon(props.items.filter(item => item.shiny == shiny))
            : setFiltredPokemon(props.items);
    }
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + props.itemsPerPage;
    const currentItems = filtredPokemon.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filtredPokemon.length / props.itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.itemsPerPage) % filtredPokemon.length;
        setItemOffset(newOffset);
    };
    function handleState(e,f,g) {
        props.change(e,f,g);
    }
    return (
        <>
            {hasShiny.length > 0 &&
                <div className="filtersContainer">
                    <p className="filterTitle">Trier</p>
                    <button className="filterButton" onClick={handlePokemon} value="0" >Tous</button>
                    <button className="filterButton" onClick={handlePokemon} value="1" >Shiny</button>
                </div>
            }
            <Items pkmList={props.pkmList} compagnonList={props.compagnonList} change={(e,f,g) => handleState(e,f,g)} pkmToUpdate={props.pkmToUpdate} currentItems={currentItems} />
            <ReactPaginate
                className="paginateLay"
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginationTeam;
