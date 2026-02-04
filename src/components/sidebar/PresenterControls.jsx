// src/components/sidebar/PresenterControls.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Eye,
  EyeOff,
  Shield,
  Timer,
  Tag,
} from 'lucide-react';

export default function PresenterControls() {
  const {
    state,
    steps,
    advanceStep,
    previousStep,
    resetInvestigation,
    toggleVulnerabilities,
    toggleCustodyStatus,
    toggleEdgeLabels,
    activateVolatility,
    deactivateVolatility,
  } = useInvestigation();

  const canGoBack = state.currentStep > 0;
  const canGoForward = state.currentStep < steps.length - 1;
  const isLastStep = state.currentStep === steps.length - 1;

  const handleReset = () => {
    if (window.confirm('Reiniciar a investigação do início?')) {
      resetInvestigation();
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Navigation buttons */}
      <div className="flex gap-2">
        <button
          onClick={previousStep}
          disabled={!canGoBack}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
            canGoBack
              ? 'bg-bg-tertiary hover:bg-bg-hover text-text-secondary'
              : 'bg-bg-tertiary/50 text-text-muted cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Anterior</span>
        </button>

        <button
          onClick={advanceStep}
          disabled={!canGoForward}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
            canGoForward
              ? 'bg-text-accent text-white hover:bg-text-accent/90'
              : 'bg-bg-tertiary/50 text-text-muted cursor-not-allowed'
          }`}
        >
          <span className="text-sm">
            {isLastStep ? 'Fim' : 'Próxima'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Toggle buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={toggleEdgeLabels}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
            state.showEdgeLabels
              ? 'bg-text-accent/20 text-text-accent border border-text-accent/30'
              : 'bg-bg-tertiary text-text-muted hover:bg-bg-hover'
          }`}
        >
          <Tag className="w-3 h-3" />
          Labels
        </button>

        <button
          onClick={toggleCustodyStatus}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
            state.showCustodyStatus
              ? 'bg-status-preserved/20 text-status-preserved border border-status-preserved/30'
              : 'bg-bg-tertiary text-text-muted hover:bg-bg-hover'
          }`}
        >
          <Shield className="w-3 h-3" />
          Custódia
        </button>

        <button
          onClick={toggleVulnerabilities}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
            state.showVulnerabilities
              ? 'bg-status-notPreserved/20 text-status-notPreserved border border-status-notPreserved/30'
              : 'bg-bg-tertiary text-text-muted hover:bg-bg-hover'
          }`}
        >
          {state.showVulnerabilities ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          Vulns
        </button>

        {state.currentStep >= 7 && (
          <button
            onClick={() => {
              if (state.volatilityActive) {
                deactivateVolatility();
              } else {
                activateVolatility();
              }
            }}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
              state.volatilityActive
                ? 'bg-status-volatile/20 text-status-volatile border border-status-volatile/30'
                : 'bg-bg-tertiary text-text-muted hover:bg-bg-hover'
            }`}
          >
            <Timer className="w-3 h-3" />
            72h
          </button>
        )}
      </div>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary hover:bg-bg-hover text-text-muted transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-sm">Reiniciar</span>
      </button>

      {/* Keyboard shortcuts hint */}
      <div className="text-xs text-text-muted text-center pt-2 border-t border-white/5">
        <span className="opacity-70">
          ← → navegar • V vulns • R reset • ? ajuda
        </span>
      </div>
    </div>
  );
}
