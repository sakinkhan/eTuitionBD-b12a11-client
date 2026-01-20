import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

const TermsOfUseModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className={`${
          theme === "dark"
            ? "bg-base-100 text-base-content"
            : "bg-base-100 text-base-content"
        } rounded-lg w-full max-w-2xl shadow-xl`}
      >
        {/* Header */}
        <div className="border-b border-base-300 p-6">
          <h2 className="text-2xl font-bold">Terms of Use</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Please read our terms carefully
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(85vh-120px)] overflow-y-auto p-6 space-y-4">
          {/* 1. Acceptance of Terms */}
          <section>
            <h3 className="text-lg font-semibold mb-2">
              1. Acceptance of Terms
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              By accessing and using eTuitionBD, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* 2. User Accounts */}
          <section>
            <h3 className="text-lg font-semibold mb-2">2. User Accounts</h3>
            <p className="text-sm text-base-content/80 leading-relaxed mb-2">
              You are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your computer.
              You agree to accept responsibility for all activities that occur
              under your account or password.
            </p>
            <ul className="text-sm text-base-content/80 leading-relaxed ml-4 space-y-1">
              <li>• Keep your password secure and confidential</li>
              <li>• Notify us immediately of unauthorized access</li>
              <li>• Accept all risks of unauthorized access</li>
            </ul>
          </section>

          {/* 3. User Conduct */}
          <section>
            <h3 className="text-lg font-semibold mb-2">3. User Conduct</h3>
            <p className="text-sm text-base-content/80 leading-relaxed mb-2">
              Users agree not to transmit any unlawful, threatening, abusive,
              defamatory, obscene, or otherwise objectionable material.
            </p>
            <ul className="text-sm text-base-content/80 leading-relaxed ml-4 space-y-1">
              <li>• Do not post false or misleading information</li>
              <li>• Do not engage in harassment or bullying</li>
              <li>• Do not violate any intellectual property rights</li>
              <li>• Do not attempt to gain unauthorized access</li>
            </ul>
          </section>

          {/* 4. Payments and Fees */}
          <section>
            <h3 className="text-lg font-semibold mb-2">4. Payments and Fees</h3>
            <p className="text-sm text-base-content/80 leading-relaxed mb-2">
              Tutors and students agree to comply with all payment terms and
              conditions set out in their tuition agreements.
            </p>
            <ul className="text-sm text-base-content/80 leading-relaxed ml-4 space-y-1">
              <li>• eTuitionBD does not hold payments in escrow</li>
              <li>• Parties must arrange payment directly</li>
              <li>• Platform charges apply as stated in pricing</li>
              <li>• All prices are in Bangladeshi Taka (BDT)</li>
            </ul>
          </section>

          {/* 5. Limitation of Liability */}
          <section>
            <h3 className="text-lg font-semibold mb-2">
              5. Limitation of Liability
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              eTuitionBD is provided on an "as-is" basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other
              warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose,
              and non-infringement of intellectual property or other violation
              of rights.
            </p>
          </section>

          {/* 6. Modification of Terms */}
          <section>
            <h3 className="text-lg font-semibold mb-2">
              6. Modification of Terms
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              eTuitionBD reserves the right to modify these terms and conditions
              at any time. Your continued use of the site following the posting
              of revised terms means that you accept and agree to the changes.
            </p>
          </section>

          {/* 7. Termination */}
          <section>
            <h3 className="text-lg font-semibold mb-2">7. Termination</h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              eTuitionBD may terminate your access to the platform at any time,
              with or without cause. Upon termination, your right to use the
              site will immediately cease. All sections that should by their
              nature remain in effect after termination shall survive.
            </p>
          </section>

          {/* Last Updated */}
          <div className="pt-4 border-t border-base-300">
            <p className="text-xs text-base-content/60">
              Last updated: January 20, 2026
            </p>
          </div>
        </div>

        {/* Footer with Close Button */}
        <div className="border-t border-base-300 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-content rounded-full hover:bg-primary/90 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;
