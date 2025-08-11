// Configuração do sistema - API opcional
export const SYSTEM_CONFIG = {
  // Modo de operação: 'mock' | 'api' | 'hybrid'
  MODE: (process.env.NEXT_PUBLIC_API_MODE as "mock" | "api" | "hybrid") || "hybrid",

  // Configuração da API (opcional)
  API: {
    BASE_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://atendimentoapi.royalsistemas.com.br/v2/api/external/3b2e21a7-fd7c-4645-8885-6031ec1d8d62",
    BEARER_TOKEN:
      process.env.NEXT_PUBLIC_API_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MSwicHJvZmlsZSI6ImFkbWluIiwic2Vzc2lvbklkIjoxLCJpYXQiOjE3NTQ5MjEwOTgsImV4cCI6MTgxNzk5MzA5OH0.SyMZ67a-m34rNiL6mxau-HB5CrG6NxA_R1HgQMmo2kI",
    ENABLED: process.env.NEXT_PUBLIC_API_ENABLED === "true",
  },

  // Configurações gerais
  AUTO_REFRESH_INTERVAL: 30000, // 30 segundos
  ENABLE_NOTIFICATIONS: true,
  ENABLE_WHATSAPP_INTEGRATION: true,
}

// Verificar se a API está habilitada
export const isApiEnabled = () => {
  return SYSTEM_CONFIG.MODE === "api" || (SYSTEM_CONFIG.MODE === "hybrid" && SYSTEM_CONFIG.API.ENABLED)
}

// Verificar se deve usar dados mock
export const useMockData = () => {
  return SYSTEM_CONFIG.MODE === "mock" || (SYSTEM_CONFIG.MODE === "hybrid" && !SYSTEM_CONFIG.API.ENABLED)
}
