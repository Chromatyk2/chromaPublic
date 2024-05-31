import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
            })
    }, [])
    return (
        <>
            {profil &&
                <div className={"contentContainer"}>
                    <p className={"pseudoProfil"}>{profil.pseudo}</p>
                    <p className={"pseudoProfil"}>Niveau {profil.level}</p>
                </div>
            }
        </>
    );
}

export default Profil
