import { Zap, Shield, TrendingUp } from "lucide-react";

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
  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-transparent to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">URL SHORTNER</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create, manage, and track powerful short links
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 space-y-4 hover:scale-105 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
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
