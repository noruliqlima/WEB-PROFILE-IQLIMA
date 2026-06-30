import { 
  MessageCircle, 
  Box, 
  Globe, 
  Youtube, 
  Music, 
  Code,
  Layers,
  Smartphone
} from 'lucide-react';

export interface ProfileData {
  name: string;
  role: string;
  greeting: string;
  description: string;
  avatarUrl: string;
  agencyLabel: string;
  whatsappNumber: string;
}

export const profileData: ProfileData = {
  name: "@iqlimaraudhah",
  role: "Optometris yang suka dengan AI",
  greeting: "SELAMAT DATANG SEMUA",
  description: "Semua online course AI ada di sini, KLIK JE, subcribe terus ya😊",
  avatarUrl: "/profile.jpg", // Gambar profil yang dimuat naik
  agencyLabel: "Myrobot Ai",
  whatsappNumber: "60164224090",
};

export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  icon: any; // We'll pass the Lucide icon component name or use a string to map
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
}
