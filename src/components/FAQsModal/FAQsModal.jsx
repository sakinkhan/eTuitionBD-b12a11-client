import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

const FAQsModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden
        rounded-xl shadow-xl bg-base-100"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b
          border-base-300"
        >
          <h2 className="text-xl font-semibold text-primary">
            FAQs – eTuitionBD
          </h2>
          <button
            onClick={onClose}
            className="text-base-content/60 hover:text-base-content transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div
          className="px-6 py-5 overflow-y-auto text-sm leading-relaxed
          text-base-content space-y-4 max-h-[calc(85vh-120px)]"
        >
          <section>
            <h3 className="font-semibold mb-1">1. What is eTuitionBD?</h3>
            <p>
              eTuitionBD is an online platform that connects students with
              verified tutors for both online and in-person tuition.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              2. How do students find tutors?
            </h3>
            <p>
              Students post tuition requirements. Tutors apply, and students
              choose the best match based on profile, experience, and expected
              salary.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              3. How do tutors apply for tuition?
            </h3>
            <p>
              Tutors browse available tuition posts and apply by submitting
              qualifications, experience, and expected salary through the
              platform.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              4. Is tutor approval guaranteed?
            </h3>
            <p>
              No. Approval depends on the student’s decision after reviewing
              tutor applications. Payment confirmation is required for final
              approval.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">5. How are payments handled?</h3>
            <p>
              Payments are processed securely through third-party payment
              gateways. Tutors are considered approved only after successful
              payment.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              6. Can I edit or delete my posts?
            </h3>
            <p>
              Yes. Students can edit or delete tuition posts, and tutors can
              update or withdraw applications until they are approved.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              7. What happens if there is a dispute?
            </h3>
            <p>
              eTuitionBD may assist in reviewing disputes, but the platform does
              not guarantee outcomes between students and tutors.
            </p>
          </section>

          <p className="text-xs text-base-content/60 pt-4">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQsModal;
