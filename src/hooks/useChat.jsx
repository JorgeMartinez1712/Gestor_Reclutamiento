import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const normalizeResponse = (payload = {}) => {
  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    return [String(value)];
  };

  return {
    puestoSugerido: payload.puesto_sugerido || payload.puestoSugerido || 'Puesto no especificado',
    habilidadesTecnicas: toArray(payload.habilidades_tecnicas || payload.habilidadesTecnicas),
    habilidadesBlandas: toArray(payload.habilidades_blandas || payload.habilidadesBlandas),
    conocimientosIdiomas: toArray(payload.conocimientos_idiomas || payload.conocimientosIdiomas),
    herramientasAdicionales: toArray(payload.herramientas_adicionales || payload.herramientasAdicionales),
    seniorityRecomendado: payload.seniority_recomendado || payload.seniorityRecomendado || 'Sin especificar',
  };
};

const buildMessageId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPrompt = async (prompt) => {
    const trimmed = prompt.trim();
    if (!trimmed) return null;

    const userMessage = {
      id: buildMessageId(),
      role: 'user',
      text: trimmed,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post('/chat/skills', { requisitos: trimmed });
      const normalized = normalizeResponse(data?.data ?? data ?? {});
      const assistantMessage = {
        id: buildMessageId(),
        role: 'assistant',
        data: normalized,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      return normalized;
    } catch (requestError) {
      setError(requestError?.friendlyMessage || 'No pudimos generar la recomendación. Inténtalo nuevamente.');
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendPrompt,
    resetChat,
    clearError,
  };
};

export default useChat;
