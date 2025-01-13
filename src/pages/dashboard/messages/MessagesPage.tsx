import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const MessagesPage = () => {
  const messages = [
    { id: 1, sender: "Dr. Smith", content: "Bonjour, comment allez-vous ?", time: "10:30" },
    { id: 2, sender: "Vous", content: "Bonjour docteur, je vais bien merci.", time: "10:32" },
  ];

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Messages</h1>
        
        <Card className="flex-1">
          <CardContent className="p-6 flex flex-col h-[calc(100vh-250px)]">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "Vous" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "Vous"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold text-sm">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Input placeholder="Écrivez votre message..." className="flex-1" />
              <Button>
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