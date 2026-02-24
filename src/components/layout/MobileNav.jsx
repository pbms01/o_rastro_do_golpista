// src/components/layout/MobileNav.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  ChevronLeft,
  ChevronRight,
  List,
  RotateCcw,
  Timer,
} from 'lucide-react';

export default function MobileNav({ onOpenSidebar }) {
  const {
    state,
    currentStepData,
    steps,
    advanceStep,
    previousStep,
    activateVolatility,
    deactivateVolatility,
    clearDegradation,
  } = useInvestigation();

  const canGoBack = state.currentStep > 0;
  const canGoForward = state.currentStep < steps.length - 1;

  return (
    <nav className="flex-shrink-0 bg-bg-secondary border-t border-white/10 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-between gap-2">
        {/* Sidebar toggle */}
        <button
          onClick={onOpenSidebar}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-bg-tertiary hover:bg-bg-hover transition-colors"
        >
          <List className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-secondary">Etapas</span>
        </button>

        {/* Step info */}
        <div className="flex-1 text-center min-w-0">
          <p className="text-xs text-text-muted truncate">
            {currentStepData?.subtitulo}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1.5">
          {/* Volatility controls on step 7 */}
          {state.currentStep >= 7 && (
            <button
              onClick={() => {
                if (state.volatilityActive) {
                  clearDegradation();
                  deactivateVolatility();
                } else {
                  activateVolatility();
                }
              }}
              className={`p-2 rounded-lg transition-colors ${
                state.volatilityActive
                  ? 'bg-status-notPreserved/20 text-status-notPreserved'
                  : 'bg-bg-tertiary text-text-muted hover:bg-bg-hover'
              }`}
            >
              {state.volatilityActive ? (
                <RotateCcw className="w-4 h-4" />
              ) : (
                <Timer className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            onClick={previousStep}
            disabled={!canGoBack}
            className={`p-2 rounded-lg transition-colors ${
              canGoBack
                ? 'bg-bg-tertiary hover:bg-bg-hover text-text-secondary'
                : 'bg-bg-tertiary/50 text-text-muted/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={advanceStep}
            disabled={!canGoForward}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
              canGoForward
                ? 'bg-text-accent text-white hover:bg-text-accent/90'
                : 'bg-bg-tertiary/50 text-text-muted/30'
            }`}
          >
            <div className="flex items-center gap-1">
              <span>Avançar</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
