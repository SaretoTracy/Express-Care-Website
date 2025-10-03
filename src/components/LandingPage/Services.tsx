import { Heart, Briefcase, Users, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const Services = () => {
  // Track which service card is being hovered
  const [hoveredCard, setHoveredCard] = useState(null);
  // Track if elements should be visible (for animation on mount)
  const [isVisible, setIsVisible] = useState(false);
  // Track if we've scrolled to the services section
  const [inView, setInView] = useState(false);

  // Service card data
  const serviceCards = [
    {
      id: 1,
      icon: Heart,
      title: "Caregiver Recruitment",
      description: "We help caregivers find meaningful roles with reputable providers based on skills and preferences.",
      color: "text-pink-500",
      stat: "500+ Caregivers"
    },
    {
      id: 2,
      icon: Briefcase,
      title: "Provider Partnerships",
      description: "Our network of trusted providers access pre-vetted, dedicated caregivers with ease.",
      color: "text-blue-500",
      stat: "200+ Providers"
    },
    {
      id: 3,
      icon: Users,
      title: "Perfect Matchmaking",
      description: "Over 1,200 successful matches made through personalized, efficient connections.",
      color: "text-purple-500",
      stat: "1,200+ Matches"
    },
    {
      id: 4,
      icon: Search,
      title: "Streamlined Job Search",
      description: "Easily browse, apply, and connect. Average response time? Just 25 minutes.",
      color: "text-green-500",
      stat: "25 min Response"
    }
  ];

  // Simulate intersection observer effect
  useEffect(() => {
    // On component mount, set visible after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // After a bit more delay, trigger the in-view animation
      setTimeout(() => setInView(true), 300);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id='Service' className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 relative">
            Our Services
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
            Connecting passionate caregivers with trusted providers through smart matchmaking and streamlined hiring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((card, index) => (
            <div 
              key={card.id}
              className={`flex flex-col items-center bg-white p-6 rounded-xl shadow-sm 
                          transition-all duration-500 cursor-pointer 
                          ${hoveredCard === card.id ? 'shadow-xl transform -translate-y-2' : 'shadow hover:shadow-md'} 
                          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`p-4 rounded-full mb-6 ${hoveredCard === card.id ? 'bg-gray-100 animate-pulse' : 'bg-gray-50'}`}>
                <card.icon 
                  className={`${card.color} transition-all duration-300 
                            ${hoveredCard === card.id ? 'transform scale-110' : ''}`} 
                  size={32} 
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {card.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-6">
                {card.description}
              </p>
              
              <div className={`mt-auto pt-4 font-medium ${card.color} opacity-0 transform translate-y-4 transition-all duration-300 
                             ${hoveredCard === card.id ? 'opacity-100 translate-y-0' : ''}`}>
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