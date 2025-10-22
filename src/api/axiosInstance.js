import axios from "axios";
// Importamos o 'auth' que acabámos de configurar
import { auth } from "../config/firebase"; 

const axiosInstance = axios.create({
  // A URL do seu backend FastAPI que está no outro Replit!
  baseURL: "https://cinemind-4s3o.onrender.com" // <-- URL NOVA E FIXA 
});

// === O INTERCEPTOR DE JWT (O PONTO-CHAVE) ===
// Este código é executado ANTES de CADA requisição

axiosInstance.interceptors.request.use(
  async (config) => {
    // Verifica se há um utilizador logado no Firebase
    const user = auth.currentUser; 

    if (user) {
      // Se houver, pede ao Firebase o "crachá" (JWT)
      const token = await user.getIdToken(); 
      // E anexa-o ao cabeçalho da requisição
      config.headers.Authorization = `Bearer ${token}`; 
    }

    // Deixa a requisição continuar
    return config;
  },
  (error) => {
    // Se houver um erro, rejeita
    return Promise.reject(error);
  }
);

// Exportamos esta instância "mágica" para o resto da nossa app
export default axiosInstance;