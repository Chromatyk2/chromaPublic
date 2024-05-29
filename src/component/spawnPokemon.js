import React from 'react';
import Pagination from './paginate.js';
import '../App.css'
function SpawnPokemon(props) {
    const pkmList = props.list;
    const shinys = pkmList.filter(item => item.shiny == 1);
    const nbShiny = shinys.length;
    const nbTotal = pkmList.length;
    return (
        <>
            <div className="pokeball"></div>
        </>
    );
}

export default SpawnPokemon
