
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ChevronDown,
  Edit2,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Définition du schéma pour le formulaire de service
const serviceFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du service doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Le prix doit être un nombre valide.",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)), {
    message: "La durée doit être un nombre valide.",
  }),
  isActive: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const ServicesPage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Cardiologie",
      description: "Soins cardiaques spécialisés et prévention des maladies cardiaques.",
      doctors: 5,
      patients: 120,
      appointments: 45,
      price: "150",
      duration: "45",
      isActive: true,
    },
    {
      id: 2,
      name: "Pédiatrie",
      description: "Soins médicaux pour les enfants et adolescents.",
      doctors: 3,
      patients: 80,
      appointments: 30,
      price: "120",
      duration: "30",
      isActive: true,
    },
    {
      id: 3,
      name: "Neurologie",
      description: "Diagnostic et traitement des troubles du système nerveux.",
      doctors: 4,
      patients: 95,
      appointments: 38,
      price: "180",
      duration: "60",
      isActive: true,
    },
    {
      id: 4,
      name: "Dermatologie",
      description: "Traitement des affections de la peau, des cheveux et des ongles.",
      doctors: 2,
      patients: 60,
      appointments: 25,
      price: "130",
      duration: "30",
      isActive: true,
    },
  ]);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Configuration du formulaire avec React Hook Form
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      isActive: true,
    },
  });

  // Préparer le formulaire pour l'édition
  const setupEditForm = (service) => {
    setCurrentService(service);
    form.reset({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      isActive: service.isActive,
    });
    setOpenEditDialog(true);
  };

  // Ajouter un nouveau service
  const handleAddService = (data: ServiceFormValues) => {
    const newService = {
      id: services.length + 1,
      name: data.name,
      description: data.description,
      doctors: 0,
      patients: 0,
      appointments: 0,
      price: data.price,
      duration: data.duration,
      isActive: data.isActive,
    };
    
    setServices([...services, newService]);
    toast({
      title: "Service ajouté",
      description: `Le service ${data.name} a été ajouté avec succès.`,
    });
    
    form.reset();
    setOpenAddDialog(false);
  };

  // Mettre à jour un service existant
  const handleUpdateService = (data: ServiceFormValues) => {
    if (!currentService) return;
    
    const updatedServices = services.map(service => 
      service.id === currentService.id 
        ? { ...service, ...data } 
        : service
    );
    
    setServices(updatedServices);
    toast({
      title: "Service mis à jour",
      description: `Le service ${data.name} a été mis à jour avec succès.`,
    });
    
    setOpenEditDialog(false);
  };

  // Supprimer un service
  const handleDeleteService = (serviceId: number) => {
    const serviceToDelete = services.find(s => s.id === serviceId);
    if (!serviceToDelete) return;
    
    setServices(services.filter(service => service.id !== serviceId));
    toast({
      title: "Service supprimé",
      description: `Le service ${serviceToDelete.name} a été supprimé.`,
      variant: "destructive",
    });
  };

  // Basculer l'état actif/inactif d'un service
  const toggleServiceStatus = (serviceId: number) => {
    const updatedServices = services.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive } 
        : service
    );
    
    const affectedService = updatedServices.find(s => s.id === serviceId);
    
    setServices(updatedServices);
    toast({
      title: affectedService.isActive ? "Service activé" : "Service désactivé",
      description: `Le service ${affectedService.name} a été ${affectedService.isActive ? "activé" : "désactivé"}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des Services</h1>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Ajouter un service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un service</DialogTitle>
                <DialogDescription>
                  Créez un nouveau service médical pour votre établissement.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddService)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du service</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Cardiologie" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez brièvement ce service" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée (min)</FormLabel>
                          <FormControl>
                            <Input type="number" min="15" step="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpenAddDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">Ajouter</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des services</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>{service.price} €</TableCell>
                    <TableCell>{service.duration} min</TableCell>
                    <TableCell>
                      {service.isActive ? (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span>Actif</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
                          <span>Inactif</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setupEditForm(service)}>
                            <Edit2 className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleServiceStatus(service.id)}>
                            {service.isActive ? (
                              <>
                                <AlertCircle className="mr-2 h-4 w-4" /> Désactiver
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" /> Activer
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteService(service.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Médecins par service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center">
                    <span>{service.name}</span>
                    <span className="font-bold">{service.doctors}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Rendez-vous par service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center">
                    <span>{service.name}</span>
                    <span className="font-bold">{service.appointments}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setOpenAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Horaires par service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assigner médecins
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog pour éditer un service */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier un service</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations de ce service.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateService)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du service</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Cardiologie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez brièvement ce service" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix (€)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée (min)</FormLabel>
                      <FormControl>
                        <Input type="number" min="15" step="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenEditDialog(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ServicesPage;
