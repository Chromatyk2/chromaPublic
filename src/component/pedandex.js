import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import $ from 'jquery';

function Pedandex() {
    useEffect(() => {
        var words = $("p").text().split(" ");
        $("p").empty();
        $.each(words, function(i, v) {
            $("p").append($("<span>").text(v));
        });
    }, []);
        return (
            <>
                <div>
                    <p>Ceci est un texte de test pour voir comment ça marche !</p>
                </div>
            </>
        )
}
export default Pedandex
