import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
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
            Privacy Policy – eTuitionBD
          </h2>
          <button
            onClick={onClose}
            className="text-base-content/60 hover:text-base-content
              transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div
          className="px-6 py-5 overflow-y-auto text-sm leading-relaxed
          text-base-content space-y-4 max-h-[calc(85vh-120px)]"
        >
          <p>
            At <span className="font-bold text-primary">eTuitionBD</span>, your
            privacy matters. This policy explains what data we collect, why we
            collect it, and how we keep it safe.
          </p>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              1. Information We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email address, phone number</li>
              <li>User role (Student, Tutor, Admin)</li>
              <li>Profile details and qualifications</li>
              <li>Tuition posts, applications, and payment history</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              2. How We Use Your Information
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To connect students with qualified tutors</li>
              <li>To manage tuition posts and applications</li>
              <li>To process payments securely</li>
              <li>To improve platform performance and safety</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              3. Data Protection
            </h3>
            <p>
              We use secure authentication, encrypted databases, and restricted
              access controls to protect your data. Sensitive credentials are
              never stored in plain text.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              4. Data Sharing
            </h3>
            <p>
              We do not sell or share your personal information with third
              parties, except when required for payment processing or by law.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              5. Your Rights
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access and update your profile information</li>
              <li>Request account deletion</li>
              <li>Control visibility of your data</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              6. Policy Updates
            </h3>
            <p>
              This policy may be updated occasionally. Continued use of
              eTuitionBD means you accept the latest version.
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

export default PrivacyPolicyModal;
