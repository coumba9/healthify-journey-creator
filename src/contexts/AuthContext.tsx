
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

// Fonction pour récupérer l'utilisateur du localStorage
const getSavedUser = (): User | null => {
  const savedUser = localStorage.getItem("mediconnect-user");
  return savedUser ? JSON.parse(savedUser) : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSavedUser());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Enregistrer l'utilisateur dans localStorage quand il change
  useEffect(() => {
    if (user) {
      localStorage.setItem("mediconnect-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mediconnect-user");
    }
  }, [user]);

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
      console.log("User logged in:", mockUser);
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants invalides",
        variant: "destructive",
      });
      console.error("Login error:", error);
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
      console.log("User registered:", newUser);
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
      console.error("Registration error:", error);
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
      console.log("Profile updated:", updatedUser);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
      console.error("Profile update error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out");
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
