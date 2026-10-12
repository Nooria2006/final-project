import "./DueBook.css";

function DueBook() {
  return (
    <div className="due-books">
      <h1>Due Books</h1>

      <p>
        Here you can see the books that are due for return.
      </p>

      <div className="due-book-card">
        <h2>The Psychology of Money</h2>

        <p>By Morgan Housel</p>

        <p>Borrowed Date: September 25, 2026</p>

        <p>Due Date: October 8, 2026</p>

        <button>Return Book</button>
      </div>
    </div>
  );
}

export default DueBook;