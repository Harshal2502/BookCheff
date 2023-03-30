import React from "react";
import { Route, Link, useNavigate, Routes, Router, BrowserRouter } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <nav style={{ width: "100%"}} class="navbar navbar-dark navbar-expand-lg subjects">
            <a class="navbar-brand subjects-title" onClick={() => navigate('/')}>Popular Subjects</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item subject physics" onClick={() => navigate('/physics')}>
                        <a class="nav-link subject-name">Physics</a>
                    </li>
                    <li class="nav-item subject maths" onClick={() => navigate('/maths')}>
                        <a class="nav-link subject-name">Mathematics</a>
                    </li>
                    <li class="nav-item subject philosophy" onClick={() => navigate('/philosophy')}>
                        <a style={{ color: "#1D3557" }} class="nav-link">Philosophy</a>
                    </li>
                    <li class="nav-item subject history" onClick={() => navigate('/history')}>
                        <a class="nav-link subject-name">History</a>
                    </li>
                    <li class="nav-item subject sanskrit" onClick={() => navigate('/sanskrit')}>
                        <a class="nav-link subject-name">Sanskrit</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;