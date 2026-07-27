import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { WhatsAppConfig } from '../types';

const CONFIG_DOC_ID = 'whatsapp';
const DEFAULT_WHATSAPP_PHOTO_URL = '/logo.png';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  const jsonError = JSON.stringify(errInfo);
  console.error('Firestore Error: ', jsonError);
  throw new Error(jsonError);
}

export const configService = {
  getWhatsAppConfig: async (): Promise<WhatsAppConfig | null> => {
    const path = `settings/${CONFIG_DOC_ID}`;
    try {
      const docRef = doc(db, 'settings', CONFIG_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Normalize questions if they are still strings (migration support)
        if (data.questions && Array.isArray(data.questions)) {
          data.questions = data.questions.map((q: any) => {
            if (typeof q === 'string') return { text: q, options: [] };
            return { ...q, options: q.options || [] };
          });
        }
        return { id: docSnap.id, ...data, photoUrl: DEFAULT_WHATSAPP_PHOTO_URL } as WhatsAppConfig;
      }
      
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  saveWhatsAppConfig: async (config: WhatsAppConfig): Promise<void> => {
    const path = `settings/${CONFIG_DOC_ID}`;
    try {
      const docRef = doc(db, 'settings', CONFIG_DOC_ID);
      await setDoc(docRef, {
        ...config,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  seedDefaultConfig: async (): Promise<WhatsAppConfig> => {
    const defaultConfig: WhatsAppConfig = {
      photoUrl: DEFAULT_WHATSAPP_PHOTO_URL,
      chatName: 'Atendimento ICDI',
      welcomeMessage: 'Olá! Seja bem-vindo ao ICDI. Estamos aqui para ajudar!',
      ctaText: 'Fale com nossa equipe agora mesmo.',
      phoneNumber: '5561999999999',
      questions: [
        { text: 'Olá! Para começarmos, qual é o seu nome?', options: [] },
        { 
          text: 'Prazer em te conhecer, {nome}! Qual o motivo do seu contato hoje?',
          options: ['Dúvida', 'Parceria', 'Projeto', 'Outro'] 
        },
        { 
          text: '{nome}, em qual de nossos projetos você tem interesse?',
          options: ['Projeto Mulheres', 'Mentoria', 'Inovação', 'Outro']
        },
        { text: 'Por fim, deixe seu e-mail ou telefone para que possamos retornar.', options: [] }
      ]
    };

    await configService.saveWhatsAppConfig(defaultConfig);
    return defaultConfig;
  }
};
