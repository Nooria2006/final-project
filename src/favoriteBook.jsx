import { useEffect, useState } from "react";
import {
  Heart,
  Search,
  BookOpen,
  Trash2,
  ArrowRight,
  LibraryBig,
} from "lucide-react";

import PageLayout from "./PageLayout";
import "./favoriteBook.css";

const defaultBooks = [
  {
    id: "book-1",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    year: 2003,
    cover: "📕",
    color: "#f8e4e4",
  },
  {
    id: "book-2",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    cover: "📘",
    color: "#e5edff",
  },
  {
    id: "book-3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    cover: "📗",
    color: "#e1f5e9",
  },
  {
    id: "book-4",
    title: "Ikigai",
    author: "Héctor García",
    year: 2016,
    cover: "📙",
    color: "#fff0d9",
  },
];

function FavoriteBook({ setCurrentPage }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("myLibraryFavorites");

      if (saved !== null) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : defaultBooks;
      }

      return defaultBooks;
    } catch {
      return defaultBooks;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "myLibraryFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const removeFavorite = (id) => {
    setFavorites((previous) =>
      previous.filter((book) => book.id !== id)
    );
  };

  const filteredBooks = favorites.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  });

  return (
    <PageLayout
      title="Favorite Books"
      description="Keep the books you love close at hand."
      currentPage="favorite"
      setCurrentPage={setCurrentPage}
    >
      <div className="favorite-page">
        <section className="favorite-hero">
          <div className="favorite-hero-text">
            <span className="favorite-eyebrow">
              YOUR PERSONAL COLLECTION
            </span>

            <h2>Books close to your heart. ❤️</h2>

            <p>
              Your favorite stories, inspiring ideas, and books you
              want to remember—all in one place.
            </p>

            <div className="favorite-hero-count">
              <Heart size={17} fill="currentColor" />
              <span>
                {favorites.length}{" "}
                {favorites.length === 1 ? "favorite book" : "favorite books"}
              </span>
            </div>
          </div>

          <div className="favorite-hero-art">
            <div className="favorite-floating-heart">
              <Heart size={42} fill="currentColor" />
            </div>

            <div className="favorite-art-book favorite-art-book-one">
              📕
            </div>

            <div className="favorite-art-book favorite-art-book-two">
              📘
            </div>

            <div className="favorite-art-book favorite-art-book-three">
              📗
            </div>
          </div>
        </section>

        <section className="favorite-summary">
          <div className="favorite-summary-icon">
            <LibraryBig size={25} />
          </div>

          <div>
            <h3>Your reading collection</h3>
            <p>
              Save meaningful books and return to them whenever you want.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage("findBook")}
          >
            Discover Books
            <ArrowRight size={17} />
          </button>
        </section>

        <section className="favorite-library">
          <div className="favorite-section-heading">
            <div>
              <h2>My Favorites</h2>
              <p>Books you have saved to your collection.</p>
            </div>

            <span className="favorite-count">
              {filteredBooks.length} books
            </span>
          </div>

          <div className="favorite-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          {filteredBooks.length > 0 ? (
            <div className="favorite-grid">
              {filteredBooks.map((book) => (
                <article className="favorite-book-card" key={book.id}>
                  <div
                    className="favorite-book-cover"
                    style={{ backgroundColor: book.color || "#e9ebff" }}
                  >
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                      />
                    ) : (
                      <span>{book.cover || "📚"}</span>
                    )}

                    <button
                      type="button"
                      className="favorite-remove"
                      onClick={() => removeFavorite(book.id)}
                      aria-label={`Remove ${book.title} from favorites`}
                      title="Remove from favorites"
                    >
                      <Heart size={19} fill="currentColor" />
                    </button>
                  </div>

                  <div className="favorite-book-details">
                    <h3>{book.title}</h3>

                    <p>{book.author || "Unknown author"}</p>

                    {book.year && (
                      <span className="favorite-book-year">
                        Published in {book.year}
                      </span>
                    )}

                    <button
                      type="button"
                      className="favorite-delete-button"
                      onClick={() => removeFavorite(book.id)}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="favorite-empty">
              <div className="favorite-empty-icon">
                <Heart size={35} />
              </div>

              <h3>
                {favorites.length === 0
                  ? "Your favorites collection is empty"
                  : "No books found"}
              </h3>

              <p>
                {favorites.length === 0
                  ? "Discover books and save the ones you love here."
                  : "Try searching with another title or author's name."}
              </p>

              {favorites.length === 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentPage("findBook")}
                >
                  Find Books
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

export default FavoriteBook;