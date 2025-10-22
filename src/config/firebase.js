// --- 1. OS IMPORTS DEVEM VIR PRIMEIRO ---
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword, // <-- NOVO
  signInWithEmailAndPassword, // <-- NOVO
} from "firebase/auth";

// --- 2. Lê as chaves das Variáveis de Ambiente do Vercel ---

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
// --- FIM DO AVISO ---

// --- 3. O RESTO DO CÓDIGO ---

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exporta as ferramentas de autenticação que vamos usar
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Função de ajuda para fazer o login com o pop-up do Google
export const signInWithGoogle = () => {
  googleProvider.addScope("profile");
  googleProvider.addScope("email");
  return signInWithPopup(auth, googleProvider);
};

// Exporta uma função para "ouvir" as mudanças de login/logout
export { onAuthStateChanged };

// --- 4. NOVAS FUNÇÕES DE EMAIL/SENHA ---

/**
 * Registra um novo usuário com email e senha.
 */
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Loga um usuário existente com email e senha.
 */
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
