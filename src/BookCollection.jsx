
import { useEffect, useState } from "react";
import { Search, BookOpen, RefreshCw } from "lucide-react";
import PageLayout from "./PageLayout";
import "./BookCollection.css";

function BookCollection({ setCurrentPage }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  async function fetchBooks(query = "fiction") {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=40`
      );

      if (!response.ok) {
        throw new Error("Unable to load books.");
      }

      const data = await response.json();

      const formattedBooks = (data.docs || []).map((book, index) => ({
        id: book.key || `book-${index}`,
        title: book.title || "Untitled",
        author: book.author_name?.[0] || "Unknown Author",
        year: book.first_publish_year || "Unknown",
        category: book.subject?.[0] || "General",
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "",
        status: "Available",
      }));

      setBooks(formattedBooks);
    } catch {
      setError(
        "Books could not be loaded. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      fetchBooks(query);
    } else {
      fetchBooks();
    }
  }

  return (
    <PageLayout
      title="All Books"
      description="Explore, search, and discover books in your library."
      currentPage="books"
      setCurrentPage={setCurrentPage}
    >
      <div className="book-page">
        <section className="book-welcome">
          <div className="book-welcome-icon">
            <BookOpen size={30} />
          </div>

          <div>
            <h2>Discover Your Next Book</h2>
            <p>
              Explore books from different authors and subjects.
            </p>
          </div>
        </section>

        <section className="book-toolbar">
          <form className="book-search" onSubmit={handleSearch}>
            <Search size={19} />

            <input
              type="search"
              placeholder="Search by title or author..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search books"
            />

            <button type="submit">Search</button>
          </form>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="book-refresh"
            onClick={() => fetchBooks(search.trim() || "fiction")}
            disabled={loading}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </section>

        <section className="book-section">
          <div className="book-section-heading">
            <div>
              <h2>Book Collection</h2>
              <p>Find your favorite books and explore new ideas.</p>
            </div>

            <span className="book-count">
              {filteredBooks.length} books
            </span>
          </div>

          {loading && (
            <div className="book-message" role="status">
              Loading books...
            </div>
          )}

          {!loading && error && (
            <div className="book-message book-error" role="alert">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => fetchBooks(search.trim() || "fiction")}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredBooks.length === 0 && (
            <div className="book-message">
              No books found. Try another title or author.
            </div>
          )}

          {!loading && !error && filteredBooks.length > 0 && (
            <>
              <div className="book-grid">
                {filteredBooks.slice(0, visibleCount).map((book) => (
                  <article className="book-card" key={book.id}>
                    <div className="book-image">
                      {book.image ? (
                        <img src={book.image} alt={book.title} />
                      ) : (
                        <div className="book-no-image">
                          <BookOpen size={38} />
                          <span>No cover available</span>
                        </div>
                      )}
                    </div>

                    <div className="book-card-content">
                      <span className="book-category">
                        {book.category}
                      </span>

                      <h3>{book.title}</h3>

                      <p className="book-author">
                        By {book.author}
                      </p>

                      <p className="book-year">
                        First published: {book.year}
                      </p>

                      <a
                        className="view-book-btn"
                        href={`https://openlibrary.org${book.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Book
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {visibleCount < filteredBooks.length && (
                <div className="book-load-more">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) => count + 10)
                    }
                  >
                    Load More Books
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {!loading && !error && filteredBooks.length > 0 && (
          <section className="book-table-section">
            <div className="book-section-heading">
              <div>
                <h2>All Books</h2>
                <p>Browse book details in table format.</p>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Year</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBooks.slice(0, visibleCount).map((book) => (
                    <tr key={book.id}>
                      <td className="table-book">
                        {book.image ? (
                          <img src={book.image} alt="" />
                        ) : (
                          <BookOpen size={22} />
                        )}

                        <span>{book.title}</span>
                      </td>

                      <td>{book.category}</td>
                      <td>{book.author}</td>

                      <td>
                        <span className="status available">
                          {book.status}
                        </span>
                      </td>

                      <td>{book.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default BookCollection;
