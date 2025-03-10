
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Mermaid from "@/components/documentation/Mermaid";

const UMLDiagrams = () => {
  // Diagramme de classes mis à jour
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
        +string[] documents
        +bookAppointment()
        +cancelAppointment()
        +viewMedicalRecord()
      }
      class Doctor {
        +string speciality
        +string[] availability
        +acceptAppointment()
        +rejectAppointment()
        +writePrescription()
        +updateSchedule()
      }
      class Appointment {
        +string id
        +string patientId
        +string doctorId
        +DateTime date
        +string status
        +float amount
        +sendReminder()
        +updateStatus()
      }
      class MedicalRecord {
        +string patientId
        +string[] documents
        +string[] prescriptions
        +addDocument()
        +updateRecord()
      }
      class Payment {
        +string id
        +string appointmentId
        +float amount
        +string status
        +string method
        +processPayment()
        +generateReceipt()
      }
      class Notification {
        +string userId
        +string message
        +string type
        +boolean read
        +markAsRead()
        +send()
      }
      class Document {
        +string id
        +string patientId
        +string type
        +string url
        +uploadDocument()
        +deleteDocument()
      }

      User <|-- Patient
      User <|-- Doctor
      Patient "1" -- "*" Appointment
      Doctor "1" -- "*" Appointment
      Patient "1" -- "1" MedicalRecord
      Appointment "1" -- "1" Payment
      User "1" -- "*" Notification
      MedicalRecord "1" -- "*" Document
  `;

  // Diagramme de cas d'utilisation mis à jour
  const useCaseDiagram = `
    graph TD
      Patient[Patient]
      Doctor[Médecin]
      Admin[Administrateur]
      
      Patient --> PrendreRDV[Prendre un rendez-vous]
      Patient --> VoirRDV[Voir mes rendez-vous]
      Patient --> GererProfil[Gérer mon profil]
      Patient --> VoirDossier[Voir mon dossier médical]
      Patient --> EffectuerPaiement[Effectuer un paiement]
      Patient --> TelechargerDocs[Télécharger documents]
      Patient --> GererNotifs[Gérer notifications]
      
      Doctor --> AccepterRDV[Accepter/Refuser RDV]
      Doctor --> GererPlanning[Gérer planning]
      Doctor --> ConsulterDossier[Consulter dossiers patients]
      Doctor --> Prescription[Créer prescription]
      Doctor --> AjouterDoc[Ajouter documents]
      Doctor --> EnvoyerNotif[Envoyer notifications]
      
      Admin --> GererUtilisateurs[Gérer utilisateurs]
      Admin --> GererServices[Gérer services]
      Admin --> VoirStats[Voir statistiques]
      Admin --> GererPaiements[Gérer paiements]
  `;

  // Diagramme de séquence mis à jour
  const sequenceDiagram = `
    sequenceDiagram
      participant P as Patient
      participant A as Application
      participant D as Docteur
      participant N as Notifications
      participant PM as Paiement
      
      P->>A: Demande de rendez-vous
      A->>A: Vérifie disponibilité
      A->>D: Notifie nouvelle demande
      D->>A: Accepte le rendez-vous
      A->>N: Génère notification
      N->>P: Envoie confirmation
      
      P->>PM: Initie le paiement
      PM->>PM: Traite le paiement
      PM->>A: Confirme paiement
      A->>P: Envoie ticket RDV
      
      Note over P,N: 24h avant le RDV
      N->>P: Envoie rappel SMS
      N->>D: Notifie médecin
      
      D->>A: Ajoute prescription
      A->>N: Génère notification
      N->>P: Notifie disponibilité prescription
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
