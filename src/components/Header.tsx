import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/10 glass-card shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg group-hover:shadow-glow-hover transition-all duration-300 group-hover:scale-110">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold gradient-text">URL SHORTNER</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <Link to="/" className="transition-all duration-300 hover:text-primary hover:scale-110 relative group">
            <span>Home</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link to="/about" className="transition-all duration-300 hover:text-primary hover:scale-110 relative group">
            <span>About</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link to="/contact" className="transition-all duration-300 hover:text-primary hover:scale-110 relative group">
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link to="/privacy" className="transition-all duration-300 hover:text-primary hover:scale-110 relative group">
            <span>Privacy</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>
        
        <button className="md:hidden p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
