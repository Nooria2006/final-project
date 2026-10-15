import { BookOpen, CalendarDays, Clock } from "lucide-react";
import PageLayout from "./PageLayout";
import "./BorrowedBook.css";

function BorrowedBook({ setCurrentPage }) {
  const borrowedBooks = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      borrowedDate: "October 1, 2026",
      returnDate: "October 15, 2026",
      status: "Due Soon",
    },
  ];

  return (
    <PageLayout
      title="Borrowed Books"
      description="Manage your borrowed books and keep track of return dates."
      currentPage="borrowed"
      setCurrentPage={setCurrentPage}
    >
      <div className="borrowed-books">
        <section className="borrowed-welcome">
          <div className="borrowed-welcome-icon">
            <BookOpen size={30} />
          </div>

          <div>
            <h2>Your Borrowed Books</h2>
            <p>
              Keep track of the books you have borrowed and their return dates.
            </p>
          </div>
        </section>

        <div className="borrowed-summary">
          <div className="borrowed-summary-card">
            <span className="borrowed-summary-icon">
              <BookOpen size={22} />
            </span>

            <div>
              <p>Total Borrowed Books</p>
              <h3>{borrowedBooks.length}</h3>
            </div>
          </div>

          <div className="borrowed-summary-card">
            <span className="borrowed-summary-icon due-icon">
              <Clock size={22} />
            </span>

            <div>
              <p>Due Soon</p>
              <h3>
                {
                  borrowedBooks.filter(
                    (book) => book.status === "Due Soon"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

        <section className="borrowed-list-section">
          <div className="borrowed-section-heading">
            <div>
              <h2>Currently Borrowed</h2>
              <p>Your borrowing information is listed below.</p>
            </div>
          </div>

          <div className="borrowed-book-list">
            {borrowedBooks.map((book) => (
              <article className="borrowed-book-card" key={book.id}>
                <div className="borrowed-book-icon">
                  <BookOpen size={34} />
                </div>

                <div className="borrowed-book-details">
                  <span className="borrowed-status">
                    {book.status}
                  </span>

                  <h3>{book.title}</h3>
                  <p className="borrowed-author">By {book.author}</p>

                  <div className="borrowed-dates">
                    <p>
                      <CalendarDays size={16} />
                      <span>
                        Borrowed: {book.borrowedDate}
                      </span>
                    </p>

                    <p>
                      <Clock size={16} />
                      <span>
                        Return date: {book.returnDate}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="borrowed-view-button"
                    onClick={() => setCurrentPage("books")}
                  >
                    <BookOpen size={16} />
                    Browse All Books
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default BorrowedBook;