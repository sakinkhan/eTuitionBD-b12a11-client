import React from "react";

const HowPlatformWorks = () => {
  return (
    <div className="py-16 bg-base-200">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-2">
          How the <span className="text-primary">eTuitionBD</span> Platform
          Works
        </h2>

        <div className="w-24 h-1 bg-secondary mx-auto mt-5 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-5 md:px-20 text-center">
        {/* Step 1 */}
        <div className="bg-base-100 shadow-lg rounded-3xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="font-bold text-xl mb-2">Post Your Tuition</h3>
          <p className="text-base-content/70">
            Students register & create tuition posts with subject, class,
            location & budget. Admin verifies quality.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-base-100 shadow-lg rounded-3xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-4">👩‍🏫</div>
          <h3 className="font-bold text-xl mb-2">Apply & Connect</h3>
          <p className="text-base-content/70">
            Tutors browse posts, apply with qualifications & expected salary.
            Students review & approve tutors.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-base-100 shadow-lg rounded-3xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="font-bold text-xl mb-2">Confirm & Pay</h3>
          <p className="text-base-content/70">
            Students complete payment via Stripe. Tutor is confirmed after
            successful payment.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-base-100 shadow-lg rounded-3xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="font-bold text-xl mb-2">Track & Manage</h3>
          <p className="text-base-content/70">
            Monitor ongoing tuitions and track payments & earnings efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowPlatformWorks;
