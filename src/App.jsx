// src/App.jsx
import React, { useEffect, useCallback } from 'react';
import { useInvestigation } from './context/InvestigationContext';
import Sidebar from './components/layout/Sidebar';
import GraphCanvas from './components/layout/GraphCanvas';
import DetailPanel from './components/layout/DetailPanel';
import BottomBar from './components/layout/BottomBar';
import { HelpCircle, Search } from 'lucide-react';

function App() {
  const {
    state,
    currentStepData,
    advanceStep,
    previousStep,
    resetInvestigation,
    toggleVulnerabilities,
    activateVolatility,
    deactivateVolatility,
    deselectNode,
    steps,
  } = useInvestigation();

  // Atalhos de teclado
  const handleKeyDown = useCallback((e) => {
    // Ignora se estiver em um input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        advanceStep();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        previousStep();
        break;
      case 'r':
      case 'R':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          if (window.confirm('Reiniciar a investigação?')) {
            resetInvestigation();
          }
        }
        break;
      case 'v':
      case 'V':
        e.preventDefault();
        toggleVulnerabilities();
        break;
      case 'd':
      case 'D':
        e.preventDefault();
        if (state.volatilityActive) {
          deactivateVolatility();
        } else if (state.currentStep >= 7) {
          activateVolatility();
        }
        break;
      case 'Escape':
        e.preventDefault();
        deselectNode();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        e.preventDefault();
        const stepNum = parseInt(e.key);
        if (stepNum <= state.maxStepReached + 1) {
          // goToStep é chamado via actions
        }
        break;
      default:
        break;
    }
  }, [advanceStep, previousStep, resetInvestigation, toggleVulnerabilities, activateVolatility, deactivateVolatility, deselectNode, state.volatilityActive, state.currentStep, state.maxStepReached]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col bg-bg-primary text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-bg-secondary">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-entity-domain" />
          <h1 className="text-lg font-semibold">
            O Rastro do Golpista
            <span className="text-text-muted font-normal ml-2 text-sm hidden lg:inline">
              — Simulação de Investigação OSINT
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm">
            <span className="text-text-muted">Etapa </span>
            <span className="text-text-accent font-semibold">{state.currentStep}</span>
            <span className="text-text-muted"> de {steps.length - 1}</span>
            {currentStepData && (
              <span className="text-text-secondary ml-2">
                — {currentStepData.subtitulo}
              </span>
            )}
          </div>

          <button
            className="p-2 rounded-lg hover:bg-bg-hover transition-colors"
            title="Ajuda e atalhos de teclado"
            onClick={() => {
              alert(`Atalhos de Teclado:

→ ou Espaço: Próxima etapa
←: Etapa anterior
R: Reiniciar investigação
V: Toggle vulnerabilidades
D: Toggle degradação (Etapa 7)
Esc: Fechar painel de detalhes
F: Centralizar grafo

Legenda de Cores:
🟡 Domínio
🔵 E-mail
🟢 IP
🟣 WHOIS
🔵 DNS
🔴 Servidor/ISP
🟠 Certificado
🩷 Localização
💜 Pessoa
⚪ Documento`);
            }}
          >
            <HelpCircle className="w-5 h-5 text-text-muted" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Graph Canvas */}
        <GraphCanvas />

        {/* Detail Panel */}
        <DetailPanel />
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}

export default App;
