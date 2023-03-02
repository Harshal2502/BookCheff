import React, { useEffect, useState, useMemo } from "react";
import Navbar from "./Components/Navbar";

function Subject(props) {

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
    }, [props]);

    return (
        <div className="subjectSection">
            
            <Navbar />

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