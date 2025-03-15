
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
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  X
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{id: number, sender: string, text: string, timestamp: string}[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Simuler la génération d'une URL de salle de conférence
  useEffect(() => {
    // Dans une implémentation réelle, cette URL serait générée côté serveur ou via un service tiers
    const generatedRoomUrl = `https://meet.example.com/${appointmentId}`;
    setRoomUrl(generatedRoomUrl);
  }, [appointmentId]);

  // Simuler l'initialisation de la caméra locale
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const constraints = {
          video: isCameraOn,
          audio: isMicOn
        };
        
        if (!constraints.video && !constraints.audio) {
          return; // Si les deux sont désactivés, ne pas demander l'accès aux périphériques
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
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
        
        // En cas d'erreur, désactiver la caméra et/ou le micro
        if (isCameraOn) setIsCameraOn(false);
        if (isMicOn) setIsMicOn(false);
      }
    };

    if (isConnected || (isCameraOn || isMicOn)) {
      setupCamera();
    }

    // Cleanup
    return () => {
      const stream = localVideoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isConnected, isCameraOn, isMicOn, toast]);
  
  // Faire défiler le chat vers le bas quand de nouveaux messages sont ajoutés
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
      
      // Simuler la vidéo du correspondant après un court délai
      setTimeout(() => {
        if (remoteVideoRef.current) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
              }
            })
            .catch(err => {
              console.error("Erreur lors de la simulation de vidéo distante:", err);
            });
        }
      }, 2000);
    }, 1500);
  };

  const handleDisconnect = () => {
    console.log("Déconnexion de la visioconférence...");
    setIsConnected(false);
    
    // Arrêt de tous les flux média
    const localStream = localVideoRef.current?.srcObject as MediaStream;
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    const remoteStream = remoteVideoRef.current?.srcObject as MediaStream;
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
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
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setChatMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");
    
    // Simuler une réponse de l'autre participant après un délai
    setTimeout(() => {
      const responseText = isDoctor 
        ? "Merci pour ces informations. Pouvez-vous me montrer la zone affectée via la caméra ?"
        : "Je vais examiner cela. Avez-vous d'autres symptômes à me signaler ?";
        
      const responseMessage = {
        id: Date.now() + 1,
        sender: "other",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setChatMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 2000);
  };

  return (
    <div className="relative">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Téléconsultation {isDoctor ? `avec ${patientName}` : `avec Dr. ${doctorName}`}
              </CardTitle>
              <CardDescription>
                ID de rendez-vous: {appointmentId}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </Button>
          </div>
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
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                  <p className="text-white text-lg">Caméra désactivée</p>
                </div>
              )}
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
      
      {/* Chat flottant */}
      {isChatOpen && (
        <div className="fixed right-4 bottom-4 w-80 h-96 bg-white rounded-lg shadow-xl border overflow-hidden z-50 flex flex-col">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat consultation</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {chatMessages.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun message</p>
                <p className="text-xs">Échangez des messages pendant la consultation</p>
              </div>
            ) : (
              chatMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-2 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 border-t">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Votre message..."
                className="min-h-10 text-sm resize-none p-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                size="sm" 
                className="h-auto"
                onClick={handleSendMessage}
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
