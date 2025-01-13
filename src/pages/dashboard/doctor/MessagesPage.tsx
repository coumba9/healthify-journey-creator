import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";

const MessagesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <Input placeholder="Rechercher une conversation..." />
            <div className="space-y-2">
              {[
                { name: "Patient A", lastMessage: "Merci docteur" },
                { name: "Patient B", lastMessage: "D'accord, à bientôt" },
                { name: "Patient C", lastMessage: "Je confirme le rendez-vous" },
              ].map((conversation, index) => (
                <Card key={index} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{conversation.name}</p>
                        <p className="text-sm text-gray-600">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-6 flex flex-col h-[600px]">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {[
                    { sender: "patient", message: "Bonjour docteur" },
                    {
                      sender: "doctor",
                      message: "Bonjour, comment puis-je vous aider ?",
                    },
                    {
                      sender: "patient",
                      message: "J'aimerais prendre rendez-vous",
                    },
                  ].map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "doctor" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[70%] ${
                          message.sender === "doctor"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Écrivez votre message..." />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;