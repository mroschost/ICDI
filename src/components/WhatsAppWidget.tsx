import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { configService } from '../services/configService';
import { leadService } from '../services/leadService';
import { WhatsAppConfig, WhatsAppQuestion } from '../types';
import { useLocation } from 'react-router-dom';
import { WhatsAppBubble } from './whatsapp/WhatsAppBubble';
import { ChatModal } from './whatsapp/ChatModal';

export const WhatsAppWidget = () => {
  const location = useLocation();
  const [config, setConfig] = useState<WhatsAppConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ type: 'bot' | 'user'; text: string }[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadConfig = async () => {
      const data = await configService.getWhatsAppConfig();
      if (data) {
        setConfig({ ...data, photoUrl: '/logo.png' });
      } else {
        const defaultData = await configService.seedDefaultConfig();
        setConfig({ ...defaultData, photoUrl: '/logo.png' });
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const tryObserve = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        observer.observe(aboutSection);
        return true;
      }
      return false;
    };

    const found = tryObserve();

    let interval: any;
    if (!found) {
      interval = setInterval(() => {
        if (tryObserve()) {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [location.pathname, isVisible]);

  useEffect(() => {
    if (isVisible) {
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
      }, 1000);

      const bubbleTimer = setTimeout(() => {
        setShowBubble(true);
      }, 3000);

      return () => {
        clearTimeout(notificationTimer);
        clearTimeout(bubbleTimer);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (isModalOpen && config && messages.length === 0) {
      startChat();
    }
  }, [isModalOpen, config]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startChat = () => {
    if (!config) return;
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ type: 'bot', text: config.welcomeMessage }]);
      setTimeout(() => {
        const firstQuestion = getPersonalizedQuestion(config.questions[0], [], 0);
        setMessages(prev => [...prev, { type: 'bot', text: firstQuestion }]);
        setIsTyping(false);
      }, 1000);
    }, 1000);
  };

  const getPersonalizedQuestion = (questionOrObj: WhatsAppQuestion | string, userAnswers: string[], index: number) => {
    const question = typeof questionOrObj === 'string' ? questionOrObj : questionOrObj.text;
    if (!question) return '';
    
    if (userAnswers.length === 0) return question;
    
    const name = userAnswers[0].trim().split(' ')[0];
    if (!name) return question;

    let personalized = question;
    
    if (personalized.includes('{nome}')) {
      personalized = personalized.replace(/\{nome\}/g, name);
    } else if (index > 0) {
      if (index === 1) {
        personalized = `Prazer em te conhecer, ${name}! ${personalized}`;
      } else {
        personalized = `${name}, ${personalized.charAt(0).toLowerCase()}${personalized.slice(1)}`;
      }
    }
    
    return personalized;
  };

  const handleSendMessage = (e?: React.FormEvent, manualMsg?: string) => {
    if (e) e.preventDefault();
    const messageToUse = manualMsg || currentInput;
    if (!messageToUse.trim() || !config) return;

    const userMsg = messageToUse;
    const updatedAnswers = [...answers, userMsg];
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setAnswers(updatedAnswers);
    setCurrentInput('');

    const currentQuestionText = getPersonalizedQuestion(config.questions[currentStep], updatedAnswers, currentStep);
    const newAnswerPair = { question: currentQuestionText, answer: userMsg };
    
    const updateLeadData = async () => {
      try {
        if (currentStep === 0) {
          const leadId = await leadService.createLead(userMsg, newAnswerPair);
          if (leadId) setCurrentLeadId(leadId);
        } else if (currentLeadId) {
          const allAnswerPairs = updatedAnswers.map((ans, i) => ({
            question: getPersonalizedQuestion(config.questions[i], updatedAnswers.slice(0, i), i),
            answer: ans
          }));
          await leadService.updateLead(currentLeadId, allAnswerPairs, false);
        }
      } catch (err) {
        console.error("Lead capture failed:", err);
      }
    };
    updateLeadData();
    
    if (currentStep < config.questions.length - 1) {
      setIsTyping(true);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      setTimeout(() => {
        const nextQuestion = getPersonalizedQuestion(config.questions[nextStep], updatedAnswers, nextStep);
        setMessages(prev => [...prev, { type: 'bot', text: nextQuestion }]);
        setIsTyping(false);
      }, 1500);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        const closingMsg = getPersonalizedQuestion({ text: 'Perfeito! Clique no botão abaixo para nos enviar essas informações pelo WhatsApp.', options: [] }, updatedAnswers, 999);
        setMessages(prev => [...prev, { type: 'bot', text: closingMsg }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const finishChat = () => {
    if (!config) return;

    if (currentLeadId) {
      const allAnswerPairs = answers.map((ans, i) => ({
        question: getPersonalizedQuestion(config.questions[i], answers.slice(0, i), i),
        answer: ans
      }));
      leadService.updateLead(currentLeadId, allAnswerPairs, true);
    }

    const formattedAnswers = answers.map((ans, i) => {
      const q = getPersonalizedQuestion(config.questions[i], answers, i);
      return `*${q}*\n${ans}`;
    }).join('\n\n');
    const text = encodeURIComponent(`Olá! Gostaria de falar sobre o ICDI.\n\n${formattedAnswers}`);
    window.open(`https://wa.me/${config.phoneNumber}?text=${text}`, '_blank');
  };

  if (!config) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <WhatsAppBubble 
            config={config}
            showBubble={showBubble}
            setShowBubble={setShowBubble}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showNotification={showNotification}
          />
        )}
      </AnimatePresence>

      <ChatModal 
        config={config}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messages={messages}
        isTyping={isTyping}
        currentStep={currentStep}
        answers={answers}
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        handleSendMessage={handleSendMessage}
        finishChat={finishChat}
        chatEndRef={chatEndRef}
      />
    </>
  );
};

