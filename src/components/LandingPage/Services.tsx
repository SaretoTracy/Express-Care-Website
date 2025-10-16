import { Heart, Briefcase, Users, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const serviceCards = [
    {
      id: 1,
      icon: Heart,
      title: "Caregiver Recruitment",
      description:
        "We help caregivers find meaningful roles with reputable providers based on skills and preferences.",
      color: "text-pink-500",
      stat: "500+ Caregivers",
    },
    {
      id: 2,
      icon: Briefcase,
      title: "Provider Partnerships",
      description:
        "Our network of trusted providers access pre-vetted, dedicated caregivers with ease.",
      color: "text-blue-500",
      stat: "200+ Providers",
    },
    {
      id: 3,
      icon: Users,
      title: "Perfect Matchmaking",
      description:
        "Over 1,200 successful matches made through personalized, efficient connections.",
      color: "text-purple-500",
      stat: "1,200+ Matches",
    },
    {
      id: 4,
      icon: Search,
      title: "Streamlined Job Search",
      description:
        "Easily browse, apply, and connect. Average response time? Just 25 minutes.",
      color: "text-green-500",
      stat: "25 min Response",
    },
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Service"
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading Section */}
        <div
          className={`transition-all duration-1000 ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-orange-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-2">
            Connecting passionate caregivers with trusted providers through
            smart matchmaking and streamlined hiring.
          </p>
        </div>

        {/* Services Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {serviceCards.map((card, index) => (
            <div
              key={card.id}
              className={`flex flex-col items-center bg-white p-6 sm:p-7 rounded-xl shadow-sm 
                          transition-all duration-500 cursor-pointer text-center
                          ${
                            hoveredCard === card.id
                              ? "shadow-xl transform -translate-y-2"
                              : "hover:shadow-md"
                          }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Icon */}
              <div
                className={`p-4 rounded-full mb-5 sm:mb-6 ${
                  hoveredCard === card.id
                    ? "bg-gray-100 animate-pulse"
                    : "bg-gray-50"
                }`}
              >
                <card.icon
                  className={`${card.color} transition-all duration-300 ${
                    hoveredCard === card.id ? "scale-110" : ""
                  }`}
                  size={32}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Stat on hover */}
              <div
                className={`mt-auto pt-2 font-medium ${card.color} opacity-0 transform translate-y-4 transition-all duration-300 
                            ${hoveredCard === card.id ? "opacity-100 translate-y-0" : ""}`}
              >
                {card.stat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
