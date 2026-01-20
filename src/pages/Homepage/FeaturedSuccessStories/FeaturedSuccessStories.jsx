import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import useAxios from "../../../hooks/useAxios";
import LoadingLottie from "../../../components/Lotties/LoadingLottie";

const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Student",
    rating: 5,
    text: "Found the perfect tutor through eTuitionBD. My grades improved significantly within 3 months!",
    image:
      "https://vheer.com/_next/image?url=%2Fimages%2FlandingPages%2Fai_profile_picture_generator%2Fpreview_image_1.webp&w=1080&q=75",
  },
  {
    id: 2,
    name: "Karim Hassan",
    role: "Tutor",
    rating: 5,
    text: "Amazing platform to connect with dedicated students. The interface is user-friendly and payments are secure.",
    image:
      "https://imgv3.fotor.com/images/ai-headshot-generator/AI-generated-headshot-of-a-man-wearing-black-and-white-business-suit-and-tie-with-his-back-to-the-window-by-Fotor-AI-LinkedIn-photo-generator.jpg",
  },
  {
    id: 3,
    name: "Fatima Khan",
    role: "Student",
    rating: 5,
    text: "Struggled with Math until I joined eTuitionBD. Now I'm getting A+ scores. Highly recommended!",
    image: "https://www.profilebakery.com/wp-content/uploads/2025/05/sunset-shooting-2-796x1024.jpg",
  },
  {
    id: 4,
    name: "Amit Das",
    role: "Tutor",
    rating: 5,
    text: "Great community of students wanting to learn. The platform makes scheduling and tracking progress so easy.",
    image: "https://mockmind-api.uifaces.co/content/human/80.jpg",
  },
];

const FeaturedSuccessStories = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/api/testimonials");
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Keep default testimonials if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [axiosInstance]);
  
  if (loading) return <LoadingLottie></LoadingLottie>;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Featured <span className="text-primary">Success Stories</span>
          </h2>
          <p className="text-base-content/70 text-lg">
            Real stories from real students and tutors
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-xl bg-base-200 border border-base-300
              hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <FaStar key={i} size={16} className="text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-base-content/80 mb-4 text-sm leading-relaxed line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-base-300">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-base-content text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-base-content/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSuccessStories;
