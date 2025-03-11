
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MonitorSmartphone,
  Copy,
  CheckCircle2,
} from "lucide-react";

interface VideoConsultationProps {
  appointmentId: string;
  doctorName?: string;
  patientName?: string;
  isDoctor?: boolean;
}

const VideoConsultation = ({
  appointmentId,
  doctorName,
  patientName,
  isDoctor = false,
}: VideoConsultationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [roomUrl, setRoomUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Simuler la génération d'une URL de salle de conférence
  useEffect(() => {
    // Dans une implémentation réelle, cette URL serait générée côté serveur ou via un service tiers
    const generatedRoomUrl = `https://meet.example.com/${appointmentId}`;
    setRoomUrl(generatedRoomUrl);
  }, [appointmentId]);

  // Simuler l'initialisation de la caméra locale
  useEffect(() => {
    if (isCameraOn && localVideoRef.current) {
      // Demander l'accès à la caméra
      const setupLocalVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: isMicOn,
          });
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          console.log("Caméra locale initialisée avec succès");
        } catch (error) {
          console.error("Erreur lors de l'accès à la caméra:", error);
          toast({
            title: "Erreur d'accès à la caméra",
            description: "Veuillez vérifier que vous avez autorisé l'accès à la caméra dans votre navigateur.",
            variant: "destructive",
          });
          setIsCameraOn(false);
        }
      };

      setupLocalVideo();

      // Cleanup
      return () => {
        const stream = localVideoRef.current?.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [isCameraOn, isMicOn, toast]);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOn;
      });
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
    }
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });
        
        if (localVideoRef.current) {
          // Sauvegarder le flux de la caméra pour le restaurer plus tard
          const oldStream = localVideoRef.current.srcObject as MediaStream;
          if (oldStream) {
            oldStream.getTracks().forEach(track => track.stop());
          }
          
          localVideoRef.current.srcObject = screenStream;
          setIsScreenSharing(true);
          
          // Arrêter le partage d'écran lorsque l'utilisateur termine
          screenStream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false);
            // Réactiver la caméra
            navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
              .then(stream => {
                if (localVideoRef.current) {
                  localVideoRef.current.srcObject = stream;
                }
              });
          };
        }
      } catch (error) {
        console.error("Erreur lors du partage d'écran:", error);
        toast({
          title: "Erreur de partage d'écran",
          description: "Impossible de partager votre écran. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } else {
      // Revenir à la caméra
      setIsScreenSharing(false);
      navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        });
    }
  };

  const handleConnect = () => {
    console.log("Connexion à la visioconférence...");
    // Dans une implémentation réelle, nous nous connecterions à un service de visioconférence
    toast({
      title: "Connexion en cours",
      description: "Connexion à la salle de visioconférence...",
    });
    
    // Simuler une connexion réussie après un délai
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connecté",
        description: "Vous êtes maintenant connecté à la consultation vidéo.",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    console.log("Déconnexion de la visioconférence...");
    setIsConnected(false);
    
    // Arrêt de tous les flux média
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    toast({
      title: "Déconnecté",
      description: "Vous avez quitté la consultation vidéo.",
    });
  };

  const copyRoomUrl = () => {
    navigator.clipboard.writeText(roomUrl)
      .then(() => {
        setIsCopied(true);
        toast({
          title: "Lien copié",
          description: "Le lien de la salle a été copié dans le presse-papier.",
        });
        
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch(err => {
        console.error("Erreur lors de la copie:", err);
        toast({
          title: "Erreur",
          description: "Impossible de copier le lien. Veuillez réessayer.",
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          Téléconsultation {isDoctor ? `avec ${patientName}` : `avec Dr. ${doctorName}`}
        </CardTitle>
        <CardDescription>
          ID de rendez-vous: {appointmentId}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              {isDoctor ? `Dr. ${user?.name || 'Médecin'}` : user?.name || 'Vous'}
              {!isCameraOn && " (Caméra désactivée)"}
              {!isMicOn && " (Micro désactivé)"}
            </div>
          </div>
          
          {isConnected ? (
            <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {isDoctor ? patientName || 'Patient' : `Dr. ${doctorName || 'Médecin'}`}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg bg-gray-100 aspect-video">
              <div className="text-center p-6">
                <h3 className="font-medium text-lg mb-2">
                  {isConnected ? "En attente de connexion..." : "Pas encore connecté"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {isConnected
                    ? "Veuillez patienter pendant que l'autre participant se connecte..."
                    : "Cliquez sur le bouton Connecter pour rejoindre la téléconsultation"}
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={copyRoomUrl}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Copié
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copier le lien
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 break-all">
                  {roomUrl}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant={isCameraOn ? "default" : "secondary"}
            size="sm"
            onClick={toggleCamera}
            title={isCameraOn ? "Désactiver la caméra" : "Activer la caméra"}
          >
            {isCameraOn ? (
              <Camera className="h-4 w-4" />
            ) : (
              <CameraOff className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant={isMicOn ? "default" : "secondary"}
            size="sm"
            onClick={toggleMic}
            title={isMicOn ? "Désactiver le micro" : "Activer le micro"}
          >
            {isMicOn ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant={isScreenSharing ? "destructive" : "outline"}
            size="sm"
            onClick={toggleScreenSharing}
            title={isScreenSharing ? "Arrêter le partage" : "Partager mon écran"}
          >
            <MonitorSmartphone className="h-4 w-4" />
          </Button>
        </div>
        
        {!isConnected ? (
          <Button
            onClick={handleConnect}
            className="bg-green-600 hover:bg-green-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            Se connecter
          </Button>
        ) : (
          <Button
            variant="destructive"
            onClick={handleDisconnect}
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            Terminer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VideoConsultation;
