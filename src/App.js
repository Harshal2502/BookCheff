import React, { useEffect, useState, useMemo } from 'react';
import { Route, Link, useNavigate, Routes, Router, BrowserRouter } from 'react-router-dom';
import './App.css'
import Entry from './Entry';
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

  const navigate = useNavigate();

  const searchBooks = async (term) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}&offset=${offset}&limit=${limit}`
      );
      const res = await response.json();
      setLoading(false);
      setBooks(res.docs);
    } catch (e) {
      console.log(e)
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <nav style={{ width: "100%", marginBottom: "3%" }} class="navbar navbar-dark navbar-expand-lg subjects">
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

      <h1
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSearchTerm("");
        }}
      >
        BookCheff
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

      {books.length > 0 && (
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

      {err === true && <h2>Oh No! Looks like there's some issue :(</h2>}

      {loading === true && <span style={{ margin: "0% 20%" }} class="loader"></span>}
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
