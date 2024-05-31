import React, {useEffect, useState} from 'react';
import '../App.css'
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    return (
        <>
            <div className={"contentContainer"}>
                <p className={"pseudoProfil"}>{pseudo}</p>
            </div>
        </>
    );
}

export default Profil
