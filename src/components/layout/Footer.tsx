import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold text-white">
              HealthCare
            </Link>
            <p className="mt-4 text-gray-300">
              Des soins de santé de qualité pour tous, accessibles et centrés sur le patient.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Cardiologie
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Neurologie
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Médecine générale
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Urgences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                123 Rue de la Santé
              </li>
              <li className="text-gray-300">
                75000 Paris
              </li>
              <li className="text-gray-300">
                +33 1 23 45 67 89
              </li>
              <li className="text-gray-300">
                contact@healthcare.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-300 text-center">
            © 2024 HealthCare. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;