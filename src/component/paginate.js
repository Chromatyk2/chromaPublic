import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

function Items(props) {
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
                 <div className="uniquePokemonContainer">
                   <div className="infoPkm">
                     {val.nbCapture > 1 ? <div className="infoNbCapture">{val.nbCapture}</div> : <div></div>}
                     {val.shiny == 1 ? <img className="infoShiny" src="https://www.depaul.org/wp-content/uploads/2022/02/DePaul-Shining-Star-Program-Blue-Icon.png"></img> : <div></div>}
                   </div>
                    <img src={val.pkmImage}></img>
                </div>
              </>
             )
           })
       )}
     </div>
    </>
  );
}

function Pagination(props) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  var pkmList = props.items.filter(item => item.shiny == 1);
  // const shinyTri = () => {
  //   pkmList = pkmList.filter(item => item.shiny == 1);
  // };
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + props.itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = pkmList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(pkmList.length / props.itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % pkmList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
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
