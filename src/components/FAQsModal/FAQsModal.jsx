import React, { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { FaChevronDown } from "react-icons/fa6";

const FAQsModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!isOpen) return null;

  const faqs = [
    {
      question: "How do I find a tutor?",
      answer:
        "Browse our tutor directory, filter by subject and availability, and connect with tutors that match your needs. You can view their profiles, ratings, and availability before booking.",
    },
    {
      question: "How do I become a tutor?",
      answer:
        "Sign up as a tutor, complete your profile with qualifications, and start posting tuition sessions. Students can then apply to your sessions.",
    },
    {
      question: "Is the platform safe?",
      answer:
        "Yes! We prioritize security with encrypted data, verified user profiles, and secure payment processing. All transactions are protected.",
    },
    {
      question: "How do payments work?",
      answer:
        "Payments are processed securely through our platform. Tutors receive payments after each completed session, typically within 2-3 business days.",
    },
    {
      question: "Can I cancel or reschedule a session?",
      answer:
        "Yes! You can reschedule or cancel sessions with at least 24 hours notice. Cancellations made less than 24 hours before may incur a fee.",
    },
    {
      question: "What subjects are available?",
      answer:
        "We cover a wide range of subjects including Mathematics, Science, Languages, Entrance Exams, and Professional Skills. Browse our categories for the complete list.",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden
        rounded-xl shadow-xl bg-base-100"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b
          border-base-300"
        >
          <h2 className="text-xl font-semibold text-base-content">
            Frequently Asked Questions
          </h2>
          <button
            onClick={onClose}
            className="text-base-content/60 hover:text-base-content transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-120px)]">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-base-300 rounded-lg overflow-hidden
                hover:border-primary transition-colors"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-5 py-4 flex items-center justify-between
                  bg-base-200 hover:bg-base-300 transition-colors text-left"
                >
                  <h3 className="font-semibold text-base-content">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    size={16}
                    className={`text-primary transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedIndex === index && (
                  <div
                    className="px-5 py-4 bg-base-100 border-t border-base-300
                  text-base-content/80 text-sm"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t border-base-300
          flex justify-between items-center"
        >
          <p className="text-sm text-base-content/60">
            Can't find your answer?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-semibold
              bg-primary text-primary-content hover:bg-primary-focus transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQsModal;
