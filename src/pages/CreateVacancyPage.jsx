import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const glassCard = 'rounded-3xl border border-glass-border bg-glass-card backdrop-blur-2xl shadow-[0_30px_80px_rgba(2,6,23,0.65)]';

const workModes = ['Remoto', 'Híbrido', 'Presencial'];
const candidateLimitOptions = [
  { value: '25', label: '25 candidatos' },
  { value: '50', label: '50 candidatos' },
  { value: '100', label: '100 candidatos' },
  { value: '200', label: '200 candidatos' },
  { value: 'unlimited', label: 'Ilimitado' },
];
const currencyOptions = [
  { value: 'USD', label: 'Dólares' },
  { value: 'VES', label: 'Bolívares' },
];
const skillGroups = [
  { key: 'habilidadesTecnicas', label: 'Habilidades técnicas', placeholder: 'Ej. React, Node.js, microservicios' },
  { key: 'habilidadesBlandas', label: 'Habilidades blandas', placeholder: 'Ej. Comunicación efectiva' },
  { key: 'conocimientosIdiomas', label: 'Idiomas necesarios', placeholder: 'Ej. Inglés C1' },
  { key: 'herramientasAdicionales', label: 'Herramientas adicionales', placeholder: 'Ej. Git, Postman' },
];

const normalizeList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [String(value)];
};

const buildInitialForm = (aiData) => ({
  roleTitle: aiData?.puestoSugerido ?? '',
  seniority: aiData?.seniorityRecomendado ?? '',
  workMode: 'Remoto',
  candidateLimit: '50',
  salary: { min: '', max: '', currency: 'USD' },
  habilidadesTecnicas: normalizeList(aiData?.habilidadesTecnicas),
  habilidadesBlandas: normalizeList(aiData?.habilidadesBlandas),
  conocimientosIdiomas: normalizeList(aiData?.conocimientosIdiomas),
  herramientasAdicionales: normalizeList(aiData?.herramientasAdicionales),
});

const buildDrafts = () => ({
  habilidadesTecnicas: '',
  habilidadesBlandas: '',
  conocimientosIdiomas: '',
  herramientasAdicionales: '',
});

const CreateVacancyPage = () => {
  const location = useLocation();
  const aiData = location.state?.aiData;
  const [form, setForm] = useState(() => buildInitialForm(aiData));
  const [drafts, setDrafts] = useState(buildDrafts);

  useEffect(() => {
    if (!aiData) return;
    setForm(buildInitialForm(aiData));
    setDrafts(buildDrafts());
  }, [aiData]);

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
    const value = drafts[key].trim();
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));
    handleDraftChange(key, '');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table(form);
  };

  const candidateLimitLabel = candidateLimitOptions.find((option) => option.value === form.candidateLimit)?.label || 'Ilimitado';

  return (
    <div className="min-h-screen bg-app-bg text-text-base p-6 space-y-8">
      <header className="space-y-6">
        <div>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-4">
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Crear vacante</h1>
              <p className="text-text-muted text-sm mt-2 mb-2">
                Ajusta los datos sugeridos por la IA y completa los criterios finales de selección.
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
              <h2 className="text-xl font-semibold text-white">Datos base de la vacante</h2>
              <p className="text-sm text-text-muted">Revisa el puesto sugerido y ajusta los criterios finales.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                Puesto sugerido
                <input
                  type="text"
                  value={form.roleTitle}
                  onChange={(event) => handleFieldChange('roleTitle', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Seniority recomendado
                <input
                  type="text"
                  value={form.seniority}
                  onChange={(event) => handleFieldChange('seniority', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                Límite de candidatos
                <select
                  value={form.candidateLimit}
                  onChange={(event) => handleFieldChange('candidateLimit', event.target.value)}
                  className="rounded-2xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                >
                  {candidateLimitOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-app-bg">{option.label}</option>
                  ))}
                </select>
              </label>
            </div>
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
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-app-bg">{option.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className={`${glassCard} p-6 space-y-6`}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-white">Habilidades y requisitos</h2>
              <p className="text-sm text-text-muted">Ajusta las habilidades detectadas por la IA y agrega nuevos criterios.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{group.label}</p>
                    <span className="text-xs text-text-muted">{form[group.key].length} items</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-dashed border-glass-border bg-white/5 px-4 py-3">
                    <input
                      type="text"
                      value={drafts[group.key]}
                      onChange={(event) => handleDraftChange(group.key, event.target.value)}
                      onKeyDown={(event) => handleDraftKeyDown(event, group.key)}
                      placeholder={group.placeholder}
                      className="w-full bg-transparent text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddListItem(group.key)}
                      className="rounded-full bg-brand-primary/20 px-4 py-1.5 text-xs font-semibold text-brand-primary"
                    >
                      Añadir
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form[group.key].length ? (
                      form[group.key].map((item, index) => (
                        <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                          {item}
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem(group.key, index)}
                            className="text-text-muted hover:text-white"
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-text-muted/70 italic">Sin items agregados</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </form>

        <aside className="space-y-6">
          <section className={`${glassCard} p-6 space-y-5`}>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Vista previa</p>
              <h3 className="text-2xl font-semibold leading-tight text-white">{form.roleTitle || 'Puesto sin definir'}</h3>
              <p className="text-sm text-text-muted">{form.seniority || 'Seniority por definir'} · {form.workMode}</p>
            </div>
            <div className="space-y-4 text-sm text-white/80">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Límite de candidatos</p>
                <p className="text-lg font-semibold text-white">{candidateLimitLabel}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-text-muted">Rango salarial</p>
                <p className="text-2xl font-semibold">
                  {form.salary.currency} {form.salary.min || '--'} - {form.salary.max || '--'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.key} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-text-muted">{group.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form[group.key].length ? (
                      form[group.key].map((item, index) => (
                        <span key={`${group.key}-${index}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-text-muted/70 italic">Sin datos</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CreateVacancyPage;
