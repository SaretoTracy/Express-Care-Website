import  { Shield, TrendingUp, Briefcase, Clock, Eye } from "lucide-react";



export const CaregiverHero = () => {
  const benefits = [
    {
      icon: Shield,
      text: "Get verified and increase your trust score",
    },
    {
      icon: TrendingUp,
      text: "Providers are 3× more likely to hire verified caregivers",
    },
    {
      icon: Briefcase,
      text: "Unlock more job opportunities",
    },
    {
      icon: Clock,
      text: "Faster approval during recruitment",
    },
    {
      icon: Eye,
      text: "Boost your profile visibility to agencies",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#557a95] via-[#4a6a82] to-[#3d5a6f] overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Heading */}
        <div className="max-w-2xl mb-20">
          <h1 className="text-white mb-8">
            Why becoming a verified caregiver is your perfect partner in your journey to career success?
          </h1>
        </div>

        {/* Floating Benefits */}
        <div className="relative h-[600px]">
          {/* First benefit - top left */}
          <div
            className="absolute left-0 top-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e68a1f] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {benefits[0].text}
              </p>
            </div>
          </div>

          {/* Second benefit - top right */}
          <div
            className="absolute right-0 top-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e68a1f] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {benefits[1].text}
              </p>
            </div>
          </div>

          {/* Third benefit - middle */}
          <div
            className="absolute left-1/4 top-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            style={{ animation: "float 8s ease-in-out infinite 1s" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e68a1f] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {benefits[2].text}
              </p>
            </div>
          </div>

          {/* Fourth benefit - bottom left */}
          <div
            className="absolute left-12 bottom-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            style={{ animation: "float 7.5s ease-in-out infinite 1.5s" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e68a1f] flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {benefits[3].text}
              </p>
            </div>
          </div>

          {/* Fifth benefit - bottom right */}
          <div
            className="absolute right-12 bottom-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-xs hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            style={{ animation: "float 6.5s ease-in-out infinite 2s" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e68a1f] flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm leading-relaxed">
                {benefits[4].text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e68a1f]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
