import React from "react";

const KeyFeatures = () => {
  const features = [
    "Student Portal: Post tuition requirements, track applications.",
    "Tutor Portal: Browse posts, apply, communicate with students.",
    "Admin Dashboard: Verify tutors, approve posts, manage disputes.",
    "Secure Payments: Transparent tuition payment tracking.",
    "Communication Tools: Built-in messaging for students & tutors.",
  ];
  return (
    <div>
      <section className="bg-base-200 py-16 md:px-20">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center">
          Key Features
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-base-100 shadow-md rounded-xl p-6 w-72 md:w-80 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <p className="text-base-content text-lg leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KeyFeatures;
