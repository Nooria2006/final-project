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
import  FavoriteBook from "./favoriteBook";
import Members from "./members";
import Setting from "./Setting";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
      />

      <main
        className={
          sidebarOpen
            ? "app-content sidebar-is-open"
            : "app-content sidebar-is-closed"
        }
      >

        {currentPage === "dashboard" && (
          <Dashboard
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "account" && (
          <Account
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "books" && (
          <BookCollection />
        )}
{currentPage === "borrowed" && (
  <BorrowedBooks />
)}
{currentPage === "due" && (
  <DueBook />
)}
{currentPage === "findBook" && (
  <FindBook />
)}
{currentPage === "findLibrary" && (
  <FindLibrary />
)}
{currentPage === "categories" && (
  <Categories />
)}
{currentPage === "members" && (
  <Members />
)}
{currentPage === "members" && (
  <Members />
)}

{currentPage === "favorite" && (
  <FavoriteBook />
)}

{currentPage === "settings" && (
  <Setting />
)}


      </main>

    </div>
  );
}

export default App;