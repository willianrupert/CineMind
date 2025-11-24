// import axios from "axios"; // Comentamos a importação real

// Criamos um objeto falso apenas para o projeto não quebrar ao tentar usar 'api.get' ou 'api.post'
const api = {
  create: () => api,
  get: async () => ({ data: [] }),
  post: async () => ({ data: {} }),
  defaults: { headers: { common: {} } },
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};

export default api;