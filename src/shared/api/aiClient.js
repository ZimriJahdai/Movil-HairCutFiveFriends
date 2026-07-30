import axios from 'axios';

import { ENDPOINTS } from '../constants/endpoints';
import { useAuthStore } from '../store/authStore';

// Cliente del AI Service (TodoGemini, :8080/api): análisis de rostro, generación
// de imágenes de corte y análisis de reseñas.
//
// Su POST /api/auth/login es solo un proxy hacia AuthService, así que el JWT es
// el mismo que ya guarda authStore: no hace falta una segunda sesión.
//
// Timeout alto (no los 15s de apiClient): /vision/recommend y /ai-haircut/analyze
// llaman a Vertex AI/Gemini y la generación de imagen tarda decenas de segundos.
const aiClient = axios.create({
  baseURL: ENDPOINTS.AI,
  timeout: 90000,
});

// Solo Authorization (no x-token): el CORS de los backends únicamente permite
// Content-Type/Authorization, y un header custom no listado rompe el preflight
// en web con "Network Error" aunque el backend acepte el token perfectamente.
aiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A diferencia de authClient/apiClient, un 401 aquí NO cierra la sesión: el AI
// Service valida el JWT por su cuenta y un desajuste de configuración suyo
// echaría al usuario de una app que por lo demás funciona. Se reporta y ya.
aiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.readableMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Ocurrió un error de red';
    return Promise.reject(error);
  }
);

export default aiClient;
