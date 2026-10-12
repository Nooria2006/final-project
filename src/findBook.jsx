import { useState } from "react";
import "./FindBook.css";

function FindBook() {
  const [searchTerm, setSearchTerm] = useState("");

  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Development",
    },
    {
      id: 3,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      category: "Fiction",
    },
    {
      id: 4,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Psychology",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
    );
  });

  return (
    <div className="find-book">
      <h1>Find Book</h1>

      <p>
        Search for a book by its title or author.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter book title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="search-results">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-result" key={book.id}>
              <h2>{book.title}</h2>

              <p>By {book.author}</p>

              <p>Category: {book.category}</p>

              <button>View Book</button>
            </div>
          ))
        ) : (
          <p className="no-results">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
}

export default FindBook;