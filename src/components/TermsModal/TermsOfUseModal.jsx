import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const TermsOfUseModal = ({ isOpen, onClose }) => {
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
            Terms of Use – eTuitionBD
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
          <p>
            Welcome to{" "}
            <span className="font-bold text-primary">eTuitionBD</span>. By
            accessing or using this platform, you agree to follow these Terms of
            Use. Please read them carefully.
          </p>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              1. Platform Purpose
            </h3>
            <p>
              eTuitionBD connects students with tutors for educational services.
              We act as a facilitator, not as an employer, agent, or guarantor
              of outcomes.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              2. User Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and up-to-date information</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Respect other users and platform rules</li>
              <li>Do not misuse data, payments, or communication tools</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              3. Account & Access
            </h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Any activity under your account is your
              responsibility.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              4. Payments & Transactions
            </h3>
            <p>
              Payments are processed through secure third-party providers.
              eTuitionBD is not liable for disputes between students and tutors
              after successful payment completion.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              5. Content & Conduct
            </h3>
            <p>
              Users must not post false, misleading, abusive, or inappropriate
              content. Violations may result in suspension or permanent account
              removal.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              6. Termination
            </h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms or harm the platform’s integrity.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base-content mb-1">
              7. Changes to Terms
            </h3>
            <p>
              These terms may be updated from time to time. Continued use of
              eTuitionBD indicates acceptance of the latest version.
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

export default TermsOfUseModal;
