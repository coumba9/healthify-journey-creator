import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "patient" | "doctor" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  speciality?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  register: (userData: Omit<User, "id"> & { password: string }) => void;
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulation d'une authentification
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role,
        speciality: role === "doctor" ? "Généraliste" : undefined,
      };
      setUser(mockUser);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${mockUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants invalides",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true);
    try {
      // Simulation d'une inscription
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setUser(newUser);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}