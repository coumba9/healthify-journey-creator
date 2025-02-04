import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/" className="text-gray-700 hover:text-primary-600">
              Accueil
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-primary-600">
              Trouver un médecin
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary-600">
              Services
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-primary-600">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Espace patient
              </Button>
              <Button className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Espace médecin
              </Button>
            </div>
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
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/faq"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-4 space-y-2">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <User className="mr-2 h-4 w-4" />
                  Espace patient
                </Button>
                <Button className="w-full flex items-center justify-center">
                  <User className="mr-2 h-4 w-4" />
                  Espace médecin
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;