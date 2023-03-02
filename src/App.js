import React, { useEffect, useState, useMemo } from 'react';
import { Route, Link, useNavigate, Routes, Router, BrowserRouter } from 'react-router-dom';
import './App.css'
import Entry from './Components/Entry';
import Navbar from './Components/Navbar';
import searchIcon from './search.svg';
import _debounce from 'lodash/debounce';
import Subject from './Subject';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  const searchBooks = async (term) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}&offset=${offset}&limit=${limit}`
      );
      const res = await response.json();
      setLoading(false);
      setErr(false)
      res.numFound !== 0 ? setBooks(res.docs) : setErr(true)
    } catch (e) {
      console.log(e)
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <Navbar />

      <h1
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSearchTerm("");
        }}
      >
        BookChef
      </h1>
      <h4 style={{ color: "dimgray" }}>Your personal library of books</h4>

      <div className="search">
        <input
          placeholder="Search for books by title, author.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => {
            searchBooks(searchTerm);
          }}
        />
      </div>


      {/* BOOKS TABLE */}

      {err === true && loading === false && <h2>Oh No! Looks like there's some issue :(</h2>}
      {loading === true && <span style={{ margin: "0% 20%" }} class="loader"></span>}

      {books.length > 0 && loading === false && err === false && (
        <table style={{ margin: "3% auto" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>First Published</th>
              <th>Edition Cout</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return <Entry key={book.key} {...book} />;
            })}
          </tbody>
        </table>)}

    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/physics" element={<Subject name='PHYSICS' />} />
        <Route path="/maths" element={<Subject name='MATHEMATICS' />} />
        <Route path="/philosophy" element={<Subject name='PHILOSOPHY' />} />
        <Route path="/history" element={<Subject name='HISTORY' />} />
        <Route path="/sanskrit" element={<Subject name='SANSKRIT' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
