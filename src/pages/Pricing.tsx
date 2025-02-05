import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Nos Tarifs
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Des solutions adaptées à vos besoins
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Forfait Basic */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
            <p className="mt-4 text-4xl font-bold">Gratuit</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Prise de rendez-vous en ligne
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Rappels par email
              </li>
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link to="/register">Commencer</Link>
            </Button>
          </div>

          {/* Forfait Pro */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-primary-500">
            <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
            <p className="mt-4 text-4xl font-bold">29€/mois</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Toutes les fonctionnalités Basic
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Téléconsultation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Support prioritaire
              </li>
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link to="/register?plan=pro">Essai gratuit</Link>
            </Button>
          </div>

          {/* Forfait Enterprise */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
            <p className="mt-4 text-4xl font-bold">Sur mesure</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Toutes les fonctionnalités Pro
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                API personnalisée
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Support dédié
              </li>
            </ul>
            <Button className="mt-8 w-full" variant="outline" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;