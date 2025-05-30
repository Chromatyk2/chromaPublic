import React,{useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios';

function CurrentGameImage(props) {
    const [currentGame, setCurrentGame] = useState(null);
    useEffect(() => {
        const interval = setInterval(
            () =>
                Axios.get('/api/getCurrentGame')
                    .then(function(response){
                        setCurrentGame(response.data[0].image);
                    })
            , 5000
        );
        return () => {
            clearInterval(interval);
        };
    }, [])
    if(currentGame !== null){
        return(
            <img style={{position:"relative",width:"600px",top:"200px"}} src={currentGame} alt=""/>
        )
    }
}
export default CurrentGameImage
