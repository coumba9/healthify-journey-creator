
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Camera, CameraOff, Phone, MonitorUp, MessageSquare, Users, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const TeleconsultationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const appointmentId = id || location.state?.appointmentId;
  
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicActive, setIsMicActive] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  useEffect(() => {
    if (!appointmentId) {
      toast({
        title: "Erreur",
        description: "ID de consultation non trouvé",
        variant: "destructive",
      });
      navigate('/dashboard/appointments');
      return;
    }
    
    toast({
      title: "Téléconsultation",
      description: "Connexion en cours...",
    });
    
    // Simuler une connexion
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      toast({
        title: "Connexion établie",
        description: "Vous êtes connecté à la téléconsultation",
      });
      
      // Demander l'accès à la caméra et au micro
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Erreur lors de l'accès aux périphériques:", err);
          toast({
            title: "Erreur d'accès",
            description: "Impossible d'accéder à votre caméra ou microphone",
            variant: "destructive",
          });
        });
        
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      
      // Arrêter tous les streams lors du nettoyage
      if (localVideoRef.current?.srcObject) {
        const tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [appointmentId, navigate, toast]);
  
  const toggleMic = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicActive(!isMicActive);
    }
  };
  
  const toggleCamera = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraActive(!isCameraActive);
    }
  };
  
  const toggleScreenSharing = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true 
        });
        
        if (localVideoRef.current) {
          // Sauvegarder le stream de la caméra
          const oldStream = localVideoRef.current.srcObject;
          
          // Remplacer par le stream du partage d'écran
          localVideoRef.current.srcObject = screenStream;
          
          // Quand le partage d'écran s'arrête
          screenStream.getVideoTracks()[0].onended = () => {
            localVideoRef.current.srcObject = oldStream;
            setIsScreenSharing(false);
          };
        }
        setIsScreenSharing(true);
      } else {
        // Arrêter le partage d'écran
        if (localVideoRef.current?.srcObject) {
          const tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          
          // Réactiver la caméra
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          localVideoRef.current.srcObject = stream;
        }
        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error("Erreur lors du partage d'écran:", err);
      toast({
        title: "Erreur",
        description: "Impossible de partager votre écran",
        variant: "destructive",
      });
    }
  };
  
  const endCall = () => {
    toast({
      title: "Consultation terminée",
      description: "La téléconsultation est terminée",
    });
    navigate('/dashboard/appointments');
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simuler une réponse du médecin
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: "doctor",
        text: "J'ai bien reçu votre message. Pouvez-vous me montrer la zone concernée ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };
  
  if (isConnecting) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Connexion en cours...</h2>
          <p className="text-gray-500">Veuillez patienter pendant que nous établissons la connexion</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Téléconsultation</h1>
          <p className="text-sm text-gray-300">Dr. Sophie Martin • Cardiologie</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={endCall}
          >
            <Phone className="h-4 w-4 mr-1" /> 
            Terminer
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className={`flex-1 relative ${isChatOpen ? 'md:w-3/4' : 'w-full'}`}>
          {/* Vidéo principale (médecin) */}
          <div className="w-full h-full bg-black flex items-center justify-center">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            >
              {/* Vidéo de fallback si pas de connexion */}
              <source src="/doctor-placeholder.mp4" type="video/mp4" />
            </video>
            
            {/* Vidéo locale (patient) */}
            <div className="absolute bottom-4 right-4 w-1/4 h-1/4 max-w-[200px] max-h-[150px] border-2 border-white rounded-lg overflow-hidden shadow-lg">
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              ></video>
            </div>
          </div>
          
          {/* Contrôles */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            <Button
              variant={isMicActive ? "default" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg"
              onClick={toggleMic}
            >
              {isMicActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isCameraActive ? "default" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg"
              onClick={toggleCamera}
            >
              {isCameraActive ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
            </Button>
            
            <Button
              variant={isScreenSharing ? "secondary" : "default"}
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg"
              onClick={toggleScreenSharing}
            >
              <MonitorUp className="h-5 w-5" />
            </Button>
            
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg"
              onClick={endCall}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Chat */}
        {isChatOpen && (
          <div className="w-full md:w-1/4 bg-white border-l border-gray-200 flex flex-col h-full">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-semibold">Messages</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsChatOpen(false)}
              >
                &times;
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aucun message</p>
                  <p className="text-sm">Vous pouvez envoyer un message au médecin</p>
                </div>
              ) : (
                messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'me' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
              <Textarea
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="min-h-[44px] resize-none"
              />
              <Button type="submit">Envoyer</Button>
            </form>
          </div>
        )}
      </div>
      
      {/* Toolbar */}
      <div className="bg-gray-800 p-2 flex justify-center gap-2 md:hidden">
        <Button
          variant="outline"
          size="sm"
          className="text-white border-gray-600"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="text-white border-gray-600"
        >
          <FileText className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="text-white border-gray-600"
        >
          <Users className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TeleconsultationPage;
