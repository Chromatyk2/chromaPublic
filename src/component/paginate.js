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
  const pkmList = props.currentItems;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
  return (
    <>
      <div className="pokemonGlobalContainer">
       {pkmList == [] ? (
         <h1>Loading...</h1>
       ) : (
           pkmList.map((val, key) => {
             return (
               <>
                <Link className="navLink" to={"/pokemon/"+val.pkmId}>
                 <div className="anchorTooltip uniquePokemonContainer" data-tooltip-content={val.pkmName+" - "+moment(val.dateCapture).utc().format('DD/MM/YYYY')}>
                   <div className="infoPkm">
                     {val.nbCapture > 1 ? <div className="infoNbCapture">{val.nbCapture}</div> : <div></div>}
                     {val.shiny == 1 ? <img className="infoShiny" src="https://www.depaul.org/wp-content/uploads/2022/02/DePaul-Shining-Star-Program-Blue-Icon.png"></img> : <div></div>}
                   </div>
                    <img src={val.pkmImage}></img>
                  </div>
                </Link>
              </>
             )
           })
       )}
      <Tooltip anchorSelect=".anchorTooltip" />
     </div>
    </>
  );
}

function Pagination(props) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [pkmListFiltered,setPkmListFiltered] = useState([]);
  const [filtredPokemon, setFiltredPokemon] = useState(props.items);
  const [isSorted, setIsSorted] = useState(false);
  const [currentItems, setCurrentItems] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const hasShiny = props.items.filter(item => item.shiny == 1);
  useEffect(() => {
    setFiltredPokemon(props.items);
    const endOffset = itemOffset + props.itemsPerPage;
    setCurrentItems(filtredPokemon.slice(itemOffset, endOffset))
  }, []);
  function handlePokemon(e) {
    let sort = e.target.value;
    setCurrentItems(null)
    switch (sort){
      case "0" :
        setIsShiny(false);
        var endOffset = itemOffset + props.itemsPerPage;
        if(isSorted === false){
          setCurrentItems(filtredPokemon.sort((a, b) => a.pkmId - b.pkmId).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.sort((a, b) => a.pkmId - b.pkmId))
        }else{
          setCurrentItems(filtredPokemon.sort((a, b) => b.nbCapture - a.nbCapture).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.sort((a, b) => b.nbCapture - a.nbCapture))
        }
        break;
      case "1" :
        setIsShiny(true);
        var endOffset = itemOffset + props.itemsPerPage;
        if(isSorted === false){
          setCurrentItems(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => a.pkmId - b.pkmId).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => a.pkmId - b.pkmId))
        }else{
          setCurrentItems(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => b.nbCapture - a.nbCapture).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => b.nbCapture - a.nbCapture))
        }
        break;
      case "2" :
        setIsSorted(true);
        var endOffset = itemOffset + props.itemsPerPage;
        if(isShiny === false){
          setCurrentItems(filtredPokemon.sort((a, b) => b.nbCapture - a.nbCapture).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.sort((a, b) => b.nbCapture - a.nbCapture))
        }else{
          setCurrentItems(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => b.nbCapture - a.nbCapture).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => b.nbCapture - a.nbCapture))
        }
        break;
      case "3" :
        setIsSorted(false);
        var endOffset = itemOffset + props.itemsPerPage;
        if(isShiny === false){
          setCurrentItems(filtredPokemon.sort((a, b) => a.pkmId - b.pkmId).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.sort((a, b) => a.pkmId - b.pkmId))
        }else{
          setCurrentItems(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => a.pkmId - b.pkmId).slice(itemOffset, endOffset))
          setFiltredPokemon(filtredPokemon.filter(item => item.shiny == 1).sort((a, b) => a.pkmId - b.pkmId))
        }
        break;
      default :
        setFiltredPokemon(props.items);
    }
  }

  const pageCount = Math.ceil(filtredPokemon.length / props.itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event.selected)
  };
  return (
      <>
        {currentItems &&
          <>
            <div className="filtersContainer">
              <p className="filterTitle">Trier</p>
              <button className="filterButton" onClick={handlePokemon} value="0">Tous</button>
              {hasShiny.length > 0 &&
                  <button className="filterButton" onClick={handlePokemon} value="1">Shiny</button>
              }
              {isSorted === false ?
                  <button className="filterButton" onClick={handlePokemon} value="2">Captures décroissantes</button>
                  :
                  <button className="filterButton" onClick={handlePokemon} value="3">Remettre dans l'ordre</button>
              }
            </div>
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
        }
      </>
  );
}

export default Pagination;
