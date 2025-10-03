import React, { useState, useEffect, useCallback } from 'react';
import { FaHeartbeat, FaUserNurse, FaHospitalUser, FaChartLine, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import care from '/care5.jpg';
import fourLanding from '/four-landing.jpg';
import threeLanding from '/three-landing.jpg';
import { YellowLink } from '../components/ButtonComponents/YellowLink'

// Constants
const COLORS = {
  primary: '#557A95',
  accent: '#FF9923',
  white: '#FFFFFF',
} as const;

const SLIDE_INTERVAL = 5000;

// Types
interface SlideData {
  image: string;
  title: string;
  description: string;
}

interface TabData {
  id: string;
  label: string;
  icon: React.ComponentType;
  content: {
    title: string;
    description: string;
    buttonText: string;
    linkTo: string;
  };
}

interface MetricData {
  label: string;
  value: string;
  color: string;
  icon: React.ComponentType;
}

// Data
const SLIDES: SlideData[] = [
  { image: care, title: "Professional Care", description: "Experienced caregivers ready to help" },
  { image: fourLanding, title: "Home Care Providers", description: "Quality care in comfortable settings" },
  { image: threeLanding, title: "Specialized Services", description: "Meeting unique caregiving needs" }
];

const TABS: TabData[] = [
  {
    id: 'caregivers',
    label: 'Caregivers',
    icon: FaUserNurse,
    content: {
      title: 'Find Your Next Opportunity',
      description: 'Browse positions that match your skills, experience, and preferences',
      buttonText: 'Get Started',
      linkTo: '/caregiver'
    }
  },
  {
    id: 'providers',
    label: 'Providers',
    icon: FaHospitalUser,
    content: {
      title: 'Find Quality Caregivers',
      description: 'Post your positions and connect with qualified caregivers in your area',
      buttonText: 'Post a position',
      linkTo: '/provider'
    }
  }
];

const METRICS: MetricData[] = [
  { label: 'Average Response', value: '25 min', color: COLORS.primary, icon: FaChartLine },
  { label: 'Match Rate', value: '94%', color: COLORS.accent, icon: FaChartLine }
];

// Subcomponents
const DecorativeElements: React.FC = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute top-20 left-12 w-32 h-32 rounded-full bg-white/5 animate-pulse" />
    <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/3 right-10 w-28 h-28 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute right-1/4 bottom-10 w-20 h-20 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1.5s' }} />
  </div>
);

const CurvedDecoration: React.FC = () => (
  <div className="absolute bottom-0 left-0 w-full h-96 z-0 overflow-hidden">
    <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-full">
      <path 
        fill="rgba(255, 153, 35, 0.05)" 
        d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,229.3C960,235,1056,213,1152,181.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
);

const Header: React.FC = () => (
  <div className="flex justify-between items-center mb-12">
    <div className="flex items-center group transition-transform hover:scale-105">
      <div className="text-4xl mr-3" style={{ color: COLORS.accent }}>
        <FaHeartbeat />
      </div>
      <h1 className="text-3xl font-bold text-white">
        Express <span style={{ color: COLORS.accent }}>Care</span> Team
      </h1>
    </div>
  </div>
);

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => (
  <div className="flex space-x-4 mb-8">
    {TABS.map(({ id, label, icon: Icon }) => (
      <button 
        key={id}
        onClick={() => onTabChange(id)}
        className={`px-6 py-3 rounded-full flex items-center ${
          activeTab === id ? 'text-white' : 'bg-white/10 text-white'
        }`}
        style={{ 
          backgroundColor: activeTab === id ? COLORS.accent : 'rgba(255,255,255,0.1)' 
        }}
      >
        <Icon className="mr-2" />
        {label}
      </button>
    ))}
  </div>
);

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const currentTab = TABS.find(tab => tab.id === activeTab);
  
  if (!currentTab) return null;
  
  const { title, description, buttonText, linkTo } = currentTab.content;
  
  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      <YellowLink btnPro={buttonText} linkTo={linkTo} />
    </div>
  );
};

interface SliderProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const ImageSlider: React.FC<SliderProps> = ({ currentSlide, onSlideChange }) => {
  const nextSlide = useCallback(() => {
    onSlideChange((currentSlide + 1) % SLIDES.length);
  }, [currentSlide, onSlideChange]);
  
  const prevSlide = useCallback(() => {
    onSlideChange(currentSlide === 0 ? SLIDES.length - 1 : currentSlide - 1);
  }, [currentSlide, onSlideChange]);
  
  return (
    <div className="relative h-64 w-full">
      <div 
        className="h-full w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div key={index} className="h-full w-full flex-shrink-0 relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h3 className="font-semibold text-lg">{slide.title}</h3>
              <p className="text-sm text-white/80">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
      
      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
        {SLIDES.map((_, index) => (
          <button 
            key={index} 
            onClick={() => onSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const FloatingMetric: React.FC = () => (
  <div 
    className="absolute -top-5 -right-5 text-white p-5 rounded-2xl shadow-lg flex flex-col items-center" 
    style={{ backgroundColor: COLORS.accent }}
  >
    <div className="text-4xl font-bold">Several Jobs</div>
    <div className="text-sm font-medium">Available Now</div>
  </div>
);

const MetricCards: React.FC = () => (
  <div className="flex space-x-4 mt-6">
    {METRICS.map(({ label, value, color, icon: Icon }, index) => (
      <div key={index} className="flex-1 bg-white p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="text-xl" style={{ color }}>
            <Icon />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SliderLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('caregivers');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="bg-primary relative overflow-hidden min-h-[600px]" 
      style={{ backgroundColor: COLORS.primary }}
    >
      <DecorativeElements />
      <CurvedDecoration />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Header />
        
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          {/* Left Column */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-white">Always in touch</span><br />
              <span className="text-white/80">with your</span><br />
              <span className="font-extrabold" style={{ color: COLORS.accent }}>
                caregiving network
              </span>
            </h2>
            
            <p className="text-white/90 text-lg mb-8">
              Connecting compassionate caregivers with quality care providers in your community
            </p>
            
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <TabContent activeTab={activeTab} />
          </div>
          
          {/* Right Column */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-2xl p-5 shadow-lg overflow-hidden">
                <ImageSlider 
                  currentSlide={currentSlide} 
                  onSlideChange={handleSlideChange} 
                />
              </div>
              
              <FloatingMetric />
              <MetricCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderLanding;