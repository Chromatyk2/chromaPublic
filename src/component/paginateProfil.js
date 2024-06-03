import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {BrowserRouter, Link} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import moment from 'moment';

function Items(props) {
    const profilList = props.currentItems;
    return (
        <>
            <div className="pokemonGlobalContainer">
                {profilList == [] ? (
                    <h1>Loading...</h1>
                ) : (
                    profilList.map((val, key) => {
                        return (
                            <>
                                <div className={"profilVisualsList"}>
                                    <div className={"profilTeamList"}>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.first_pokemon ?
                                                <img src={val.first_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.second_pokemon ?
                                                <img src={val.second_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.third_pokemon ?
                                                <img src={val.third_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div style={{width: "100px"}} className="anchorTooltip uniquePokemonContainer">
                                            {val.profil_picture ?
                                                <img style={{width: "100%"}}
                                                     src={"/images/Trainers/Trainer" + val.profil_picture + ".png"}/>
                                                :
                                                <img style={{width: "100%"}} src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.fourth_pokemon ?
                                                <img src={val.fourth_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.fifth_pokemon ?
                                                <img src={val.fifth_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                        <div className="anchorTooltip uniquePokemonContainer">
                                            {val.sixth_pokemon ?
                                                <img src={val.sixth_pokemon}/>
                                                :
                                                <img src={"/images/random.png"}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                )}
                <Tooltip anchorSelect=".anchorTooltip"/>
            </div>
        </>
    );
}

function PaginationProfil(props) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + props.itemsPerPage;
    const currentItems = props.items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.itemsPerPage) % props.items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems}/>
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

export default PaginationProfil;
