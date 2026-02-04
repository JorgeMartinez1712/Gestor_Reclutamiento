import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const glassCard = 'rounded-3xl border border-glass-border bg-glass-card backdrop-blur-2xl shadow-[0_30px_80px_rgba(2,6,23,0.65)]';

const CreateVacancyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roleTitle: 'Product Marketing Manager',
    department: 'Marketing',
    seniority: 'Mid-Senior',
    workMode: 'Híbrido Caracas',
    headcount: 1,
    salary: { min: '55,000', max: '68,000', currency: 'USD' },
    summary: 'Define narrativas y go-to-market para los nuevos verticales digitales del banco.',
    responsibilities: [
      'Alinear posicionamiento de producto con squads de Growth',
      'Crear campañas multi-touch para lanzamientos regionales',
      'Coordinar entrenamientos de enablement para equipos comerciales',
    ],
    requirements: [
      '5+ años en marketing de productos SaaS o fintech',
      'Dominio avanzado de métricas de pipeline y revenue',
      'Inglés C1 con experiencia colaborando con equipos globales',
    ],
    benefits: ['Bono trimestral ligado a NPS', 'Workation 15 días', 'Cobertura médica premium'],
    recruiterTeam: [
      { name: 'Paola Vega', role: 'Talent Lead', avatar: 'https://i.pravatar.cc/120?img=15' },
      { name: 'Héctor Paredes', role: 'Business Partner', avatar: 'https://i.pravatar.cc/120?img=5' },
      { name: 'Claudia Ramos', role: 'Hiring Manager', avatar: 'https://i.pravatar.cc/120?img=45' },
    ],
    timeline: [
      { label: 'Kickoff', due: '04 Feb', status: 'done' },
      { label: 'Filtro CV', due: '08 Feb', status: 'in-progress' },
      { label: 'Panel final', due: '15 Feb', status: 'pending' },
    ],
    publication: {
      channels: {
        linkedin: true,
        instagram: false,
        referrals: true,
      },
      autoClose: true,
      notifySLA: true,
    },
    tags: ['Go-to-market', 'Fintech', 'Liderazgo'],
  });
  const [drafts, setDrafts] = useState({ responsibility: '', requirement: '' });

  const departments = ['Marketing', 'Producto', 'Tecnología', 'Operaciones', 'Data', 'Ventas'];
  const workModes = ['Remoto', 'Híbrido Caracas', 'Presencial'];
  const seniorities = ['Junior', 'Mid-Senior', 'Senior', 'Director'];
  const skillSuggestions = ['Storytelling', 'Automatización', 'Revenue Ops', 'Investigación CX', 'Growth Loops'];

  const readinessScore = useMemo(() => {
    const fields = [form.roleTitle, form.department, form.summary, form.seniority, form.workMode];
    const filled = fields.filter(Boolean).length + form.responsibilities.length + form.requirements.length;
    const total = 9;
    return Math.min(100, Math.round((filled / total) * 100));
  }, [form]);

  const hiringVelocity = useMemo(() => {
    const completed = form.timeline.filter((step) => step.status === 'done').length;
    return Math.round((completed / form.timeline.length) * 100) || 0;
  }, [form.timeline]);

  const handleFieldChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSalaryChange = (field, value) => setForm((prev) => ({
    ...prev,
    salary: {
      ...prev.salary,
      [field]: value,
    },
  }));
  const handleDraftChange = (field, value) => setDrafts((prev) => ({ ...prev, [field]: value }));

  const handleAddListItem = (key) => {
    const draftKey = key === 'responsibilities' ? 'responsibility' : 'requirement';
    const value = drafts[draftKey].trim();
    if (!value) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));
    handleDraftChange(draftKey, '');
  };

  const handleDraftKeyDown = (event, key) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddListItem(key);
    }
  };

  const handleRemoveListItem = (key, index) => setForm((prev) => ({
    ...prev,
    [key]: prev[key].filter((_, idx) => idx !== index),
  }));

  const handleToggleChannel = (channel) => setForm((prev) => ({
    ...prev,
    publication: {
      ...prev.publication,
      channels: {
        ...prev.publication.channels,
        [channel]: !prev.publication.channels[channel],
      },
    },
  }));

  const handleToggleSetting = (setting) => setForm((prev) => ({
    ...prev,
    publication: {
      ...prev.publication,
      [setting]: !prev.publication[setting],
    },
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table(form);
  };

  const personaInsights = [
    { label: 'Arquetipo', value: 'Builder Estratégico' },
    { label: 'Motivador clave', value: 'Impacto en roadmap regional' },
    { label: 'Pull factor', value: 'Acceso a squads multipaís' },
  ];

  const activityLog = [
    { id: 1, action: 'Brief validado por Producto', timestamp: 'Hace 2h' },
    { id: 2, action: 'LinkedIn job template actualizado', timestamp: 'Hace 6h' },
    { id: 3, action: 'Talent Ops aprobó headcount', timestamp: 'Ayer' },
  ];

  const channelMetadata = {
    linkedin: { label: 'LinkedIn', icon: 'bi-linkedin', accent: 'text-[#6FB1FF]' },
    instagram: { label: 'Instagram', icon: 'bi-instagram', accent: 'text-[#E1306C]' },
    referrals: { label: 'Referidos', icon: 'bi-people', accent: 'text-brand-secondary' },
  };

  const timelineVariants = {
    done: 'bg-status-success-soft text-status-success border border-status-success',
    'in-progress': 'bg-status-warning-soft text-status-warning border border-status-warning',
    pending: 'bg-white/5 text-text-muted border border-white/10',
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-base p-6 space-y-8">
      <header className="space-y-6 ">
        <div>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-4">
            <div className="text-left">
              <h1 className="text-3xl font-semibold text-white">Configura la próxima apertura</h1>
              <p className="text-text-muted text-sm max-w-2xl">
                Orquesta la vacante, sincroniza al squad evaluador y publícala en minutos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              
              <button
                type="button"
                className="rounded-full border border-brand-secondary/60 bg-brand-secondary/10 px-6 py-3 text-sm font-semibold text-brand-secondary"
              >
                Guardar borrador
              </button>
              <button
                type="submit"
                form="create-vacancy-form"
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(139,92,246,0.45)]"
              >
                <i className="bi bi-rocket-takeoff text-base"></i>
                Publicar ahora
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <form id="create-vacancy-form" onSubmit={handleSubmit} className="space-y-6">
          <section className={`${glassCard} p-6 space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">Brief de la vacante</h2>
              <p className="text-sm text-text-muted">Define los atributos clave que verán los candidatos y el comité evaluador.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                Rol abierto
                <input
                  type="text"
                  value={form.roleTitle}
                  onChange={(event) => handleFieldChange('roleTitle', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Área
                <select
                  value={form.department}
                  onChange={(event) => handleFieldChange('department', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {departments.map((department) => (
                    <option key={department} value={department} className="bg-app-bg">{department}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm">
                Seniority
                <select
                  value={form.seniority}
                  onChange={(event) => handleFieldChange('seniority', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {seniorities.map((level) => (
                    <option key={level} value={level} className="bg-app-bg">{level}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Modalidad
                <select
                  value={form.workMode}
                  onChange={(event) => handleFieldChange('workMode', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {workModes.map((mode) => (
                    <option key={mode} value={mode} className="bg-app-bg">{mode}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Headcount
                <input
                  type="number"
                  min="1"
                  value={form.headcount}
                  onChange={(event) => handleFieldChange('headcount', Number(event.target.value))}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm">
              Pitch de la vacante
              <textarea
                rows={3}
                value={form.summary}
                onChange={(event) => handleFieldChange('summary', event.target.value)}
                className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              ></textarea>
            </label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm">
                Salario mínimo
                <input
                  type="text"
                  value={form.salary.min}
                  onChange={(event) => handleSalaryChange('min', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Salario máximo
                <input
                  type="text"
                  value={form.salary.max}
                  onChange={(event) => handleSalaryChange('max', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Moneda
                <select
                  value={form.salary.currency}
                  onChange={(event) => handleSalaryChange('currency', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {[
                    { value: 'USD', label: 'Dólares' },
                    { value: 'VES', label: 'Bolívares' },
                  ].map((c) => (
                    <option key={c.value} value={c.value} className="bg-app-bg">{c.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className={`${glassCard} p-6 space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">Storytelling de la vacante</h2>
              <p className="text-sm text-text-muted">Construye responsabilidades y requisitos accionables. Agrega insights con un enter.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Responsabilidades</p>
                  <span className="text-xs text-text-muted">{form.responsibilities.length} bullets</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-dashed border-glass-border bg-white/5 px-4 py-3">
                  <input
                    type="text"
                    value={drafts.responsibility}
                    onChange={(event) => handleDraftChange('responsibility', event.target.value)}
                    onKeyDown={(event) => handleDraftKeyDown(event, 'responsibilities')}
                    placeholder="Ej. Escalar campañas ABM para banca empresarial"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddListItem('responsibilities')}
                    className="rounded-full bg-brand-primary/20 px-4 py-1.5 text-xs font-semibold text-brand-primary"
                  >
                    Añadir
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.responsibilities.map((item, index) => (
                    <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveListItem('responsibilities', index)}
                        className="text-text-muted hover:text-white"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Requisitos clave</p>
                  <span className="text-xs text-text-muted">{form.requirements.length} musts</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-dashed border-glass-border bg-white/5 px-4 py-3">
                  <input
                    type="text"
                    value={drafts.requirement}
                    onChange={(event) => handleDraftChange('requirement', event.target.value)}
                    onKeyDown={(event) => handleDraftKeyDown(event, 'requirements')}
                    placeholder="Ej. Experiencia lanzando en 3+ países"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddListItem('requirements')}
                    className="rounded-full bg-brand-primary/20 px-4 py-1.5 text-xs font-semibold text-brand-primary"
                  >
                    Añadir
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.requirements.map((item, index) => (
                    <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveListItem('requirements', index)}
                        className="text-text-muted hover:text-white"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillSuggestions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleDraftChange('responsibility', `${drafts.responsibility} ${skill}`.trim())}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-text-muted hover:border-white/40"
                >
                  {skill}
                </button>
              ))}
            </div>
          </section>

          <section className={`${glassCard} p-6 space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">Plan de reclutamiento</h2>
              <p className="text-sm text-text-muted">Orquesta los hitos clave y automatiza las notificaciones del squad evaluador.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {form.timeline.map((step) => (
                <div key={step.label} className={`space-y-2 rounded-2xl border px-4 py-3 text-sm ${timelineVariants[step.status]}`}>
                  <p className="text-xs uppercase tracking-[0.4em]">{step.label}</p>
                  <p className="text-2xl font-semibold">{step.due}</p>
                  <p>{step.status === 'done' ? '✅ completado' : step.status === 'in-progress' ? '⚡ en curso' : '🗓 pendiente'}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Beneficios destacados</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {form.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <i className="bi bi-stars text-brand-secondary"></i>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Tags estratégicos</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-3 py-1 text-xs text-brand-secondary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${glassCard} p-6 space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">Publicación y automatizaciones</h2>
              <p className="text-sm text-text-muted">Activa los canales adecuados según la seniority y activa cierres automáticos.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {Object.entries(form.publication.channels).map(([channel, active]) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleToggleChannel(channel)}
                  className={`flex flex-col gap-2 rounded-2xl border px-4 py-4 text-left text-sm transition ${active ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-white/10 bg-white/5 text-text-muted hover:border-white/30'}`}
                >
                  <span className="flex items-center gap-2 text-base">
                    <i className={`bi ${channelMetadata[channel].icon} ${channelMetadata[channel].accent}`}></i>
                    {channelMetadata[channel].label}
                  </span>
                  <span>{active ? 'Sincronizado cada 24h' : 'Inactivo'}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Cerrar automáticamente cuando se cubra headcount</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSetting('autoClose')}
                  className={`relative h-8 w-16 rounded-full ${form.publication.autoClose ? 'bg-gradient-to-r from-brand-primary to-brand-secondary' : 'bg-white/10'}`}
                >
                  <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${form.publication.autoClose ? 'translate-x-8' : ''}`}></span>
                </button>
              </label>
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Notificar SLA al squad evaluador</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSetting('notifySLA')}
                  className={`relative h-8 w-16 rounded-full ${form.publication.notifySLA ? 'bg-gradient-to-r from-brand-primary to-brand-secondary' : 'bg-white/10'}`}
                >
                  <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${form.publication.notifySLA ? 'translate-x-8' : ''}`}></span>
                </button>
              </label>
            </div>
          </section>
        </form>

        <aside className="space-y-6">
          <section className={`${glassCard} p-6 space-y-5`}>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Vista previa</p>
              <h3 className="text-2xl font-semibold leading-tight text-white">{form.roleTitle}</h3>
              <p className="text-sm text-text-muted">{form.department} · {form.workMode}</p>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <p>{form.summary}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Rango salarial</p>
              <p className="text-2xl font-semibold">{form.salary.currency} {form.salary.min} - {form.salary.max}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Equipo evaluador</p>
              <div className="mt-3 space-y-3">
                {form.recruiterTeam.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{member.name}</p>
                      <p className="text-xs text-text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${glassCard} p-6 space-y-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Candidate persona</p>
                <h3 className="text-lg font-semibold">Perfil ideal</h3>
              </div>
              <span className="rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-3 py-1 text-xs text-brand-secondary">Calor {readinessScore}%</span>
            </div>
            <dl className="space-y-3 text-sm">
              {personaInsights.map((insight) => (
                <div key={insight.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <dt className="text-xs uppercase tracking-[0.4em] text-text-muted">{insight.label}</dt>
                  <dd className="text-white">{insight.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${glassCard} p-6 space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Bitácora</h3>
              <button type="button" className="text-xs text-text-muted hover:text-white">Ver historial</button>
            </div>
            <ul className="space-y-4 text-sm">
              {activityLog.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-secondary"></span>
                  <div>
                    <p className="text-white/90">{entry.action}</p>
                    <p className="text-xs uppercase tracking-[0.4em] text-text-muted">{entry.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CreateVacancyPage;
