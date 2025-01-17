import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MessagesPage = () => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const messages = [
    { id: 1, sender: "Dr. Smith", content: "Bonjour, comment allez-vous ?", time: "10:30", isMe: false },
    { id: 2, sender: "Vous", content: "Bonjour docteur, je vais bien merci.", time: "10:32", isMe: true },
    { id: 3, sender: "Dr. Smith", content: "Parfait ! N'oubliez pas votre rendez-vous demain.", time: "10:35", isMe: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès.",
      });
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Messages</h1>
        
        <Card className="flex-1">
          <CardContent className="p-6 flex flex-col h-[calc(100vh-250px)]">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.isMe
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.isMe && (
                        <User className="h-4 w-4" />
                      )}
                      <p className="font-semibold text-sm">{msg.sender}</p>
                    </div>
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Input 
                placeholder="Écrivez votre message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;