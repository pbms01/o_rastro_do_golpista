// src/components/sidebar/TransformInfo.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { ArrowRight, Zap, Clock } from 'lucide-react';

export default function TransformInfo() {
  const { currentStepData } = useInvestigation();

  if (!currentStepData?.transform) {
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
        <Zap className="w-3 h-3" />
        Transform Executado
      </h2>

      <div className="bg-bg-tertiary rounded-lg p-3 space-y-3">
        {/* Transform name */}
        <div>
          <p className="text-xs text-text-muted mb-1">Comando</p>
          <code className="text-sm font-mono text-text-accent break-all">
            {currentStepData.transform}
          </code>
        </div>

        {/* Source */}
        {currentStepData.transformFonte && (
          <div className="flex items-center gap-2 text-xs">
            <ArrowRight className="w-3 h-3 text-text-muted" />
            <span className="text-text-muted">Fonte:</span>
            <span className="text-text-secondary">{currentStepData.transformFonte}</span>
          </div>
        )}

        {/* Estimated time */}
        {currentStepData.tempoEstimado && (
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3 h-3 text-text-muted" />
            <span className="text-text-muted">Tempo:</span>
            <span className="text-text-secondary">{currentStepData.tempoEstimado}</span>
          </div>
        )}

        {/* Explanation */}
        {currentStepData.transformExplicacao && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-text-muted leading-relaxed">
              {currentStepData.transformExplicacao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
