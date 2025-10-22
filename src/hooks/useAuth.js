import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../config/firebase'; // O nosso ficheiro de config

// Este é o nosso hook personalizado
export function useAuth() {
  const [user, setUser] = useState(null); // O utilizador atual
  const [loading, setLoading] = useState(true); // Estamos a carregar?

  useEffect(() => {
    // O onAuthStateChanged é um "ouvinte" do Firebase.
    // Ele dispara quando o utilizador faz login ou logout.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o utilizador (ou null se fez logout)
      setLoading(false); // Acabámos de carregar
    });

    // Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Retorna o estado atual para quem o usar
  return { user, loading };
}
