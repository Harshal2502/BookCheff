import React, { useEffect, useState } from "react";
import { Route, Link, useNavigate, Routes, Router, BrowserRouter } from 'react-router-dom';

function Subject(props) {

    const navigate = useNavigate();

    const [allbooks, setAllbooks] = useState([]);
    const [books, setBooks] = useState([]);

    const name = props.name.toLowerCase();

    useEffect(() => {
        setBooks([])
        const fetchData = async () => {
            const response = await fetch(
                `https://openlibrary.org/subjects/${name}.json?details=true`
            );
            const jsonData = await response.json();
            setBooks(jsonData.works.slice(0, 10));
        };
        fetchData();
    }, []);

    return (
        <div className="subjectSection">
            <nav style={{ width: "100%", marginBottom: "3%" }} class="navbar navbar-expand-lg subjects">
                <a class="navbar-brand subjects-title">Popular Subjects</a>
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
            <h1>{props.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>First Published</th>
                        <th>Edition Cout</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => {
                            return <Entry key={book.key} {...book} />;
                        })
                    ) : <span style={{ margin: "40% 140%" }} class="loader"></span>}
                </tbody>
            </table>

        </div>
    )
}

const Entry = (props) => {

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.authors[0].name}</td>
            <td>{props.first_publish_year}</td>
            <td>{props.edition_count}</td>
        </tr>
    )
}

export default Subject;