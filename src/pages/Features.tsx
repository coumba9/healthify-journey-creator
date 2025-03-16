import React from "react";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BackButton />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Nos Fonctionnalités
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Découvrez tout ce que notre plateforme peut faire pour vous
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Téléconsultation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Téléconsultation</h3>
              <p className="mt-2 text-gray-600">
                Consultez vos médecins à distance en toute sécurité
              </p>
            </div>

            {/* Gestion des rendez-vous */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des RDV</h3>
              <p className="mt-2 text-gray-600">
                Planifiez et gérez vos rendez-vous en quelques clics
              </p>
            </div>

            {/* Dossier médical */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">Dossier médical</h3>
              <p className="mt-2 text-gray-600">
                Accédez à votre historique médical en toute sécurité
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/register">Commencer maintenant</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
