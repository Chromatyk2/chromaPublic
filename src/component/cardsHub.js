import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from './myCards.js';
import NavBar from "./navbar";
function CardsHub() {
    const [cookies, setCookie] = useCookies();
    return(
        <>
            <NavBar cookies={cookies} />
            <BrowserRouter>
                <Routes>
                    <Route path="/29ct92B3ZrvxGT/mesCartes" element={<MyCards cookies={cookies} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default CardsHub;