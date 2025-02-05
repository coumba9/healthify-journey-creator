import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                HealthCare
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600">
                  Accueil
                </Link>
                <Link to="/doctors" className="text-gray-700 hover:text-primary-600">
                  Trouver un médecin
                </Link>
                <Link to="/features" className="text-gray-700 hover:text-primary-600">
                  Fonctionnalités
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-primary-600">
                  Tarifs
                </Link>
                <Link to="/faq" className="text-gray-700 hover:text-primary-600">
                  FAQ
                </Link>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/login">
                      <User className="mr-2 h-4 w-4" />
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">
                      <User className="mr-2 h-4 w-4" />
                      Inscription
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Link 
                to="/dashboard" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Tableau de bord
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {!user ? (
                <>
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/doctors"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Trouver un médecin
                  </Link>
                  <Link
                    to="/features"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Fonctionnalités
                  </Link>
                  <Link
                    to="/pricing"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Tarifs
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </Link>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login">
                        <User className="mr-2 h-4 w-4" />
                        Connexion
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/register">
                        <User className="mr-2 h-4 w-4" />
                        Inscription
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Tableau de bord
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;