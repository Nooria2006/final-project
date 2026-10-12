import "./BorrowedBook.css";
function BorrowedBook() {
  return (
    <div className="borrowed-books">
      <h1>Borrowed Books</h1>

      <p>
        Here you can see all the books you have borrowed.
      </p>

      <div className="borrowed-book-card">
        <h2>The Alchemist</h2>
        <p>By Paulo Coelho</p>
        <p>Borrowed Date: October 1, 2026</p>
        <p>Return Date: October 15, 2026</p>

        <button>View Book</button>
      </div>
    </div>
  );
}

export default BorrowedBook;