// src/components/volatility/VolatilityOverlay.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { volatilityConfig } from '../../data/volatility';
import DegradationTimer from './DegradationTimer';
import { AlertTriangle } from 'lucide-react';

export default function VolatilityOverlay() {
  const {
    state,
    setVolatilityTimestamp,
    addDegradedNodes,
    deactivateVolatility,
    clearDegradation,
  } = useInvestigation();

  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [description, setDescription] = useState('');

  const runDegradationSequence = useCallback(() => {
    const sequence = volatilityConfig.degradationSequence;

    sequence.forEach((step, index) => {
      setTimeout(() => {
        setCurrentSequenceIndex(index);
        setVolatilityTimestamp(step.timestamp);
        setDescription(step.description);

        // Apply degradations
        step.degradations.forEach((degradation) => {
          if (degradation.type === 'node') {
            addDegradedNodes(degradation.ids);
          }
        });

        // Show final message after last step
        if (index === sequence.length - 1) {
          setTimeout(() => {
            setShowFinalMessage(true);
          }, 1500);
        }
      }, step.delay);
    });
  }, [setVolatilityTimestamp, addDegradedNodes]);

  useEffect(() => {
    if (state.volatilityActive) {
      runDegradationSequence();
    }
  }, [state.volatilityActive, runDegradationSequence]);

  // Reset when deactivated
  useEffect(() => {
    if (!state.volatilityActive) {
      setCurrentSequenceIndex(0);
      setShowFinalMessage(false);
      setDescription('');
    }
  }, [state.volatilityActive]);

  return (
    <>
      {/* Timer and description banner */}
      <div className="absolute top-2 lg:top-4 left-2 lg:left-4 right-2 lg:right-4 flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:justify-between">
        <DegradationTimer timestamp={state.volatilityTimestamp} />

        {description && (
          <div className="bg-bg-tertiary/90 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-white/10 animate-fade-in">
            <p className="text-xs lg:text-sm text-text-secondary">
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Final message overlay */}
      {showFinalMessage && (
        <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4">
          <div className="max-w-2xl mx-auto p-4 lg:p-8 text-center">
            <AlertTriangle className="w-10 h-10 lg:w-16 lg:h-16 text-status-volatile mx-auto mb-4 lg:mb-6" />

            <h2 className="text-xl lg:text-3xl font-bold text-text-primary mb-3 lg:mb-4">
              {volatilityConfig.finalMessage.titulo}
            </h2>

            <p className="text-lg lg:text-2xl font-semibold text-status-volatile mb-4 lg:mb-6">
              {volatilityConfig.finalMessage.pergunta}
            </p>

            <p className="text-sm lg:text-lg text-text-secondary leading-relaxed mb-6 lg:mb-8">
              {volatilityConfig.finalMessage.subtexto}
            </p>

            <button
              onClick={() => {
                setShowFinalMessage(false);
                clearDegradation();
                deactivateVolatility();
              }}
              className="px-4 lg:px-6 py-2.5 lg:py-3 bg-text-accent text-white rounded-lg font-medium hover:bg-text-accent/90 transition-colors text-sm lg:text-base"
            >
              Reverter para Grafo Completo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
