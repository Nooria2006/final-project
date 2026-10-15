import { useEffect, useState } from "react";
import "./dashboard.css";
import PageLayout from "./PageLayout";

function Dashboard({ setCurrentPage }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "📘 Fiction", percentage: 35 },
    { name: "📗 Science", percentage: 20 },
    { name: "📕 History", percentage: 15 },
    { name: "📙 Psychology", percentage: 18 },
    { name: "📓 Technology", percentage: 12 },
  ];

  const usage = [
    { name: "📖 Books Read", percentage: 45 },
    { name: "🔖 Books Borrowed", percentage: 25 },
    { name: "❤️ Favorites", percentage: 15 },
    { name: "📚 Saved Books", percentage: 15 },
  ];

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://openlibrary.org/search.json?q=popular+books&limit=8"
        );

        if (!response.ok) {
          throw new Error("Failed to load books.");
        }

        const data = await response.json();
        setBooks(data.docs || []);
      } catch (err) {
        setError("Could not load books. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const popularBooks = books.slice(0, 5);

  const recentBooks = [...books]
    .sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0))
    .slice(0, 4);

  return (
    <PageLayout
      title="Dashboard"
      currentPage="dashboard"
      setCurrentPage={setCurrentPage}
    >
      <div className="main">
        <section className="content">
          <h1>Welcome To My Library! 📚</h1>

          <div className="find-section">
            <h2>Find a Book 🔍</h2>
            <p>Search for your favorite book.</p>

            <div className="find-box">
              <input
                type="text"
                placeholder="Enter book name..."
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setCurrentPage("findBook");
                  }
                }}
              />

              <button
                type="button"
                onClick={() => setCurrentPage("findBook")}
              >
                🔍 Search
              </button>
            </div>
          </div>

          <div className="cards">
            <div className="card">
              <h3>Books by Category</h3>

              <div className="chart-row">
                <div className="donut donut1">
                  <div></div>
                </div>

                <div className="list">
                  {categories.map((category) => (
                    <p key={category.name}>
                      {category.name}
                      <span>{category.percentage}%</span>
                    </p>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage("categories")}
              >
                MORE DETAILS
              </button>
            </div>

            <div className="card">
              <h3>Popular Books</h3>

              {loading ? (
                <p>Loading popular books...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="book-list">
                  {popularBooks.map((book, index) => (
                    <p key={book.key}>
                      {book.title}
                      <span>{index + 1}</span>
                    </p>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setCurrentPage("books")}
              >
                VIEW ALL BOOKS
              </button>
            </div>

            <div className="card">
              <h3>Library Usage</h3>

              <div className="chart-row">
                <div className="donut donut2">
                  <div></div>
                </div>

                <div className="list">
                  {usage.map((item) => (
                    <p key={item.name}>
                      {item.name}
                      <span>{item.percentage}%</span>
                    </p>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage("books")}
              >
                MORE DETAILS
              </button>
            </div>

            <div className="card reading">
              <h3>Reading Statistics</h3>

              <h2>
                72%
                <span>+8%</span>
              </h2>

              <p className="subtitle">
                Your reading progress this month
              </p>

              <div className="line-chart">
                <svg
                  viewBox="0 0 500 180"
                  role="img"
                  aria-label="Reading progress chart"
                >
                  <polyline
                    points="0,145 50,125 100,135 150,90 200,110 250,70 300,95 350,50 400,75 450,45 500,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="books-section">
            <h2>Recently Added Books</h2>

            {loading ? (
              <p>Loading books...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="books">
                {recentBooks.map((book) => (
                  <div className="book" key={book.key}>
                    <div className="cover">
                      {book.cover_i ? (
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                          alt={`Cover of ${book.title}`}
                          loading="lazy"
                        />
                      ) : (
                        <span>📚</span>
                      )}
                    </div>

                    <h3>{book.title}</h3>

                    <p>
                      {book.author_name?.[0] || "Unknown author"}
                    </p>

                    {book.first_publish_year && (
                      <small>{book.first_publish_year}</small>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default Dashboard;