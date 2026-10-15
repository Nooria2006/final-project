
import { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Account from "./Account";
import BookCollection from "./BookCollection";
import BorrowedBooks from "./BorrowedBook";
import DueBook from "./DueBook";
import FindBook from "./findBook";
import FindLibrary from "./findLibrary";
import Categories from "./categories";
import FavoriteBook from "./favoriteBook";
import Members from "./members";
import Setting from "./Setting";
import Auth from "./Auth";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  if (!isLoggedIn) {
  return <Auth onLogin={() => setIsLoggedIn(true)} />;
}


  return (
    <div className="app">

      {/* Sidebar */}
<Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/>


      {/* Main Content */}
      <main
        className={
          sidebarOpen
            ? "app-content sidebar-is-open"
            : "app-content sidebar-is-closed"
        }
      >

        {/* Menu Button — available on every page */}
        <button
          type="button"
          className="global-menu-toggle"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? "☰" : "☰"}
        </button>

        {/* Dashboard */}
        {currentPage === "dashboard" && (
          <Dashboard
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* My Account */}
        {currentPage === "account" && (
          <Account
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        )}

      
{currentPage === "books" && (
  <BookCollection setCurrentPage={setCurrentPage} />
)}
{currentPage === "borrowed" && ( <BorrowedBooks setCurrentPage={setCurrentPage} />
)}
{currentPage === "findBook" && ( <FindBook setCurrentPage={setCurrentPage} />
)}



        {/* Due Books */}
        {currentPage === "due" && (<DueBook setCurrentPage={setCurrentPage} />)}

        

        {/* Find Library */}
        {currentPage === "findLibrary" && (
  <FindLibrary setCurrentPage={setCurrentPage} />
)}

        {/* Categories */}
        {currentPage === "categories" && (
  <Categories setCurrentPage={setCurrentPage} />
)}

        {/* Members */}
        {currentPage === "members" && (<Members setCurrentPage={setCurrentPage} />)}

        {/* Favorite Books */}
        {currentPage === "favorite" && (<FavoriteBook setCurrentPage={setCurrentPage} />)}

        {/* Settings */}
        {currentPage === "settings" && (<Setting setCurrentPage={setCurrentPage} />)}

      </main>
    </div>
  );
}

export default App;
