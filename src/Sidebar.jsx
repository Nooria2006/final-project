
import "./sidebar.css";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  setCurrentPage,
}) {
  // وقتی روی یک صفحه کلیک می‌کنیم
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "open" : "closed"
      }`}
    >

      {/* Logo */}
      <div className="logo">

        <img
          src="/book_img.png"
          alt="Library Logo"
          className="logo-img"
        />

        <h3>My Library</h3>

      </div>


      {/* Navigation */}
      <nav>

        {/* Dashboard */}
        <a
          href="#"
          className="active"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("dashboard");
          }}
        >
          🏠
          <span>Dashboard</span>
        </a>
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("findBook");
  }}
>
  🔍
  <span>Find Book</span>
</a>

      <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("findLibrary");
  }}
>
  🏢
  <span>Find Library</span>
</a> 


        {/* All Books */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("books");
          }}
        >
          📚
          <span>All Books</span>
        </a>
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("categories");
  }}
>
  🗂️
  <span>Categories</span>
</a>
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("members");
  }}
>
  👥
  <span>Members</span>
</a>


{/* Borrowed Books */}
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("borrowed");
  }}
>
  📖
  <span>Borrowed Books</span>
</a>
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("due");
  }}
>
  🕐
  <span>Due Books</span>
</a>
    <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("favorite");
  }}
>
  ❤️
  <span>favorite Book</span>
</a>    




        {/* My Account */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("account");
          }}
        >
          👤
          <span>My Account</span>
        </a>

<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handlePageChange("settings");
  }}
>
  ⚙️
  <span>Settings</span>
</a>
   

      </nav>


      {/* Help */}
      <div className="help">

        <b>?</b>

        <span>
          Need Help?
        </span>

      </div>

    </aside>
  );
}

export default Sidebar;