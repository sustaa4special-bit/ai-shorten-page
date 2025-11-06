import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-primary/10 bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-xl relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-sm font-semibold">
            <Link to="/about" className="hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              <span>About</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <span className="text-primary/30">•</span>
            <Link to="/privacy" className="hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              <span>Privacy</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <span className="text-primary/30">•</span>
            <Link to="/terms" className="hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              <span>Terms</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <span className="text-primary/30">•</span>
            <Link to="/contact" className="hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
          
          <p className="text-sm font-semibold text-muted-foreground">
            © 2025 <span className="gradient-text">URL SHORTNER</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
