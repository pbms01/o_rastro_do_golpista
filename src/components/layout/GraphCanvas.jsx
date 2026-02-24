// src/components/layout/GraphCanvas.jsx
import React from 'react';
import CytoscapeGraph from '../graph/CytoscapeGraph';
import VolatilityOverlay from '../volatility/VolatilityOverlay';
import { useInvestigation } from '../../context/InvestigationContext';

export default function GraphCanvas() {
  const { state } = useInvestigation();

  return (
    <main className="flex-1 relative bg-bg-primary overflow-hidden">
      {/* Cytoscape Graph */}
      <CytoscapeGraph />

      {/* Volatility Overlay */}
      {state.volatilityActive && <VolatilityOverlay />}

      {/* Summary overlay for Step 5 */}
      {state.currentStep === 5 && (
        <div className="absolute top-2 lg:top-4 left-2 right-2 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 bg-bg-tertiary/90 backdrop-blur-sm px-3 lg:px-6 py-2 lg:py-3 rounded-lg border border-white/10 animate-fade-in">
          <p className="text-xs lg:text-sm font-medium text-text-primary text-center flex flex-wrap justify-center gap-x-1 gap-y-0.5">
            <span className="text-entity-domain">12 domínios</span>
            <span className="text-text-muted">•</span>
            <span className="text-entity-email">1 registrante</span>
            <span className="text-text-muted">•</span>
            <span className="text-entity-ip">3 servidores</span>
            <span className="text-text-muted">•</span>
            <span className="text-entity-location">3 países</span>
          </p>
        </div>
      )}
    </main>
  );
}
