import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser;

export interface Movie {
  title: string;
  year: number;
  description: string;
  poster_url: string;
}

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

export interface UserPreferences {
  scores: {
    openness: number;
    conscientiousness: number;
    extroversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  favorite_genres: string[];
}