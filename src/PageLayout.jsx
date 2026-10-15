
import "./PageLayout.css";

function PageLayout({
  title,
  description,
  currentPage,
  setCurrentPage,
  children,
}) {
  return (
    <div className="page-layout">
      <header className="page-header">
        <div className="page-header-title">
          <p className="page-breadcrumb">
            My Library <span>/</span> {title}
          </p>

          <h1>{title}</h1>

          {description && (
            <p className="page-description">{description}</p>
          )}
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="page-header-search"
            onClick={() => setCurrentPage("findBook")}
          >
            <span>🔍</span>
            <span>Search Books</span>
          </button>

          <button
            type="button"
            className="page-header-account"
            onClick={() => setCurrentPage("account")}
            aria-label="Open my account"
          >
            👤
          </button>
        </div>
      </header>

      <section className="page-body" key={currentPage}>
        {children}
      </section>

      <footer className="page-footer">
        <p>© 2026 My Library. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default PageLayout;