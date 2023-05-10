import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';

function CurrentGameImage(props) {
    const [currentGame, setCurrentGame] = useState(null);
    useEffect(() => {
        Axios.get('/api/getCurrentGame')
            .then(function(response){
                setCurrentGame(response.data);
            })
    }, [])
    if(currentGame !== null){
        return(
            <img src={currentGame} alt=""/>
        )
    }
}
export default CurrentGameImage
