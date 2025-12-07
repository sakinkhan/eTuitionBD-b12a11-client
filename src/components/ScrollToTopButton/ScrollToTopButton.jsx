import React, { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg 
        bg-primary text-white 
        transition-all duration-300 
        hover:bg-secondary hover:text-gray-900
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
    >
      <BsArrowUp size={22} />
    </button>
  );
};

export default ScrollToTopButton;
