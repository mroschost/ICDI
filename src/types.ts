import { ReactNode } from 'react';

export interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  objectives: string[];
  results: string[];
  iconName: string;
  color: string;
  gallery?: string[];
  transparency?: string[];
}

export interface WhatsAppQuestion {
  text: string;
  options: string[];
}

export interface WhatsAppConfig {
  id?: string;
  photoUrl: string;
  chatName: string;
  welcomeMessage: string;
  ctaText: string;
  phoneNumber: string;
  questions: WhatsAppQuestion[];
}

export interface Lead {
  id?: string;
  name: string;
  answers: {
    question: string;
    answer: string;
  }[];
  completed: boolean;
  phoneNumber?: string;
  createdAt: any;
  updatedAt: any;
}
