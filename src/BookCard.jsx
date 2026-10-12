
import "./BookCard.css";

function BookCard({ title, author, image }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} width="120" />

      <h3>{title}</h3>

      <p>Author: {author}</p>

      <button>Read More</button>
    </div>
  );
}

export default BookCard;