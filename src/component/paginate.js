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
  const hasShiny = props.items.filter(item => item.shiny == 1);
  useEffect(() => {
    setFiltredPokemon(props.items);
    const endOffset = itemOffset + props.itemsPerPage;
    setCurrentItems(filtredPokemon.slice(itemOffset, endOffset))
  }, [props.items]);
  function handlePokemon(e) {
    let sort = e.target.value;
    switch (sort){
      case "0" :
        setFiltredPokemon(props.items);
        break;
      case "1" :
        setFiltredPokemon(props.items.filter(item => item.shiny == 1));
        break;
      case "2" :
        setIsSorted(true);
        break;
      default :
        setFiltredPokemon(props.items);
    }
  }

  const pageCount = Math.ceil(filtredPokemon.length / props.itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % filtredPokemon.length;
    setItemOffset(newOffset);
  };

  return (
    <>

          <div className="filtersContainer">
            <p className="filterTitle">Trier</p>
            <button className="filterButton" onClick={handlePokemon} value="0">Tous</button>
            {hasShiny.length > 0 &&
              <button className="filterButton" onClick={handlePokemon} value="1">Shiny</button>
            }
            <button className="filterButton" onClick={handlePokemon} value="2">Captures décroissantes</button>
          </div>
      {isSorted === false ?
          <Items currentItems={currentItems}/>
      :
          <Items currentItems={currentItems.sort((a, b) => b.nbCapture - a.nbCapture)}/>
      }
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

export default Pagination;
