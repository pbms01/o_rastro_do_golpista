// src/components/layout/BottomBar.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Shield, ShieldAlert, ShieldCheck, RotateCcw, Timer } from 'lucide-react';
import { entityTypes } from '../../utils/entityTypes';

export default function BottomBar() {
  const {
    state,
    custodyStats,
    deactivateVolatility,
    clearDegradation,
  } = useInvestigation();

  const showCustodyBar = state.currentStep >= 6 || state.showCustodyStatus;

  return (
    <footer className="h-16 flex-shrink-0 bg-bg-secondary border-t border-white/10 px-6 flex items-center justify-between">
      {/* Custody Status */}
      {showCustodyBar ? (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-text-muted" />
            <span className="text-sm text-text-secondary">Cadeia de Custódia:</span>
            <span className="text-sm font-medium">
              <span className="text-status-preserved">{custodyStats.preserved}</span>
              <span className="text-text-muted"> de </span>
              <span className="text-text-primary">{custodyStats.total}</span>
              <span className="text-text-muted"> evidências preservadas</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="w-48 h-2 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-status-preserved transition-all duration-500"
                style={{ width: `${custodyStats.percentage}%` }}
              />
            </div>
            <span className="text-xs text-text-muted">{custodyStats.percentage}%</span>
          </div>

          {/* Counters */}
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-status-preserved" />
              <span className="text-status-preserved">{custodyStats.preserved}</span>
              <span className="text-text-muted">preservadas</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-status-notPreserved" />
              <span className="text-status-notPreserved">{custodyStats.notPreserved}</span>
              <span className="text-text-muted">não preservadas</span>
            </span>
          </div>
        </div>
      ) : (
        /* Entity Legend */
        <div className="flex items-center gap-4">
          {Object.entries(entityTypes).slice(0, 6).map(([key, type]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: type.color }}
              />
              <span className="text-xs text-text-muted">{type.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Right side - Volatility controls */}
      <div className="flex items-center gap-4">
        {state.volatilityActive && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-status-notPreserved/10 rounded-lg border border-status-notPreserved/20">
              <Timer className="w-4 h-4 text-status-notPreserved" />
              <span className="text-sm font-mono font-medium text-status-notPreserved">
                {state.volatilityTimestamp}
              </span>
            </div>
            <button
              onClick={() => {
                clearDegradation();
                deactivateVolatility();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-lg border border-white/10 hover:bg-bg-hover transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-secondary">Reverter</span>
            </button>
          </>
        )}

        {!state.volatilityActive && state.currentStep < 6 && (
          <div className="flex items-center gap-3">
            {Object.entries(entityTypes).slice(6).map(([key, type]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-xs text-text-muted">{type.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
