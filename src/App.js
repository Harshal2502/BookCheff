import React, { useEffect, useState, useMemo } from "react";
import {
  Route,
  Link,
  useNavigate,
  Routes,
  Router,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Entry from "./Components/Entry";
import Navbar from "./Components/Navbar";
import searchIcon from "./search.svg";
import Subject from "./Subject";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const memoizedBooks = useMemo(() => books, [books]);

  useEffect(() => {
    searchBooks();
  }, [offset]);

  const searchBooks = async (term) => {
    if (searchTerm === "") return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchTerm}&offset=${offset}&limit=10`
      );
      const res = await response.json();

      setLoading(false);
      setErr(false);
      setTotalPages(Math.ceil(res.numFound / 10));
      res.numFound !== 0 ? setBooks(res.docs) : setErr(true);
    } catch (e) {
      console.log(e);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1
              class="mx-auto "
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => {
                setSearchTerm("");
                setBooks([]);
              }}
            >
              BookCheff
            </h1>
            <h4
              class="mx-auto"
              style={{ color: "dimgray", textAlign: "center" }}
            >
              Your personal library of books
            </h4>
          </div>
          <div class="col-12">
            <div className="search w-100">
              <input
                class="mx-auto"
                placeholder="Search for books by title, author.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    searchBooks(setSearchTerm);
                    setPage(1);
                    setOffset(0);
                  }
                }}
              />
              {searchTerm !== "" && (
                <button
                  style={{ marginRight: "2%" }}
                  onClick={() => {
                    setSearchTerm("");
                    setBooks([]);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              )}
              <img
                src={searchIcon}
                alt="search"
                onClick={() => {
                  searchBooks(searchTerm);
                  setOffset(0);
                  setPage(1);
                  setBooks([]);
                }}
              />
            </div>
          </div>
        </div>

        {/* BOOKS TABLE */}

        {err === true && loading === false && searchTerm !== "" && (
          <h2>Oh No! Looks like there's some issue :(</h2>
        )}
        {loading === true && (
          <span style={{ margin: "0% 20%" }} class="loader"></span>
        )}
        {memoizedBooks.length > 0 && loading === false && err === false && (
          <div>
            <div class="row">
              <div class="col">
                <table class="table table-bordered table-responsive">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>First Published</th>
                      <th>Edition Cout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memoizedBooks.map((book) => {
                      return <Entry key={book.key} {...book} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-center mb-4">
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                      setOffset(offset - 10);
                    }
                  }}
                >
                  PREV
                </button>
                <span class="p-1">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => {
                    if (page < totalPages) {
                      setPage(page + 1);
                      setOffset(offset + 10);
                    }
                  }}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/physics" element={<Subject name="Physics" />} />
        <Route path="/maths" element={<Subject name="Mathematics" />} />
        <Route path="/philosophy" element={<Subject name="Philosophy" />} />
        <Route path="/history" element={<Subject name="History" />} />
        <Route path="/sanskrit" element={<Subject name="Sanskrit" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
