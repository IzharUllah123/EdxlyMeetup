import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Moon, Sun, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import NavigationDropdown from "@/components/NavigationDropdown";
import AuthModal from "@/components/AuthModal";
import connectedLogo from "@/assets/connected-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"sign_in" | "sign_up">("sign_in");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { name: "Explore", href: "/explore", hasDropdown: true },
    { name: "Practice", href: "/practice" },
    { name: "Live Classes", href: "/live-classes" },
    { name: "Resources", href: "/resources", hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={connectedLogo} alt="EDXLY" className="h-8 w-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EDXLY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => 
            item.hasDropdown ? (
              <NavigationDropdown
                key={item.name}
                title={item.name}
                items={
                  item.name === "Explore" 
                    ? [
                        { title: "Math", href: "/curriculum/math/Pre-K", description: "Numbers, algebra, geometry and more" },
                        { title: "Language Arts", href: "/curriculum/language-arts/Pre-K", description: "Reading, writing, grammar and vocabulary" },
                        { title: "Science", href: "/curriculum/science/Pre-K", description: "Biology, chemistry, physics and earth science" },
                        { title: "Social Studies", href: "/curriculum/social-studies/Pre-K", description: "History, geography, civics and culture" },
                        { title: "Spanish", href: "/curriculum/spanish/Pre-K", description: "Learn Spanish vocabulary and grammar" },
                      ]
                    : [
                        { title: "Study Guides", href: "/resources/study-guides", description: "Comprehensive study materials" },
                        { title: "Worksheets", href: "/resources/worksheets", description: "Printable practice worksheets" },
                        { title: "Student Portal Features", href: "/resources/student-portal", description: "Everything students need for learning" },
                        { title: "Admin Panel Features", href: "/resources/admin-panel", description: "Comprehensive administrative tools" },
                        { title: "Educational Games", href: "/resources/games", description: "Fun learning games and activities" },
                        { title: "Parent Resources", href: "/resources/parents", description: "Tools and tips for parents" },
                      ]
                }
              />
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 hover:scale-105 transform"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses, subjects..."
              className="pl-10 pr-4 py-2 bg-muted/50 border-0 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-1"
              onClick={() => {
                setAuthView("sign_in");
                setAuthModalOpen(true);
              }}
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            <Button 
              className="btn-hero"
              onClick={() => {
                setAuthView("sign_up");
                setAuthModalOpen(true);
              }}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses, subjects..."
                className="pl-10 pr-4 py-2 bg-muted/50 border-0"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/80 hover:text-foreground py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  setAuthView("sign_in");
                  setAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button 
                className="btn-hero justify-start"
                onClick={() => {
                  setAuthView("sign_up");
                  setAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        view={authView}
      />
    </header>
  );
};

export default Header;
