import { useState } from "react";
import {
Search,
BookOpen,
Calendar,
UserRound,
RefreshCw,
Sparkles,
} from "lucide-react";

import PageLayout from "./PageLayout";
import "./findBook.css";

function FindBook({ setCurrentPage }) {
const [query, setQuery] = useState("");
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [searched, setSearched] = useState(false);

async function searchBooks(event) {
event.preventDefault();
const searchTerm = query.trim();

if (!searchTerm) {
  setError("Please enter a book title or author's name.");
  setBooks([]);
  setSearched(false);
  return;
}

setLoading(true);
setError("");
setSearched(true);

try {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      searchTerm
    )}&limit=24`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch books.");
  }

  const data = await response.json();

  const formattedBooks = (data.docs || []).map((book, index) => ({
    id: book.key || `${book.title}-${index}`,
    title: book.title || "Untitled",
    author: book.author_name?.[0] || "Unknown Author",
    year: book.first_publish_year || "Not available",
    cover: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "",
    subjects: book.subject?.slice(0, 3) || [],
  }));

  setBooks(formattedBooks);

  if (formattedBooks.length === 0) {
    setError("No books found. Try another title or author's name.");
  }
} catch {
  setBooks([]);
  setError(
    "Unable to load books. Please check your internet connection and try again."
  );
} finally {
  setLoading(false);
}


}

async function searchPopularBooks() {
setQuery("science");
setLoading(true);
setError("");
setSearched(true);
try {
  const response = await fetch(
    "https://openlibrary.org/search.json?q=popular+science&limit=12"
  );

  if (!response.ok) {
    throw new Error("Unable to fetch books.");
  }

  const data = await response.json();

  const formattedBooks = (data.docs || []).map((book, index) => ({
    id: book.key || `${book.title}-${index}`,
    title: book.title || "Untitled",
    author: book.author_name?.[0] || "Unknown Author",
    year: book.first_publish_year || "Not available",
    cover: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "",
    subjects: book.subject?.slice(0, 3) || [],
  }));

  setBooks(formattedBooks);

  if (formattedBooks.length === 0) {
    setError("No books found. Please try again.");
  }
} catch {
  setBooks([]);
  setError(
    "Unable to load books. Please check your internet connection and try again."
  );
} finally {
  setLoading(false);
}


}

return ( <PageLayout
   title="Find Book"
   description="Discover your next favorite book from around the world."
   currentPage="findBook"
   setCurrentPage={setCurrentPage}
 > <div className="find-book-page"> <section className="find-book-hero"> <div className="find-book-hero-content"> <span className="find-book-eyebrow"> <Sparkles size={15} />
YOUR NEXT GREAT READ </span>

        <h2>
          Find your next
          <br />
          <span>favorite book.</span>
        </h2>

        <p>
          Explore books, discover new authors, and find inspiration
          for your next reading adventure.
        </p>

        <form className="find-book-search" onSubmit={searchBooks}>
          <Search size={21} />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by book title or author..."
            aria-label="Search books by title or author"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="find-book-quick-search">
          <span>Try:</span>

          {["Harry Potter", "Science", "Psychology"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <div className="find-book-hero-decoration" aria-hidden="true">
        <div className="find-book-decoration-circle">
          <BookOpen size={76} strokeWidth={1.2} />
        </div>
        <span className="decoration-star star-one">✦</span>
        <span className="decoration-star star-two">✧</span>
      </div>
    </section>

    <section className="find-book-results">
      <div className="find-book-results-heading">
        <div>
          <span className="find-book-section-label">
            BOOK DISCOVERY
          </span>
          <h2>{searched ? "Search Results" : "Explore Books"}</h2>
          <p>
            {searched
              ? `${books.length} books found`
              : "Start searching or explore some interesting books."}
          </p>
        </div>

        <button
          type="button"
          className="find-book-refresh"
          onClick={searchPopularBooks}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Explore Books
        </button>
      </div>

      {loading && (
        <div className="find-book-message">
          <span className="find-book-spinner" />
          <p>Finding wonderful books for you...</p>
        </div>
      )}

      {!loading && error && (
        <div className="find-book-message find-book-error">
          <BookOpen size={28} />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && !searched && (
        <div className="find-book-empty">
          <div className="find-book-empty-icon">
            <Search size={32} />
          </div>
          <h3>Your next book is waiting</h3>
          <p>
            Search for a title or author to discover books from the
            Open Library collection.
          </p>
        </div>
      )}

      {!loading && books.length > 0 && (
        <div className="find-book-grid">
          {books.map((book) => (
            <article className="find-book-card" key={book.id}>
              <div className="find-book-cover">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="find-book-no-cover">
                    <BookOpen size={42} />
                    <span>No cover available</span>
                  </div>
                )}

                <span className="find-book-cover-badge">
                  <BookOpen size={12} />
                  Book
                </span>
              </div>

              <div className="find-book-card-content">
                <h3 title={book.title}>{book.title}</h3>

                <p className="find-book-author">
                  <UserRound size={15} />
                  <span>{book.author}</span>
                </p>

                <p className="find-book-year">
                  <Calendar size={15} />
                  <span>
                    Published: {book.year}
                  </span>
                </p>

                {book.subjects.length > 0 && (
                  <div className="find-book-subjects">
                    {book.subjects.slice(0, 2).map((subject) => (
                      <span key={subject}>{subject}</span>
                    ))}
                  </div>
                )}

                <a
                  className="find-book-details-button"
                  href={`https://openlibrary.org${book.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Book Details
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>

    <div className="find-book-api-note">
      <BookOpen size={17} />
      <p>
        Book information powered by{" "}
        <a
          href="https://openlibrary.org/"
          target="_blank"
          rel="noreferrer"
        >
          Open Library
        </a>
        . Availability and book details may vary.
      </p>
    </div>
  </div>
</PageLayout>


);
}

export default FindBook;
