import "./FindLibrary.css";

function FindLibrary() {
  return (
    <div className="find-library">
      <h1>Find Library</h1>

      <p>
        Find libraries and their available services.
      </p>

      <div className="library-card">
        <h2>Central City Library</h2>

        <p>📍 Kabul, Afghanistan</p>

        <p>📚 Available Books: 1,250</p>

        <p>🕐 Opening Hours: 8:00 AM - 6:00 PM</p>

        <button>View Library</button>
      </div>
    </div>
  );
}

export default FindLibrary;