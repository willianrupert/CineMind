import { getAuth } from 'firebase/auth';
import { Movie, UserPreferences } from '../types'; // Importa UserPreferences

// Define a URL base da API (seu backend no Render)
const BASE_URL = 'https://cinemind-4s3o.onrender.com'; // <- Esta URL está 100% correta?'; // Ou sua URL específica se for diferente
const API_URL_RECS = `${BASE_URL}/gerar-recomendacoes`;
const API_URL_PREFS = `${BASE_URL}/preferences`; // Novo endpoint

// Interface para o payload de recomendação (já existente)
interface RecommendationPayload {
  openness: number;
  conscientiousness: number;
  extroversion: number;
  agreeableness: number;
  neuroticism: number;
  favorite_genres: string[];
  mood: string;
}

// Função auxiliar para obter o token
const getIdToken = async (): Promise<string> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Autenticação necessária. Faça login.");
  }
  return await user.getIdToken();
};

// Função para buscar recomendações (igual à anterior)
export const getMovieRecommendations = async (payload: RecommendationPayload): Promise<Movie[]> => {
  const token = await getIdToken();

  const response = await fetch(API_URL_RECS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `Falha ao buscar recomendações. Status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch (e) {
      // Ignora erro ao parsear JSON de erro
    }
    throw new Error(errorMessage);
  }

  const data: Movie[] = await response.json();
  if (!Array.isArray(data)) { // Validação mínima da resposta
      throw new Error("Resposta inválida recebida do servidor de recomendações.");
  }
  return data;
};

// --- NOVA Função para BUSCAR Preferências ---
export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  const token = await getIdToken();

  const response = await fetch(API_URL_PREFS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // GET não tem corpo, mas o header é inofensivo
      'Authorization': `Bearer ${token}`
    },
  });

  if (response.status === 204 || response.status === 404) {
    // 204 No Content ou 404 Not Found significam que não há preferências salvas
    // O backend pode retornar null/vazio com 200 OK também, dependendo da implementação
    return null;
  }

  if (!response.ok) {
    // Para outros erros, lançamos uma exceção
    throw new Error(`Falha ao buscar preferências do usuário. Status: ${response.status}`);
  }

  // Se a resposta for OK (200), tentamos parsear o JSON
  try {
      const data = await response.json();
      // Validação básica para garantir que recebemos algo parecido com UserPreferences
      if (data && data.scores && Array.isArray(data.favorite_genres)) {
          return data as UserPreferences;
      } else {
          // Se a resposta for JSON mas não tiver a estrutura esperada
          console.warn("Dados de preferências recebidos em formato inesperado:", data);
          return null; // Trata como se não houvesse preferências
      }
  } catch (e) {
      // Se a resposta OK não for JSON válido (improvável com FastAPI)
      console.error("Erro ao parsear JSON das preferências:", e);
      throw new Error("Resposta inválida recebida do servidor de preferências.");
  }
};


// --- NOVA Função para SALVAR Preferências ---
export const saveUserPreferences = async (preferences: UserPreferences): Promise<void> => {
  const token = await getIdToken();

  const response = await fetch(API_URL_PREFS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(preferences),
  });

  // Status 204 (No Content) é o sucesso esperado
  if (!response.ok && response.status !== 204) {
    // Logamos o erro mas não lançamos exceção para não quebrar o fluxo principal
    console.error(`Falha ao salvar preferências do usuário. Status: ${response.status}`);
    try {
        const errorData = await response.json();
        console.error("Detalhe do erro:", errorData.detail || errorData);
    } catch(e) {
        // Ignora erro ao parsear JSON de erro
    }
  }
};