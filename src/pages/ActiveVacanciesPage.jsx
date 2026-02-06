import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const glassCard = 'rounded-3xl border border-glass-border bg-glass-card backdrop-blur-2xl shadow-[0_25px_60px_rgba(2,6,23,0.55)] transition-all duration-300';

const priorityStyles = {
  high: 'bg-red-500/10 text-red-300 border border-red-500/30',
  medium: 'bg-amber-400/10 text-amber-200 border border-amber-400/30',
  normal: 'bg-sky-400/10 text-sky-200 border border-sky-400/30',
};

const Sparkline = ({ data }) => {
  const { points } = useMemo(() => {
    if (!data.length) {
      return { points: '' };
    }
    const max = Math.max(...data);
    const min = Math.min(...data);
    const span = max - min || 1;
    const plotted = data
      .map((value, index) => {
        const x = (index / (data.length - 1 || 1)) * 100;
        const normalized = ((value - min) / span) * 100;
        const y = 100 - normalized;
        return `${x},${y}`;
      })
      .join(' ');
    return { points: plotted };
  }, [data]);

  return (
    <svg viewBox="0 0 100 100" className="h-16 w-full">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#sparkline-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const initialVacancies = [
  {
    id: 'VAC-001',
    title: 'Arquitecto de Software Senior',
    department: 'Innovación Técnica',
    priority: 'Alta Prioridad',
    priorityVariant: 'high',
    openedAt: '2025-12-12',
    applications: 58,
    progress: 64,
    trend: [12, 18, 21, 25, 28, 35, 40],
    recruiters: [
      { name: 'Valeria Ruiz', avatar: 'https://i.pravatar.cc/80?img=47' },
      { name: 'Marcos Pérez', avatar: 'https://i.pravatar.cc/80?img=12' },
      { name: 'Daniela Ricci', avatar: 'https://i.pravatar.cc/80?img=38' },
    ],
    published: true,
  },
  {
    id: 'VAC-002',
    title: 'Desarrollador React Senior',
    department: 'Ingeniería Frontend',
    priority: 'Normal',
    priorityVariant: 'normal',
    openedAt: '2026-01-04',
    applications: 32,
    progress: 48,
    trend: [8, 12, 18, 20, 24, 27, 32],
    recruiters: [
      { name: 'Lucía Ramos', avatar: 'https://i.pravatar.cc/80?img=24' },
      { name: 'Antonio Serrano', avatar: 'https://i.pravatar.cc/80?img=5' },
    ],
    published: true,
  },
  {
    id: 'VAC-003',
    title: 'Gerente de Producto',
    department: 'Estrategia Digital',
    priority: 'Alta Prioridad',
    priorityVariant: 'high',
    openedAt: '2025-11-28',
    applications: 41,
    progress: 72,
    trend: [15, 18, 22, 30, 28, 35, 41],
    recruiters: [
      { name: 'Gabriela Soto', avatar: 'https://i.pravatar.cc/80?img=33' },
      { name: 'Héctor Díaz', avatar: 'https://i.pravatar.cc/80?img=14' },
    ],
    published: true,
  },
  {
    id: 'VAC-004',
    title: 'Científico de Datos',
    department: 'Ciencia de Datos',
    priority: 'Normal',
    priorityVariant: 'normal',
    openedAt: '2025-12-20',
    applications: 27,
    progress: 36,
    trend: [5, 9, 13, 17, 22, 25, 27],
    recruiters: [
      { name: 'Mariana Molina', avatar: 'https://i.pravatar.cc/80?img=28' },
      { name: 'Julián Leiva', avatar: 'https://i.pravatar.cc/80?img=7' },
      { name: 'Paola Suárez', avatar: 'https://i.pravatar.cc/80?img=57' },
    ],
    published: true,
  },
  {
    id: 'VAC-005',
    title: 'Ingeniero de DevOps',
    department: 'Infraestructura Cloud',
    priority: 'Media',
    priorityVariant: 'medium',
    openedAt: '2025-12-05',
    applications: 36,
    progress: 52,
    trend: [10, 14, 16, 19, 21, 30, 36],
    recruiters: [
      { name: 'Rafael Arboleda', avatar: 'https://i.pravatar.cc/80?img=52' },
      { name: 'Camila León', avatar: 'https://i.pravatar.cc/80?img=18' },
    ],
    published: true,
  },
  {
    id: 'VAC-006',
    title: 'Líder de Investigación UX',
    department: 'Experiencia del Cliente',
    priority: 'Alta Prioridad',
    priorityVariant: 'high',
    openedAt: '2025-12-30',
    applications: 24,
    progress: 43,
    trend: [6, 8, 11, 13, 18, 22, 24],
    recruiters: [
      { name: 'Victoria Palma', avatar: 'https://i.pravatar.cc/80?img=16' },
      { name: 'Luis Corzo', avatar: 'https://i.pravatar.cc/80?img=45' },
    ],
    published: true,
  },
];

const ActiveVacanciesPage = () => {
  const navigate = useNavigate();
  const [vacanciesData, setVacanciesData] = useState(initialVacancies);
  const [searchTerm, setSearchTerm] = useState('');

  const vacancies = useMemo(() => {
    if (!searchTerm.trim()) return vacanciesData;
    const normalized = searchTerm.trim().toLowerCase();
    return vacanciesData.filter((vacancy) => {
      return (
        vacancy.title.toLowerCase().includes(normalized) ||
        vacancy.department.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm, vacanciesData]);

  const togglePublication = (vacancyId) => {
    setVacanciesData((prev) =>
      prev.map((vacancy) => (vacancy.id === vacancyId ? { ...vacancy, published: !vacancy.published } : vacancy)),
    );
  };

  const handleCardNavigation = (vacancyId) => {
    const params = new URLSearchParams({ vacancy: vacancyId });
    navigate(`/Filtros?${params.toString()}`);
  };

  const handleCopyLink = (vacancyId) => {
    if (typeof window === 'undefined') {
      return;
    }
    const link = `${window.location.origin}/postulaciones/${vacancyId}`;
    navigator?.clipboard?.writeText?.(link);
  };

  const renderActions = (vacancyId) => {
    const actions = [
      {
        label: 'Obtener Link',
        icon: 'bi-link-45deg',
        onClick: () => handleCopyLink(vacancyId),
      },
    ];

    return actions.map((action) => (
      <button
        key={action.label}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          action.onClick();
        }}
        className="flex items-center gap-2 rounded-full border border-glass-border px-4 py-2 text-xs font-semibold text-text-muted hover:text-white hover:border-white/40"
      >
        <i className={`bi ${action.icon} text-sm`}></i>
        {action.label}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-app-bg  text-text-base space-y-8 p-6">
      <header className="space-y-4">
        <div>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-4">
            <div className="text-left">
              <h1 className="text-3xl font-semibold text-white">Gestión de Procesos Activos</h1>
              <p className="text-text-muted">Controla publicaciones, salud de los procesos y equipos evaluadores en tiempo real.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/vacantes/crear')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(139,92,246,0.45)] hover:brightness-110"
            >
              <i className="bi bi-plus-lg text-base"></i>
              Crear Nueva Vacante
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-6">
          <div className="relative flex-1">
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por rol o departamento"
              className="w-full rounded-2xl border border-glass-border bg-glass-card py-3 pl-12 pr-4 text-sm text-text-base placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
          </div>
        
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {vacancies.map((vacancy) => (
          <article
            key={vacancy.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardNavigation(vacancy.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCardNavigation(vacancy.id);
              }
            }}
            className={`${glassCard} p-6 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_35px_80px_rgba(2,6,23,0.8)] focus:outline-none focus:ring-2 focus:ring-brand-secondary/70`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{vacancy.department}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white w-full break-words text-left">{vacancy.title}</h2>
                <p className="text-sm text-text-muted">Apertura · {new Date(vacancy.openedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Aplicaciones últimas 7 jornadas</span>
                  <span className="text-white">{vacancy.applications}</span>
                </div>
                <Sparkline data={vacancy.trend} />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">{vacancy.applications} candidatos aplicados</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Equipo Evaluador</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {vacancy.recruiters.map((recruiter) => (
                      <img
                        key={recruiter.name}
                        src={recruiter.avatar}
                        alt={recruiter.name}
                        className="h-12 w-12 rounded-full border-2 border-app-bg object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-text-muted">
                    {vacancy.recruiters.map((recruiter) => recruiter.name.split(' ')[0]).join(' · ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-glass-border pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/15 text-[#6FB1FF]">
                    <i className="bi bi-linkedin text-lg"></i>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-text-muted">Publicado en LinkedIn</span>
                    <span className="text-xs text-white/70">Auto-sync semanal</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={vacancy.published}
                  onClick={(event) => {
                    event.stopPropagation();
                    togglePublication(vacancy.id);
                  }}
                  className={`relative h-8 w-16 rounded-full transition-colors ${
                    vacancy.published ? 'bg-gradient-to-r from-brand-primary to-brand-secondary' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${
                      vacancy.published ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {renderActions(vacancy.id)}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ActiveVacanciesPage;
