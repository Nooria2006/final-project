
import "./favoriteBook.css";

function FavoriteBook() {
  const favoriteBooks = [
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
  ];

  return (
    <div className="favorite-books">
      <h1>Favorite Books</h1>

      <p className="favorite-subtitle">
        Here you can see your favorite books.
      </p>

      <div className="favorite-books-grid">
        {favoriteBooks.map((book) => (
          <div className="favorite-book-card" key={book.id}>
            <div className="favorite-icon">❤️</div>

            <h2>{book.title}</h2>

            <p>By {book.author}</p>

            <p>Category: {book.category}</p>

            <button>View Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteBook;