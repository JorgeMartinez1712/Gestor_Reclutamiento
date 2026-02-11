import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import ErrorNotification from '../components/common/ErrorNotification';

const EXAMPLE_PROMPTS = [
  'Buscamos un ingeniero en sistemas con dominio de React, Node y microservicios para liderar un squad ágil.',
  'Necesitamos un analista de datos con Python, SQL avanzado y experiencia creando dashboards para marketing.',
  'Requerimos un líder de soporte bilingüe con enfoque en ITIL y habilidades fuertes de comunicación.'
];

const categoryConfig = [
  { key: 'habilidadesTecnicas', label: 'Habilidades técnicas', icon: 'bi-cpu' },
  { key: 'habilidadesBlandas', label: 'Habilidades blandas', icon: 'bi-people' },
  { key: 'conocimientosIdiomas', label: 'Idiomas necesarios', icon: 'bi-translate' },
  { key: 'herramientasAdicionales', label: 'Herramientas adicionales', icon: 'bi-tools' }
];

const SkillsChatPage = () => {
  const navigate = useNavigate();
  const { messages, isLoading, error, sendPrompt, resetChat, clearError } = useChat();
  const [prompt, setPrompt] = useState('');

  const assistantMessages = useMemo(
    () => messages.filter((message) => message.role === 'assistant'),
    [messages]
  );
  const lastResponse = assistantMessages[assistantMessages.length - 1]?.data || null;

  const sendPromptAction = async () => {
    if (!prompt.trim() || isLoading) return;
    try {
      resetChat();
    } catch (e) {
    }
    await sendPrompt(prompt);
    setPrompt('');
  };

  const handleSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    await sendPromptAction();
  };

  const handleExampleClick = (value) => {
    setPrompt(value);
  };

  const handleCreateVacancy = () => {
    if (!lastResponse) return;
    navigate('/vacantes/crear', { state: { aiData: lastResponse } });
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-base p-6 space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Diseñador de Habilidades Con IA</h1>
              <p className="text-text-muted text-sm mt-2 mb-2 flex">Generador inteligente de perfiles</p>
            </div>
          </div>
        </div>
        
      </header>

      <div className="space-y-6 w-full">
        <section className="rounded-3xl border border-glass-border bg-gradient-to-br from-glass-card/90 to-glass-card/60 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(139,92,246,0.15)]">
          <div className="flex items-start gap-4">
            <div className="flex-1">
             
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void sendPromptAction();
                      }
                    }}
                    placeholder="Ej: Necesito un Tech Lead con experiencia en React, Node.js, arquitectura de microservicios, que lidere equipos remotos y tenga inglés avanzado..."
                    className="w-full resize-none rounded-2xl border border-glass-border bg-app-bg/80 px-4 py-3 text-sm text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                    disabled={isLoading}
                  ></textarea>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="text-[10px] text-text-muted/70">
                      {prompt.length}/600
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.slice(0, 2).map((example, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleExampleClick(example)}
                        className="rounded-full border border-brand-secondary/30 bg-brand-secondary/5 px-3 py-1.5 text-[10px] text-brand-secondary hover:bg-brand-secondary/15 transition-all"
                        title={example}
                      >
                        <i className="bi bi-lightning-charge-fill mr-1"></i>
                        Ejemplo {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPrompt('')}
                      className="rounded-full border border-glass-border px-4 py-2 text-xs text-text-muted hover:text-white hover:border-white/30 transition-all disabled:opacity-50"
                      disabled={!prompt.length || isLoading}
                    >
                      Limpiar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                          Analizando
                        </>
                      ) : (
                        <>
                          <i className="bi bi-stars"></i>
                          Generar Habilidades
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {lastResponse == null ? (
          <section className="rounded-3xl border border-dashed border-glass-border bg-glass-card/30 p-12 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10">
                <i className="bi bi-chat-quote text-3xl text-brand-primary"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Comienza a diseñar tu perfil ideal</h3>
                <p className="text-sm text-text-muted max-w-md">
                  Describe el puesto que buscas y la IA generará automáticamente una matriz completa de habilidades, herramientas y requisitos.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full max-w-3xl">
                <div className="rounded-2xl border border-glass-border bg-glass-card/50 p-4 text-left">
                  <i className="bi bi-cpu text-brand-secondary mb-2 text-xl"></i>
                  <p className="text-xs font-semibold text-white">Habilidades técnicas</p>
                  <p className="text-[10px] text-text-muted mt-1">Lenguajes, frameworks y tecnologías</p>
                </div>
                <div className="rounded-2xl border border-glass-border bg-glass-card/50 p-4 text-left">
                  <i className="bi bi-people text-brand-secondary mb-2 text-xl"></i>
                  <p className="text-xs font-semibold text-white">Habilidades blandas</p>
                  <p className="text-[10px] text-text-muted mt-1">Competencias interpersonales clave</p>
                </div>
                <div className="rounded-2xl border border-glass-border bg-glass-card/50 p-4 text-left">
                  <i className="bi bi-graph-up-arrow text-brand-secondary mb-2 text-xl"></i>
                  <p className="text-xs font-semibold text-white">Nivel sugerido</p>
                  <p className="text-[10px] text-text-muted mt-1">Seniority recomendado</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <i className="bi bi-chat-square-dots"></i>
              <span>Respuesta</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-start">
                <div className="w-full">
                  <ResponseCard data={lastResponse} />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCreateVacancy}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.45)]"
                >
                  <i className="bi bi-briefcase"></i>
                  Crear vacante
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {(() => {
        const formatErrorMessage = (err) => {
          if (!err) return '';
          if (typeof err === 'string') {
            try {
              const parsed = JSON.parse(err);
              if (parsed && typeof parsed === 'object') {
                return parsed.response ?? parsed.message ?? err;
              }
            } catch (e) {
              return err;
            }
          }
          if (typeof err === 'object') {
            return err.response ?? err.friendlyMessage ?? err.message ?? JSON.stringify(err);
          }
          return String(err);
        };

        const formattedError = formatErrorMessage(error);

        return <ErrorNotification isOpen={Boolean(formattedError)} message={formattedError} onClose={clearError} />;
      })()}
    </div>
  );
};

const ResponseCard = ({ data }) => {
  return (
    <div className="rounded-3xl border border-glass-border bg-gradient-to-br from-glass-card/95 to-glass-card/70 p-6 space-y-6 shadow-[0_20px_50px_rgba(2,6,23,0.5)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-secondary to-brand-primary">
            <i className="bi bi-stars text-xl text-white"></i>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 flex">Puesto sugerido</p>
            <p className="text-xl font-bold text-white leading-tight">{data.puestoSugerido}</p>
          </div>
        </div>
        <span className="rounded-full bg-gradient-to-r from-brand-secondary/20 to-brand-primary/20 border border-brand-secondary/30 px-4 py-1.5 text-xs font-semibold text-brand-secondary whitespace-nowrap">
          {data.seniorityRecomendado}
        </span>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>

      <div className="grid gap-4 md:grid-cols-2">
        {categoryConfig.map((category) => (
          <div key={category.key} className="group rounded-2xl border border-glass-border/60 bg-app-bg/40 p-4 transition-all hover:border-brand-secondary/40 hover:bg-app-bg/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary/10 group-hover:bg-brand-secondary/20 transition-colors">
                <i className={`bi ${category.icon} text-sm text-brand-secondary`}></i>
              </div>
              <p className="text-xs font-semibold text-white">{category.label}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data[category.key]?.length ? (
                data[category.key].map((item) => (
                  <span key={item} className="rounded-full bg-glass-card border border-glass-border px-3 py-1 text-[11px] text-white/90 transition-all hover:border-brand-primary/50 hover:bg-brand-primary/10">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-text-muted/70 italic">Sin sugerencias disponibles</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsChatPage;
