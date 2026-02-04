// src/components/sidebar/StepNarrative.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { narratives } from '../../data/narratives';
import { AlertTriangle, MessageSquare } from 'lucide-react';

export default function StepNarrative() {
  const { state } = useInvestigation();
  const narrative = narratives[state.currentStep];

  if (!narrative) {
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
        <MessageSquare className="w-3 h-3" />
        Narrativa
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary leading-tight">
          {narrative.titulo}
        </h3>

        {/* Body */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {narrative.corpo}
        </p>

        {/* Highlight */}
        {narrative.destaque && (
          <div className="bg-status-volatile/10 border border-status-volatile/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-status-volatile flex-shrink-0 mt-0.5" />
              <p className="text-sm text-status-volatile leading-relaxed">
                {narrative.destaque}
              </p>
            </div>
          </div>
        )}

        {/* Final question (Step 7) */}
        {narrative.perguntaFinal && (
          <div className="bg-bg-tertiary border border-white/10 rounded-lg p-4 mt-4">
            <p className="text-sm text-text-primary leading-relaxed italic">
              "{narrative.perguntaFinal}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
