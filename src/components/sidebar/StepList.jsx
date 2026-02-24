// src/components/sidebar/StepList.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  FileText,
  Search,
  GitBranch,
  Server,
  Globe,
  Network,
  ShieldAlert,
  Timer,
  Check,
} from 'lucide-react';

const iconMap = {
  FileText,
  Search,
  GitBranch,
  Server,
  Globe,
  Network,
  ShieldAlert,
  Timer,
};

export default function StepList({ onStepClick }) {
  const { state, steps, goToStep } = useInvestigation();

  const handleClick = (stepId, isVisited) => {
    if (isVisited) {
      goToStep(stepId);
      if (onStepClick) onStepClick();
    }
  };

  return (
    <div className="p-3 lg:p-4">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 lg:mb-3">
        Etapas da Investigação
      </h2>
      <nav className="space-y-1">
        {steps.map((step) => {
          const isCurrent = state.currentStep === step.id;
          const isVisited = step.id <= state.maxStepReached;
          const isFuture = step.id > state.maxStepReached;
          const IconComponent = iconMap[step.icone] || FileText;

          return (
            <button
              key={step.id}
              onClick={() => handleClick(step.id, isVisited)}
              disabled={isFuture}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                isCurrent
                  ? 'bg-text-accent/10 border-l-2 border-text-accent'
                  : isVisited
                  ? 'hover:bg-bg-hover cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isCurrent
                    ? 'bg-text-accent/20 text-text-accent'
                    : isVisited
                    ? 'bg-bg-tertiary text-text-secondary'
                    : 'bg-bg-tertiary/50 text-text-muted'
                }`}
              >
                {isVisited && !isCurrent ? (
                  <Check className="w-4 h-4 text-status-preserved" />
                ) : (
                  <IconComponent className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isCurrent
                      ? 'text-text-primary'
                      : isVisited
                      ? 'text-text-secondary'
                      : 'text-text-muted'
                  }`}
                >
                  {step.titulo}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {step.subtitulo}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
