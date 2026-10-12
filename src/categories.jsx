import "./Categories.css";

function Categories() {
  const categories = [
    {
      id: 1,
      name: "Fiction",
      books: 35,
    },
    {
      id: 2,
      name: "Science",
      books: 20,
    },
    {
      id: 3,
      name: "History",
      books: 15,
    },
    {
      id: 4,
      name: "Psychology",
      books: 18,
    },
    {
      id: 5,
      name: "Technology",
      books: 12,
    },
  ];

  return (
    <div className="categories-page">
      <h1>Categories</h1>

      <p className="categories-subtitle">
        Browse books by category.
      </p>

      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <h2>{category.name}</h2>

            <p>{category.books} Books</p>

            <button>View Books</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;