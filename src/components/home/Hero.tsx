import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();

  const handleSearchSuggestion = (searchTerm: string) => {
    console.log("Recherche suggérée:", searchTerm);
    // Logique de recherche à implémenter
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {!user ? (
                <>
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Prenez rendez-vous avec un</span>{" "}
                    <span className="block text-primary-600 xl:inline">
                      professionnel de santé en 3 clics !
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    24h/24, 7j/7 – Consultations en ligne ou en cabinet
                  </p>

                  <div className="mt-8 max-w-md mx-auto lg:mx-0">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Rechercher un médecin, une spécialité..."
                        className="pl-10 pr-4 py-2 w-full"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                      <span>Suggestions :</span>
                      <button 
                        onClick={() => handleSearchSuggestion("Dermatologue Paris")}
                        className="hover:text-primary-600"
                      >
                        Dermatologue Paris
                      </button>
                      <button 
                        onClick={() => handleSearchSuggestion("Urgence pédiatrique")}
                        className="hover:text-primary-600"
                      >
                        Urgence pédiatrique
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Button
                        asChild
                        className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                      >
                        <Link to="/doctors">Trouver un médecin</Link>
                      </Button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                      >
                        <Link to="/register?type=doctor">Rejoindre la plateforme</Link>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block text-primary-600">Bienvenue sur votre espace</span>
                  </h1>
                  <div className="mt-5">
                    <Button
                      asChild
                      className="px-8 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      <Link to="/dashboard">Accéder à mon tableau de bord</Link>
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-center lg:justify-start space-x-4">
                <span className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  100% sécurisé
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Certifié RGPD
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="Healthcare"
        />
      </div>
    </div>
  );
};

export default Hero;