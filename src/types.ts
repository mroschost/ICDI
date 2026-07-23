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
  videos?: string[];
  partners?: string[];
  documents?: string[];
}

export interface NewsArticle {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  tags?: string[];
  author?: string;
  published: boolean;
  createdAt?: any;
}

export interface GalleryItem {
  id?: string;
  projectId?: string;
  projectSlug?: string;
  imageUrl: string;
  caption?: string;
  type: 'photo' | 'video';
  date?: string;
}

export interface Partner {
  id?: string;
  name: string;
  logo: string;
  url?: string;
  category?: string;
}

export interface Indicator {
  id?: string;
  label: string;
  value: string;
  iconName: string;
  prefix?: string;
  suffix?: string;
}

export interface Banner {
  id?: string;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
  active: boolean;
  order: number;
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
