import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MOCK_VACANCIES = [
  { id: 'VAC-001', title: 'Arquitecto de Software Senior' },
  { id: 'VAC-002', title: 'Desarrollador React Senior' },
  { id: 'VAC-003', title: 'Gerente de Producto' },
  { id: 'VAC-004', title: 'Científico de Datos' },
  { id: 'VAC-005', title: 'Ingeniero de DevOps' },
  { id: 'VAC-006', title: 'Líder de Investigación UX' },
];

const MOCK_CANDIDATES = [
  { id: 101, vacancyId: 'VAC-002', name: 'Ana García', role: 'Desarrollador Frontend', stage: 'Postulados', matchScore: 92, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=101' },
  { id: 102, vacancyId: 'VAC-002', name: 'Carlos Ruiz', role: 'Desarrollador Frontend', stage: 'Postulados', matchScore: 65, source: 'instagram', avatar: 'https://i.pravatar.cc/150?u=102' },
  { id: 103, vacancyId: 'VAC-001', name: 'Sofía Lerman', role: 'React Senior', stage: 'Screening', matchScore: 88, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=103' },
  { id: 104, vacancyId: 'VAC-003', name: 'Miguel Ángel', role: 'Fullstack', stage: 'Entrevista', matchScore: 95, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=104' },
  { id: 105, vacancyId: 'VAC-001', name: 'Lucía Méndez', role: 'Arquitecto Frontend', stage: 'Oferta', matchScore: 98, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=105' },
  { id: 106, vacancyId: 'VAC-004', name: 'Javier Costa', role: 'Desarrollador Jr', stage: 'Screening', matchScore: 78, source: 'instagram', avatar: 'https://i.pravatar.cc/150?u=106' },

  { id: 107, vacancyId: 'VAC-002', name: 'María Fernanda', role: 'Frontend', stage: 'Screening', matchScore: 81, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=107' },
  { id: 108, vacancyId: 'VAC-003', name: 'Diego Torres', role: 'Product Manager', stage: 'Postulados', matchScore: 72, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=108' },
  { id: 109, vacancyId: 'VAC-005', name: 'Natalia Ríos', role: 'DevOps', stage: 'Entrevista', matchScore: 85, source: 'instagram', avatar: 'https://i.pravatar.cc/150?u=109' },
  { id: 110, vacancyId: 'VAC-005', name: 'Pablo Méndez', role: 'SRE Jr', stage: 'Postulados', matchScore: 60, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=110' },
  { id: 111, vacancyId: 'VAC-006', name: 'Clara Ruiz', role: 'UX Researcher', stage: 'Postulados', matchScore: 77, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=111' },
  { id: 112, vacancyId: 'VAC-004', name: 'Roberto Salas', role: 'Data Scientist', stage: 'Oferta', matchScore: 94, source: 'linkedin', avatar: 'https://i.pravatar.cc/150?u=112' },
];

const PIPELINE_STAGES = [
  { key: 'Postulados', label: 'Postulados', color: 'border-blue-500' },
  { key: 'Screening', label: 'Evaluación Inicial', color: 'border-purple-500' },
  { key: 'Entrevista', label: 'Entrevista Técnica', color: 'border-cyan-500' },
  { key: 'Oferta', label: 'Oferta', color: 'border-green-400' },
  { key: 'Contratado', label: 'Contratado', color: 'border-emerald-400' }
];


const SelectionFilterPage = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(MOCK_VACANCIES[0].id);
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [draggedCandidateId, setDraggedCandidateId] = useState(null);

  const filteredCandidates = useMemo(() => {
    if (!selectedVacancy) return candidates;
    return candidates.filter((c) => String(c.vacancyId) === String(selectedVacancy));
  }, [candidates, selectedVacancy]);

  const draggingCandidate = useMemo(() => {
    if (!draggedCandidateId) return null;
    return candidates.find((c) => String(c.id) === String(draggedCandidateId)) || null;
  }, [candidates, draggedCandidateId]);

  const chartData = useMemo(() => {
    const counts = {
      Postulados: filteredCandidates.filter(c => c.stage === 'Postulados').length,
      Screening: filteredCandidates.filter(c => c.stage === 'Screening').length,
      Entrevista: filteredCandidates.filter(c => c.stage === 'Entrevista').length,
      Oferta: filteredCandidates.filter(c => c.stage === 'Oferta').length,
      Contratado: filteredCandidates.filter(c => c.stage === 'Contratado').length,
    };

    return {
      labels: ['Postulados', 'Evaluación Inicial', 'Entrevista', 'Oferta', 'Contratado'],
      datasets: [
        {
          label: 'Candidatos Activos',
          data: [counts.Postulados, counts.Screening, counts.Entrevista, counts.Oferta, counts.Contratado],
          backgroundColor: [
            'rgba(139, 92, 246, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(52, 211, 153, 0.7)',
            'rgba(16, 185, 129, 0.7)'
          ],
          borderColor: [
            'rgba(139, 92, 246, 1)',
            'rgba(99, 102, 241, 1)',
            'rgba(6, 182, 212, 1)',
            'rgba(52, 211, 153, 1)',
            'rgba(16, 185, 129, 1)'
          ],
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.6,
        },
      ],
    };
  }, [filteredCandidates]);

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(5, 3, 18, 0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#e2e8f0', font: { weight: 'bold' } }
      }
    }
  };

  const handleDragStart = (event, candidateId) => {
    event.dataTransfer.setData('text/plain', String(candidateId));
    event.dataTransfer.effectAllowed = 'move';
    setDraggedCandidateId(candidateId);
  };

  const handleDragEnd = () => {
    setDraggedCandidateId(null);
  };

  const handleDropCandidate = (event, targetStage) => {
    event.preventDefault();
    const droppedId = event.dataTransfer.getData('text/plain');
    const candidateId = droppedId || draggedCandidateId;
    if (!candidateId) return;

    setCandidates((prev) =>
      prev.map((c) =>
        String(c.id) === String(candidateId)
          ? { ...c, stage: targetStage }
          : c
      )
    );
    setDraggedCandidateId(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6 w-full text-text-base">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Filtro de Selección Estratégico
          </h1>
          <p className="text-text-muted text-sm mt-1 flex">
            Gestión operativa del talento y métricas de conversión.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="relative group">
            <select
              className="appearance-none bg-glass-card border border-glass-border text-text-base py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary cursor-pointer min-w-[240px]"
              value={selectedVacancy}
              onChange={(e) => setSelectedVacancy(e.target.value)}
            >
              {MOCK_VACANCIES.map(v => (
                <option key={v.id} value={v.id} className="bg-app-bg text-text-base">
                  {v.title}
                </option>
              ))}
            </select>
            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none group-hover:text-brand-primary transition-colors"></i>
          </div>

          <button className="flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary px-4 py-2.5 rounded-lg transition-all font-medium text-sm">
            <i className="bi bi-file-earmark-bar-graph"></i>
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-glass-card border border-glass-border rounded-xl p-5 backdrop-blur-md relative overflow-hidden">

        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 h-[220px] relative">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
              Embudo de Conversión Actual
            </h3>
            <Bar options={chartOptions} data={chartData} />
          </div>

          <div className="w-full md:w-64 flex flex-col justify-center gap-4 border-l border-glass-border pl-0 md:pl-8">
            <div className="space-y-1">
              <span className="text-xs text-text-muted">Tasa de Progresión Total</span>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                32.4%
              </div>
              <p className="text-[11px] text-red-400 flex items-center">
                Perdemos 30% en la etapa de Evaluación Inicial
              </p>
            </div>
            <div className="h-px w-full bg-glass-border"></div>
            <div className="space-y-1">
              <span className="text-xs text-text-muted">Tiempo Promedio en Etapa</span>
              <div className="text-xl font-semibold text-text-base">
                2.5 Días
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-muted">
        <i className="bi bi-arrows-move"></i>
        <span>Arrastra candidatos entre columnas para cambiar la etapa.</span>
      </div>

        <div className="w-full flex gap-4 flex-nowrap overflow-x-hidden pb-4">
          {PIPELINE_STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter(c => c.stage === stage.key);
          const isActiveDropZone = Boolean(draggingCandidate && stage.key !== draggingCandidate.stage);

          return (
            <div
              key={stage.key}
              className={`flex-1 flex flex-col h-full min-h-[500px] min-w-0 bg-glass-card/30 border border-glass-border rounded-xl backdrop-blur-sm transition-colors ${isActiveDropZone ? 'border-brand-primary/60 bg-brand-primary/5 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : ''}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDropCandidate(event, stage.key)}
            >
              <div className={`p-4 border-b border-glass-border border-t-4 ${stage.color} rounded-t-xl bg-app-bg/50`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text-base">{stage.label}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-glass-border text-xs text-text-muted font-medium">
                    {stageCandidates.length}
                  </span>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1">
                {stageCandidates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-text-muted/50 border-2 border-dashed border-glass-border rounded-lg">
                    <i className="bi bi-inbox text-2xl mb-1"></i>
                    <span className="text-xs">Sin candidatos</span>
                  </div>
                ) : (
                  stageCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      isLastStage={stage.key === 'Contratado'}
                      isDragging={String(candidate.id) === String(draggedCandidateId)}
                      onDragStart={(event) => handleDragStart(event, candidate.id)}
                      onDragEnd={handleDragEnd}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CandidateCard = ({ candidate, isLastStage, isDragging, onDragStart, onDragEnd }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (score >= 80) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div
      className={`group relative p-2 rounded-lg bg-glass-card border border-glass-border hover:border-brand-primary/50 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-brand-primary/5 ${isDragging ? 'opacity-60 scale-[0.985]' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-8 h-8 rounded-full object-cover border border-glass-border group-hover:border-brand-secondary transition-colors"
          />

          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-app-bg flex items-center justify-center border border-glass-border shadow-sm">
            {candidate.source === 'linkedin' ? (
              <i className="bi bi-linkedin text-[10px] text-[#0077b5]"></i>
            ) : candidate.source === 'instagram' ? (
              <i className="bi bi-instagram text-[10px] text-[#E1306C]"></i>
            ) : (
              <i className="bi bi-globe text-[10px] text-gray-400"></i>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-text-base truncate">{candidate.name}</h4>
          <p className="text-[9px] text-text-muted truncate mb-1">{candidate.role}</p>


          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium border ${getScoreColor(candidate.matchScore)}`}>
            <i className="bi bi-activity"></i> {candidate.matchScore}%
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-glass-border flex items-center justify-between text-[10px] text-text-muted">
        <span className="flex items-center gap-1">
          <i className="bi bi-arrows-move"></i> Arrastra para mover
        </span>
        {isLastStage && (
          <span className="text-green-400 flex items-center gap-1">
            <i className="bi bi-check-circle-fill"></i> Contratado
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectionFilterPage;
