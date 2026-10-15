import {
  BookOpen,
  FlaskConical,
  Landmark,
  Brain,
  Monitor,
  Heart,
  Palette,
  Globe,
  ArrowRight,
} from "lucide-react";

import PageLayout from "./PageLayout";
import "./categories.css";

function Categories({ setCurrentPage }) {
  const categories = [
    {
      name: "Fiction",
      description: "Discover stories, novels, and imaginary worlds.",
      icon: BookOpen,
      color: "#7566e8",
      background: "#f0edff",
      count: "Explore books",
      search: "fiction",
    },
    {
      name: "Science",
      description: "Explore discoveries, experiments, and the universe.",
      icon: FlaskConical,
      color: "#159d89",
      background: "#e4f8f2",
      count: "Explore books",
      search: "science",
    },
    {
      name: "History",
      description: "Travel through the events that shaped our world.",
      icon: Landmark,
      color: "#d58b35",
      background: "#fff2df",
      count: "Explore books",
      search: "history",
    },
    {
      name: "Psychology",
      description: "Understand human behavior, emotions, and the mind.",
      icon: Brain,
      color: "#d65f91",
      background: "#ffeaf3",
      count: "Explore books",
      search: "psychology",
    },
    {
      name: "Technology",
      description: "Learn about computers, coding, and innovation.",
      icon: Monitor,
      color: "#3985d9",
      background: "#e7f2ff",
      count: "Explore books",
      search: "technology",
    },
    {
      name: "Health",
      description: "Read about healthy habits and human well-being.",
      icon: Heart,
      color: "#e45f5f",
      background: "#ffeded",
      count: "Explore books",
      search: "health",
    },
    {
      name: "Arts & Creativity",
      description: "Find inspiration in art, design, and creativity.",
      icon: Palette,
      color: "#a06ad7",
      background: "#f4eaff",
      count: "Explore books",
      search: "art",
    },
    {
      name: "Geography",
      description: "Discover countries, cultures, and our planet.",
      icon: Globe,
      color: "#429b63",
      background: "#e8f8ec",
      count: "Explore books",
      search: "geography",
    },
  ];

  const openCategory = (category) => {
    localStorage.setItem("libraryCategorySearch", category.search);
    setCurrentPage("findBook");
  };

  return (
    <PageLayout
      title="Categories"
      description="Explore your favorite topics and discover your next great read."
      currentPage="categories"
      setCurrentPage={setCurrentPage}
    >
      <div className="categories-page">
        <section className="categories-welcome">
          <div>
            <span className="categories-eyebrow">YOUR READING WORLD</span>
            <h2>What would you like to explore today?</h2>
            <p>
              Choose a category, follow your curiosity, and find books that
              inspire you to learn something new.
            </p>
          </div>

          <div className="categories-welcome-icon">
            <BookOpen size={62} strokeWidth={1.4} />
          </div>
        </section>

        <div className="categories-section-heading">
          <div>
            <h2>Browse Categories</h2>
            <p>Find books based on your interests.</p>
          </div>

          <span className="categories-total">
            {categories.length} categories
          </span>
        </div>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article className="category-card" key={category.name}>
                <div
                  className="category-icon"
                  style={{
                    color: category.color,
                    backgroundColor: category.background,
                  }}
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3>{category.name}</h3>
                <p>{category.description}</p>

                <button
                  type="button"
                  className="category-explore-button"
                  onClick={() => openCategory(category)}
                >
                  {category.count}
                  <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>

        <section className="categories-bottom-banner">
          <div className="categories-banner-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <h3>Every book opens a new door.</h3>
            <p>
              Keep exploring, keep learning, and let your curiosity lead the
              way.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage("books")}
          >
            View All Books
            <ArrowRight size={17} />
          </button>
        </section>
      </div>
    </PageLayout>
  );
}

export default Categories;