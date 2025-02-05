import { Phone, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyBanner = () => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
          <div>
            <p className="text-red-700 font-medium">
              Urgence médicale ? Appelez le 15 (SAMU) ou le 112
            </p>
            <Link
              to="/first-aid"
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Consulter les conseils de premiers secours
            </Link>
          </div>
        </div>
        <a
          href="tel:15"
          className="hidden sm:flex items-center bg-red-100 px-4 py-2 rounded-md text-red-700 hover:bg-red-200 transition-colors"
        >
          <Phone className="h-4 w-4 mr-2" />
          Appeler le 15
        </a>
      </div>
    </div>
  );
};

export default EmergencyBanner;