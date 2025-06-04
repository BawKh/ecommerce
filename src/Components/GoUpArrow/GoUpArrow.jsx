// GoUpArrow.jsx
import React, { useState, useEffect } from "react";

export default function GoUpArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 9999,
        display: visible ? "block" : "none",
        background: "#0aad0a",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        fontSize: "1.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer",
        transition: "opacity 0.3s"
      }}
      aria-label="Go to top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}