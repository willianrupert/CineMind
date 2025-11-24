// import api from "./api"; // Não precisamos da API real

// --- Interfaces ---

export interface Question {
  id: string;
  description: string;
  attribute: string;
  first_alternative: string;
  first_alternative_value: number;
  second_alternative: string;
  second_alternative_value: number;
  third_alternative: string;
  third_alternative_value: number;
}

export interface Genre {
  id: string;
  name: string;
}

export interface AnswerSubmission {
  question_id: string;
  selected_value: number;
}

export interface OnboardingPayload {
  answers: AnswerSubmission[];
  genre_ids: string[];
}

// --- DADOS MOCKADOS (Copiados do Backend para desenvolvimento isolado) ---

const MOCK_QUESTIONS: Question[] = [
  { id: "1", description: "É sexta-feira à noite depois de uma semana cansativa. Sua forma ideal de recarregar as energias é:", attribute: "extraversion", first_alternative: "Saindo para um bar ou festa com um grupo grande de amigos.", first_alternative_value: 1, second_alternative: "Em casa, com um bom livro, série ou um hobby tranquilo.", second_alternative_value: -1, third_alternative: "Jantando com um ou dois amigos próximos em um lugar calmo.", third_alternative_value: 0 },
  { id: "2", description: "Seus planos para o fim de semana foram cancelados de última hora. Sua reação mais provável é:", attribute: "neuroticism", first_alternative: "Ficar bastante frustrado(a) e sentir que o fim de semana está \"estragado\".", first_alternative_value: 1, second_alternative: "Encarar como uma oportunidade e rapidamente pensar em algo novo e diferente para fazer.", second_alternative_value: -1, third_alternative: "Sentir um leve desapontamento, mas logo se adaptar e relaxar em casa.", third_alternative_value: 0 },
  { id: "3", description: "Ao planejar uma viagem de férias, você prefere:", attribute: "conscientiousness", first_alternative: "Ter um roteiro detalhado, com todos os passeios e horários definidos com antecedência.", first_alternative_value: 1, second_alternative: "Comprar a passagem e decidir o que fazer ao chegar no destino, deixando espaço para o improviso.", second_alternative_value: -1, third_alternative: "Ter uma ideia geral dos principais pontos a visitar, mas com flexibilidade para mudar os planos.", third_alternative_value: 0 },
  { id: "4", description: "Você está em uma conversa em grupo e surge um tópico polêmico sobre o qual você tem uma opinião forte. Você:", attribute: "agreeableness", first_alternative: "Expressa sua opinião de forma clara e direta, mesmo que isso possa gerar um debate acalorado.", first_alternative_value: -1, second_alternative: "Prefere ouvir os outros pontos de vista e evita criar conflito, mantendo a harmonia do grupo.", second_alternative_value: 1, third_alternative: "Tenta encontrar um meio-termo, validando partes de outros argumentos antes de apresentar o seu.", third_alternative_value: 0 },
  { id: "5", description: "Qual playlist de música mais te atrai para ouvir agora?", attribute: "openness", first_alternative: "Uma playlist chamada \"Descobertas da Semana\", com artistas e gêneros que você nunca ouviu antes.", first_alternative_value: 1, second_alternative: "Sua playlist pessoal com todas as suas músicas favoritas de sempre, que você sabe que não têm erro.", second_alternative_value: -1, third_alternative: "O \"Top 50\" do seu país, com os hits mais populares do momento.", third_alternative_value: 0 },
  { id: "6", description: "Você precisa montar um móvel novo que acabou de chegar. Sua abordagem é:", attribute: "conscientiousness", first_alternative: "Ler o manual de instruções do início ao fim antes de pegar na primeira peça.", first_alternative_value: 1, second_alternative: "Olhar a imagem da caixa, espalhar as peças e começar a montar pela intuição.", second_alternative_value: -1, third_alternative: "Dar uma lida rápida no manual para entender os passos principais e consultá-lo apenas se tiver dúvidas.", third_alternative_value: 0 },
  { id: "7", description: "Como você se sente em grandes eventos sociais (casamentos, conferências, etc.) onde não conhece muitas pessoas?", attribute: "extraversion", first_alternative: "Energizado(a) e animado(a), aproveitando a chance para conhecer e conversar com gente nova.", first_alternative_value: 1, second_alternative: "Um pouco esgotado(a) e desconfortável, preferindo interagir com o pequeno grupo que já conhece.", second_alternative_value: -1, third_alternative: "Neutro(a), você consegue socializar se precisar, mas não busca ativamente novas interações.", third_alternative_value: 0 },
  { id: "8", description: "Você comete um pequeno erro no trabalho que ninguém percebeu. Você:", attribute: "neuroticism", first_alternative: "Fica remoendo o erro, preocupado(a) com a possibilidade de alguém descobrir no futuro.", first_alternative_value: 1, second_alternative: "Assume o erro para si mesmo(a), corrige-o e segue em frente sem pensar muito no assunto.", second_alternative_value: -1, third_alternative: "Analisa por que o erro aconteceu para garantir que não se repita, mas sem se culpar excessivamente.", third_alternative_value: 0 },
  { id: "9", description: "Ao escolher um filme com amigos, e o grupo decide por um que você já sabe que não vai gostar, você:", attribute: "agreeableness", first_alternative: "Aceita a escolha da maioria para não estragar o clima e tenta aproveitar o momento.", first_alternative_value: 1, second_alternative: "Sugere outras opções e argumenta por que sua sugestão seria melhor para o grupo.", second_alternative_value: -1, third_alternative: "Comenta que não é seu gênero favorito, mas topa assistir sem criar caso.", third_alternative_value: 0 },
  { id: "10", description: "Quando você encontra um assunto ou ideia completamente nova, como reage?", attribute: "openness", first_alternative: "Sinto curiosidade imediata e quero explorar tudo sobre o tema, buscando aprender de forma profunda.", first_alternative_value: 1, second_alternative: "Prefiro manter distância, focando no que já conheço e evitando mudanças ou novidades.", second_alternative_value: -1, third_alternative: "Me interesso de forma moderada: observo, penso e vejo se realmente vale a pena explorar mais.", third_alternative_value: 0 },
];

const GENRE_NAMES = [
  "Ação", "Aventura", "Animação", "Comédia", "Crime", "Documentário", "Drama",
  "Família", "Fantasia", "História", "Terror", "Música", "Mistério",
  "Romance", "Ficção Científica", "Cinema TV", "Suspense", "Guerra", "Faroeste"
];

const MOCK_GENRES: Genre[] = GENRE_NAMES.map((name, index) => ({
  id: `mock-genre-${index}`,
  name
}));

// --- Funções de API (Simuladas) ---

// Retorna as perguntas mockadas imediatamente
export const fetchQuestions = async (): Promise<Question[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_QUESTIONS), 300));
};

// Retorna os gêneros mockados imediatamente
export const fetchGenres = async (): Promise<Genre[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_GENRES), 300));
};

// Simula o envio do formulário (Apenas loga no console)
export const submitOnboardingForm = async (payload: OnboardingPayload) => {
  console.log("Simulando envio para o backend:", payload);
  // Retorna sucesso falso após 1 segundo
  return new Promise((resolve) => 
    setTimeout(() => resolve({ message: "Onboarding simulado com sucesso!" }), 1000)
  );
};