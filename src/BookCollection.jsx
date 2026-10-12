import React from "react";
import {
  BookOpen,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import "./BookCollection.css";

// کتاب‌های نمونه
const books = [
  {
    id: 1,
    title: "The Alchemist",
    category: "Fiction",
    author: "Paulo Coelho",
    year: "1988",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
  },
  {
    id: 2,
    title: "Atomic Habits",
    category: "Self-Help",
    author: "James Clear",
    year: "2018",
    status: "Borrowed",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
  },
  {
    id: 3,
    title: "The Power of Now",
    category: "Psychology",
    author: "Eckhart Tolle",
    year: "1997",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  },
  {
    id: 4,
    title: "The Kite Runner",
    category: "Drama",
    author: "Khaled Hosseini",
    year: "2003",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?w=500",
  },
];

function BookCollection() {
  return (
    <div className="book-page">

      {/* Header */}
      <header className="book-header">

        <div>
          <h2>Book Collection</h2>
          <p>Search books and find what you need</p>
        </div>

        <div className="book-header-actions">

          {/* Search */}
          <div className="book-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search books..."
            />
          </div>

          {/* Settings */}
          <Settings size={20} />

          {/* Notification */}
          <div className="notification">
            <Bell size={20} />
            <span></span>
          </div>

        </div>
      </header>

      {/* Book Cards */}
      <section className="book-section">

        <h3>Popular Books</h3>

        <div className="book-grid">

          {books.map((book) => (
            <div className="book-card" key={book.id}>

              <div className="book-image">
                <img
                  src={book.image}
                  alt={book.title}
                />
              </div>

              <div className="book-card-content">

                <div className="book-title-row">
                  <h4>{book.title}</h4>

                  <span className="book-category">
                    {book.category}
                  </span>
                </div>

                <p className="book-author">
                  By {book.author}
                </p>

                <p className="book-description">
                  Discover this book and explore its
                  interesting ideas and stories.
                </p>

                <button className="view-book-btn">
                  View Book
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* Table */}
      <section className="book-table-section">

        <h3>All Books</h3>

        <div className="table-controls">

          <div>
            <select>
              <option>7</option>
              <option>10</option>
              <option>20</option>
            </select>

            <span> entries per page</span>
          </div>

          <input
            type="text"
            placeholder="Search..."
          />

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
                <th>ID</th>
              </tr>
            </thead>

            <tbody>

              {books.map((book) => (
                <tr key={book.id}>

                  <td className="table-book">

                    <img
                      src={book.image}
                      alt={book.title}
                    />

                    <span>{book.title}</span>

                  </td>

                  <td>{book.category}</td>

                  <td>{book.author}</td>

                  <td>
                    <span
                      className={
                        book.status === "Available"
                          ? "status available"
                          : "status borrowed"
                      }
                    >
                      {book.status}
                    </span>
                  </td>

                  <td>{book.year}</td>

                  <td>LIB-{book.id}001</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default BookCollection;