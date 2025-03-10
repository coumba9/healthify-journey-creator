
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Mermaid from "@/components/documentation/Mermaid";

const UMLDiagrams = () => {
  // Diagramme de classes
  const classDiagram = `
    classDiagram
      class User {
        +string id
        +string name
        +string email
        +string role
        +string phone
        +updateProfile()
      }
      class Patient {
        +string[] allergies
        +string[] medications
        +bookAppointment()
        +cancelAppointment()
      }
      class Doctor {
        +string speciality
        +string[] availability
        +acceptAppointment()
        +rejectAppointment()
      }
      class Appointment {
        +string id
        +string patientId
        +string doctorId
        +string date
        +string time
        +string status
        +sendReminder()
      }
      class MedicalRecord {
        +string patientId
        +string[] documents
        +string[] prescriptions
      }

      User <|-- Patient
      User <|-- Doctor
      Patient "1" -- "*" Appointment
      Doctor "1" -- "*" Appointment
      Patient "1" -- "1" MedicalRecord
  `;

  // Diagramme de cas d'utilisation
  const useCaseDiagram = `
    graph TD
      Patient[Patient]
      Doctor[Médecin]
      Admin[Administrateur]
      
      Patient --> PrendreRDV[Prendre un rendez-vous]
      Patient --> VoirRDV[Voir mes rendez-vous]
      Patient --> GererProfil[Gérer mon profil]
      Patient --> VoirDossier[Voir mon dossier médical]
      
      Doctor --> AccepterRDV[Accepter/Refuser RDV]
      Doctor --> GererPlanning[Gérer planning]
      Doctor --> ConsulterDossier[Consulter dossiers patients]
      Doctor --> Prescription[Créer prescription]
      
      Admin --> GererUtilisateurs[Gérer utilisateurs]
      Admin --> GererServices[Gérer services]
      Admin --> VoirStats[Voir statistiques]
  `;

  // Diagramme de séquence
  const sequenceDiagram = `
    sequenceDiagram
      participant P as Patient
      participant A as Application
      participant D as Docteur
      participant N as Notifications
      
      P->>A: Demande de rendez-vous
      A->>A: Vérifie disponibilité
      A->>D: Notifie nouvelle demande
      D->>A: Accepte le rendez-vous
      A->>N: Génère notification
      N->>P: Envoie confirmation (SMS/Email)
      Note over P,N: Le patient reçoit la confirmation
      
      alt Rappel de rendez-vous
        N->>P: Envoie rappel 24h avant
      end
  `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagrammes UML de l'Application</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classes">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="usecase">Cas d'utilisation</TabsTrigger>
            <TabsTrigger value="sequence">Séquence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Diagramme de Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <Mermaid chart={classDiagram} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usecase">
            <Card>
              <CardHeader>
                <CardTitle>Diagramme de Cas d'Utilisation</CardTitle>
              </CardHeader>
              <CardContent>
                <Mermaid chart={useCaseDiagram} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sequence">
            <Card>
              <CardHeader>
                <CardTitle>Diagramme de Séquence</CardTitle>
              </CardHeader>
              <CardContent>
                <Mermaid chart={sequenceDiagram} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UMLDiagrams;
