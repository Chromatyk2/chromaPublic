import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from '../Pagination';
import '../App.css'

function PkmList(props) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  
  const pkmList = props.list;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
    return (
      <>

        <div className="stats">
          <p className="labelStats">Shiny : <span className="valueStats">{nbShiny}</span></p>
          <p className="labelStats">Total : <span className="valueStats">{nbTotal}</span></p>
        </div>
        <div className="pokemonGlobalContainer">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={props.list.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
             {pkmList == [] ? (
               <h1>Loading...</h1>
             ) : (
                 pkmList.map((val, key) => {
                   return (
                     <div className="uniquePokemonContainer">
                       <div className="infoPkm">
                         {val.nbCapture > 1 ? <div className="infoNbCapture">{val.nbCapture}</div> : <div></div>}
                         {val.shiny == 1 ? <img className="infoShiny" src="https://www.depaul.org/wp-content/uploads/2022/02/DePaul-Shining-Star-Program-Blue-Icon.png"></img> : <div></div>}
                       </div>
                        <img src={val.pkmImage}></img>
                    </div>
                   )
                 })
             )}
          </div>
        </>
     );
}


export default PkmList
