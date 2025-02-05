import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Questions Fréquentes
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Comment prendre rendez-vous avec un médecin ?
              </AccordionTrigger>
              <AccordionContent>
                Pour prendre rendez-vous, il suffit de créer un compte, rechercher un médecin selon vos critères et sélectionner un créneau disponible. Vous recevrez une confirmation par email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Comment fonctionne la téléconsultation ?
              </AccordionTrigger>
              <AccordionContent>
                La téléconsultation se fait via notre plateforme sécurisée. Au moment du rendez-vous, connectez-vous à votre compte et rejoignez la salle d'attente virtuelle. Le médecin vous contactera à l'heure prévue.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Comment annuler ou modifier un rendez-vous ?
              </AccordionTrigger>
              <AccordionContent>
                Vous pouvez annuler ou modifier votre rendez-vous jusqu'à 24h avant l'heure prévue. Connectez-vous à votre compte, allez dans "Mes rendez-vous" et sélectionnez l'option souhaitée.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Les consultations sont-elles remboursées ?
              </AccordionTrigger>
              <AccordionContent>
                Les consultations sont remboursées selon les mêmes conditions qu'une consultation classique. Une feuille de soins électronique vous sera envoyée après la consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;