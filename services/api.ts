import { getAuth } from 'firebase/auth';
import { Movie } from '../types';

const API_URL = 'https://cinemind-4s3o.onrender.com/gerar-recomendacoes';

interface RecommendationPayload {
  openness: number;
  conscientiousness: number;
  extroversion: number;
  agreeableness: number;
  neuroticism: number;
  favorite_genres: string[];
  mood: string;
}

export const getMovieRecommendations = async (payload: RecommendationPayload): Promise<Movie[]> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Authentication required. Please sign in.");
  }

  const token = await user.getIdToken();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = `Failed to fetch recommendations. Status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.detail || errorMessage;
    } catch (e) {
      // Could not parse error JSON, stick with the status message
    }
    throw new Error(errorMessage);
  }

  const data: Movie[] = await response.json();
  // Basic validation to ensure we received an array of movies
  if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Received an invalid response from the server.");
  }
  
  return data;
};
