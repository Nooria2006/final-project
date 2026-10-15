
import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentPage,
  setCurrentPage,
}) {
  const menuItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "findBook", icon: "🔍", label: "Find Book" },
    { id: "findLibrary", icon: "🏢", label: "Find Library" },
    { id: "books", icon: "📚", label: "All Books" },
    { id: "categories", icon: "🗂️", label: "Categories" },
    { id: "members", icon: "👥", label: "Members" },
    { id: "borrowed", icon: "📖", label: "Borrowed Books" },
    { id: "due", icon: "🕐", label: "Due Books" },
    { id: "favorite", icon: "❤️", label: "Favorite Books" },
    { id: "account", icon: "👤", label: "My Account" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Close the sidebar on smaller screens after selecting a page.
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
    >
      <div className="sidebar-header">
        <div className="logo">
          <img
            src="/book_img.png"
            alt="Library Logo"
            className="logo-img"
          />

          <h3>My Library</h3>
        </div>

        <button
          className="close-sidebar"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          type="button"
        >
          ×
        </button>
      </div>

      <nav>
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={currentPage === item.id ? "active" : ""}
            aria-current={
              currentPage === item.id ? "page" : undefined
            }
            onClick={(event) => {
              event.preventDefault();
              handlePageChange(item.id);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="help">
        <b>?</b>
        <span>Need Help?</span>
      </div>
    </aside>
  );
}

export default Sidebar;