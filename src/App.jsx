// src/App.jsx
import React, { useEffect, useCallback, useState } from 'react';
import { useInvestigation } from './context/InvestigationContext';
import Sidebar from './components/layout/Sidebar';
import GraphCanvas from './components/layout/GraphCanvas';
import DetailPanel from './components/layout/DetailPanel';
import BottomBar from './components/layout/BottomBar';
import MobileNav from './components/layout/MobileNav';
import { HelpCircle, Search, Menu, X } from 'lucide-react';

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fecha sidebar mobile ao mudar de etapa
  useEffect(() => {
    setSidebarOpen(false);
  }, [state.currentStep]);

  // Atalhos de teclado
  const handleKeyDown = useCallback((e) => {
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
        if (sidebarOpen) {
          setSidebarOpen(false);
        } else {
          deselectNode();
        }
        break;
      default:
        break;
    }
  }, [advanceStep, previousStep, resetInvestigation, toggleVulnerabilities, activateVolatility, deactivateVolatility, deselectNode, state.volatilityActive, state.currentStep, sidebarOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-screen w-screen flex flex-col bg-bg-primary text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-12 lg:h-14 flex-shrink-0 flex items-center justify-between px-3 lg:px-6 border-b border-white/10 bg-bg-secondary">
        <div className="flex items-center gap-2 lg:gap-3 min-w-0">
          {/* Hamburger menu - mobile only */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-bg-hover transition-colors flex-shrink-0"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-text-secondary" />
            ) : (
              <Menu className="w-5 h-5 text-text-secondary" />
            )}
          </button>

          <Search className="w-4 h-4 lg:w-5 lg:h-5 text-entity-domain flex-shrink-0" />
          <h1 className="text-sm lg:text-lg font-semibold truncate">
            O Rastro do Golpista
            <span className="text-text-muted font-normal ml-2 text-sm hidden xl:inline">
              — Simulação de Investigação OSINT
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-6 flex-shrink-0">
          <div className="text-xs lg:text-sm">
            <span className="text-text-muted hidden sm:inline">Etapa </span>
            <span className="text-text-accent font-semibold">{state.currentStep}</span>
            <span className="text-text-muted">/{steps.length - 1}</span>
            {currentStepData && (
              <span className="text-text-secondary ml-1 lg:ml-2 hidden md:inline">
                — {currentStepData.subtitulo}
              </span>
            )}
          </div>

          <button
            className="p-1.5 lg:p-2 rounded-lg hover:bg-bg-hover transition-colors"
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
🟡 Domínio  🔵 E-mail  🟢 IP
🟣 WHOIS  🔵 DNS  🔴 Servidor/ISP
🟠 Certificado  🩷 Localização
💜 Pessoa  ⚪ Documento`);
            }}
          >
            <HelpCircle className="w-4 h-4 lg:w-5 lg:h-5 text-text-muted" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - desktop: normal flow */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Mobile sidebar drawer + backdrop */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`lg:hidden fixed top-12 bottom-0 left-0 z-50 w-80 max-w-[85vw] transform transition-transform duration-300 ease-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Graph Canvas */}
        <GraphCanvas />

        {/* Detail Panel - desktop: normal flow */}
        <div className="hidden lg:flex">
          <DetailPanel />
        </div>
        {/* Detail Panel - mobile: fullscreen overlay */}
        <div className="lg:hidden">
          <DetailPanel mobile />
        </div>
      </div>

      {/* Bottom Bar - desktop only */}
      <div className="hidden lg:block">
        <BottomBar />
      </div>

      {/* Mobile Navigation - mobile only */}
      <div className="lg:hidden">
        <MobileNav onOpenSidebar={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
}

export default App;
