import { useState } from "react";
import {
  Search,
  BookOpen,
  Clock,
  AlertTriangle,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import PageLayout from "./PageLayout";
import "./DueBook.css";

function DueBook({ setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Sample borrowing records
  const [dueBooks] = useState([
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      borrower: "Sara Ahmadi",
      borrowDate: "2026-10-01",
      dueDate: "2026-10-15",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      borrower: "Ahmad Rahimi",
      borrowDate: "2026-09-20",
      dueDate: "2026-10-10",
    },
    {
      id: 3,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      borrower: "Maryam Hassan",
      borrowDate: "2026-10-05",
      dueDate: "2026-10-20",
    },
    {
      id: 4,
      title: "Ikigai",
      author: "Héctor García",
      borrower: "Omid Karimi",
      borrowDate: "2026-09-15",
      dueDate: "2026-10-05",
    },
    {
      id: 5,
      title: "Psychology of Money",
      author: "Morgan Housel",
      borrower: "Sara Ahmadi",
      borrowDate: "2026-10-03",
      dueDate: "2026-10-14",
    },
  ]);

  // Calculate remaining or overdue days
  const getBookStatus = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${dueDate}T00:00:00`);
    const difference = Math.round(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) {
      return {
        type: "overdue",
        label: `${Math.abs(difference)} days overdue`,
        days: difference,
      };
    }

    if (difference === 0) {
      return {
        type: "today",
        label: "Due today",
        days: 0,
      };
    }

    if (difference <= 3) {
      return {
        type: "soon",
        label: `${difference} days left`,
        days: difference,
      };
    }

    return {
      type: "upcoming",
      label: `${difference} days left`,
      days: difference,
    };
  };

  const booksWithStatus = dueBooks.map((book) => ({
    ...book,
    status: getBookStatus(book.dueDate),
  }));

  const overdueCount = booksWithStatus.filter(
    (book) => book.status.type === "overdue"
  ).length;

  const dueTodayCount = booksWithStatus.filter(
    (book) => book.status.type === "today"
  ).length;

  const upcomingCount = booksWithStatus.filter(
    (book) =>
      book.status.type === "soon" ||
      book.status.type === "upcoming"
  ).length;

  const filteredBooks = booksWithStatus.filter((book) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.borrower.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      book.status.type === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <PageLayout
      title="Due Books"
      description="Track upcoming returns and overdue library books."
      currentPage="due"
      setCurrentPage={setCurrentPage}
    >
      <div className="due-page">
        <section className="due-welcome">
          <div>
            <span className="due-eyebrow">RETURN MANAGEMENT</span>
            <h2>Keep every return on track.</h2>
            <p>
              Check due dates, find overdue books, and stay organized
              with your library's borrowing schedule.
            </p>
          </div>

          <div className="due-welcome-icon">
            <CalendarDays size={54} strokeWidth={1.5} />
          </div>
        </section>

        <section className="due-stats">
          <article className="due-stat-card">
            <div className="due-stat-icon due-purple">
              <BookOpen size={23} />
            </div>
            <div>
              <p>Total Records</p>
              <h3>{dueBooks.length}</h3>
            </div>
          </article>

          <article className="due-stat-card">
            <div className="due-stat-icon due-red">
              <AlertTriangle size={23} />
            </div>
            <div>
              <p>Overdue</p>
              <h3>{overdueCount}</h3>
            </div>
          </article>

          <article className="due-stat-card">
            <div className="due-stat-icon due-orange">
              <Clock size={23} />
            </div>
            <div>
              <p>Due Today</p>
              <h3>{dueTodayCount}</h3>
            </div>
          </article>

          <article className="due-stat-card">
            <div className="due-stat-icon due-green">
              <CheckCircle size={23} />
            </div>
            <div>
              <p>Upcoming Returns</p>
              <h3>{upcomingCount}</h3>
            </div>
          </article>
        </section>

        <section className="due-list-panel">
          <div className="due-list-heading">
            <div>
              <h2>Return Schedule</h2>
              <p>Review the borrowing records and their due dates.</p>
            </div>

            <span className="due-record-count">
              {filteredBooks.length} records
            </span>
          </div>

          <div className="due-filters">
            <div className="due-search">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search book, author, or borrower..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              aria-label="Filter books by return status"
            >
              <option value="All">All Statuses</option>
              <option value="overdue">Overdue</option>
              <option value="today">Due Today</option>
              <option value="soon">Due Soon</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="due-table-wrapper">
            <table className="due-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Borrower</th>
                  <th>Borrowed Date</th>
                  <th>Due Date</th>
                  <th>Return Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="due-book-info">
                        <div className="due-book-cover">
                          <BookOpen size={22} />
                        </div>

                        <div>
                          <strong>{book.title}</strong>
                          <span>{book.author}</span>
                        </div>
                      </div>
                    </td>

                    <td>{book.borrower}</td>
                    <td>{formatDate(book.borrowDate)}</td>
                    <td>{formatDate(book.dueDate)}</td>

                    <td>
                      <span
                        className={`due-status due-status-${book.status.type}`}
                      >
                        <span className="due-status-dot"></span>
                        {book.status.label}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      <div className="due-empty">
                        <Search size={30} />
                        <h3>No matching records</h3>
                        <p>
                          Try another search term or choose a different
                          status.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="due-note">
            These are sample borrowing records. The status is calculated
            from each due date using your computer's current date.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

export default DueBook;