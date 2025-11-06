import { Zap, Shield, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Zap,
    title: "AI-Generated Unique Links",
    description: "Smart algorithms create memorable, SEO-friendly short links that stand out and rank better.",
  },
  {
    icon: Shield,
    title: "Fast & Reliable Redirects",
    description: "Lightning-fast redirects with 99.9% uptime. Your links work everywhere, every time.",
  },
  {
    icon: TrendingUp,
    title: "Track Clicks in Real Time",
    description: "Detailed analytics dashboard to monitor clicks, locations, devices, and performance insights.",
  },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Why Choose <span className="gradient-text">URL SHORTNER</span>?
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, manage, and track powerful short links with enterprise-grade features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`glass-card rounded-3xl p-10 space-y-6 hover:scale-105 transition-all duration-500 group cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-glow-hover transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
