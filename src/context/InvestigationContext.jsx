// src/context/InvestigationContext.jsx
import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { nodes as allNodes } from '../data/nodes';
import { edges as allEdges } from '../data/edges';
import { steps } from '../data/steps';

// Estado inicial
const initialState = {
  // Controle de navegação
  currentStep: 0,
  maxStepReached: 0,

  // Grafo
  visibleNodes: [],
  visibleEdges: [],
  selectedNodeId: null,
  highlightedNodes: [],

  // Animação
  isAnimating: false,
  animationQueue: [],

  // Camada pedagógica
  showVulnerabilities: false,
  showCustodyStatus: false,

  // Simulação de volatilidade
  volatilityActive: false,
  volatilityTimestamp: '0h',
  degradedNodes: [],
  degradedEdges: [],

  // Painel lateral
  detailPanelOpen: false,

  // Controles visuais
  showEdgeLabels: true,
};

// Ações
const actionTypes = {
  // Navegação
  GO_TO_STEP: 'GO_TO_STEP',
  RESET_INVESTIGATION: 'RESET_INVESTIGATION',

  // Grafo
  SET_VISIBLE_ELEMENTS: 'SET_VISIBLE_ELEMENTS',
  SELECT_NODE: 'SELECT_NODE',
  DESELECT_NODE: 'DESELECT_NODE',
  HIGHLIGHT_NODES: 'HIGHLIGHT_NODES',
  CLEAR_HIGHLIGHTS: 'CLEAR_HIGHLIGHTS',

  // Animação
  START_ANIMATION: 'START_ANIMATION',
  END_ANIMATION: 'END_ANIMATION',

  // Camada pedagógica
  TOGGLE_VULNERABILITIES: 'TOGGLE_VULNERABILITIES',
  TOGGLE_CUSTODY_STATUS: 'TOGGLE_CUSTODY_STATUS',

  // Volatilidade
  ACTIVATE_VOLATILITY: 'ACTIVATE_VOLATILITY',
  DEACTIVATE_VOLATILITY: 'DEACTIVATE_VOLATILITY',
  SET_VOLATILITY_TIMESTAMP: 'SET_VOLATILITY_TIMESTAMP',
  ADD_DEGRADED_NODES: 'ADD_DEGRADED_NODES',
  ADD_DEGRADED_EDGES: 'ADD_DEGRADED_EDGES',
  CLEAR_DEGRADATION: 'CLEAR_DEGRADATION',

  // Controles visuais
  TOGGLE_EDGE_LABELS: 'TOGGLE_EDGE_LABELS',
};

// Reducer
function investigationReducer(state, action) {
  switch (action.type) {
    case actionTypes.GO_TO_STEP: {
      const newStep = action.payload;
      const maxStep = Math.max(state.maxStepReached, newStep);

      // Calcula os nós e arestas visíveis até esta etapa
      const visibleNodes = [];
      const visibleEdges = [];

      for (let i = 0; i <= newStep && i < steps.length; i++) {
        const stepData = steps[i];
        visibleNodes.push(...stepData.nodeIds);
        visibleEdges.push(...stepData.edgeIds);
      }

      return {
        ...state,
        currentStep: newStep,
        maxStepReached: maxStep,
        visibleNodes: [...new Set(visibleNodes)],
        visibleEdges: [...new Set(visibleEdges)],
        // Reset volatilidade se voltar de etapa 7
        volatilityActive: newStep === 7 ? state.volatilityActive : false,
        showVulnerabilities: newStep >= 6 ? true : state.showVulnerabilities,
        showCustodyStatus: newStep >= 6 ? true : state.showCustodyStatus,
      };
    }

    case actionTypes.RESET_INVESTIGATION:
      return {
        ...initialState,
        visibleNodes: steps[0].nodeIds,
        visibleEdges: steps[0].edgeIds,
      };

    case actionTypes.SET_VISIBLE_ELEMENTS:
      return {
        ...state,
        visibleNodes: action.payload.nodes,
        visibleEdges: action.payload.edges,
      };

    case actionTypes.SELECT_NODE:
      return {
        ...state,
        selectedNodeId: action.payload,
        detailPanelOpen: true,
      };

    case actionTypes.DESELECT_NODE:
      return {
        ...state,
        selectedNodeId: null,
        detailPanelOpen: false,
      };

    case actionTypes.HIGHLIGHT_NODES:
      return {
        ...state,
        highlightedNodes: action.payload,
      };

    case actionTypes.CLEAR_HIGHLIGHTS:
      return {
        ...state,
        highlightedNodes: [],
      };

    case actionTypes.START_ANIMATION:
      return {
        ...state,
        isAnimating: true,
        animationQueue: action.payload || [],
      };

    case actionTypes.END_ANIMATION:
      return {
        ...state,
        isAnimating: false,
        animationQueue: [],
      };

    case actionTypes.TOGGLE_VULNERABILITIES:
      return {
        ...state,
        showVulnerabilities: !state.showVulnerabilities,
      };

    case actionTypes.TOGGLE_CUSTODY_STATUS:
      return {
        ...state,
        showCustodyStatus: !state.showCustodyStatus,
      };

    case actionTypes.ACTIVATE_VOLATILITY:
      return {
        ...state,
        volatilityActive: true,
        volatilityTimestamp: '0h',
      };

    case actionTypes.DEACTIVATE_VOLATILITY:
      return {
        ...state,
        volatilityActive: false,
        volatilityTimestamp: '0h',
        degradedNodes: [],
        degradedEdges: [],
      };

    case actionTypes.SET_VOLATILITY_TIMESTAMP:
      return {
        ...state,
        volatilityTimestamp: action.payload,
      };

    case actionTypes.ADD_DEGRADED_NODES:
      return {
        ...state,
        degradedNodes: [...new Set([...state.degradedNodes, ...action.payload])],
      };

    case actionTypes.ADD_DEGRADED_EDGES:
      return {
        ...state,
        degradedEdges: [...new Set([...state.degradedEdges, ...action.payload])],
      };

    case actionTypes.CLEAR_DEGRADATION:
      return {
        ...state,
        degradedNodes: [],
        degradedEdges: [],
        volatilityTimestamp: '0h',
      };

    case actionTypes.TOGGLE_EDGE_LABELS:
      return {
        ...state,
        showEdgeLabels: !state.showEdgeLabels,
      };

    default:
      return state;
  }
}

// Contexto
const InvestigationContext = createContext(null);

// Provider
export function InvestigationProvider({ children }) {
  const [state, dispatch] = useReducer(investigationReducer, {
    ...initialState,
    visibleNodes: steps[0].nodeIds,
    visibleEdges: steps[0].edgeIds,
  });

  // Dados derivados
  const derivedData = useMemo(() => {
    // Nós visíveis com dados completos
    const visibleNodesData = allNodes.filter(node =>
      state.visibleNodes.includes(node.id)
    );

    // Arestas visíveis com dados completos
    const visibleEdgesData = allEdges.filter(edge =>
      state.visibleEdges.includes(edge.id)
    );

    // Nó selecionado com dados completos
    const selectedNode = state.selectedNodeId
      ? allNodes.find(node => node.id === state.selectedNodeId)
      : null;

    // Etapa atual
    const currentStepData = steps[state.currentStep];

    // Contadores de custódia
    const totalNodes = visibleNodesData.length;
    const preservedNodes = visibleNodesData.filter(n => n.custodyStatus === 'preserved').length;
    const notPreservedNodes = visibleNodesData.filter(n => n.custodyStatus === 'notPreserved').length;
    const partialNodes = visibleNodesData.filter(n => n.custodyStatus === 'partial').length;

    return {
      visibleNodesData,
      visibleEdgesData,
      selectedNode,
      currentStepData,
      custodyStats: {
        total: totalNodes,
        preserved: preservedNodes,
        notPreserved: notPreservedNodes,
        partial: partialNodes,
        percentage: totalNodes > 0 ? Math.round((preservedNodes / totalNodes) * 100) : 0,
      },
    };
  }, [state.visibleNodes, state.visibleEdges, state.selectedNodeId, state.currentStep]);

  // Actions
  const actions = useMemo(() => ({
    goToStep: (step) => {
      if (step >= 0 && step < steps.length) {
        dispatch({ type: actionTypes.GO_TO_STEP, payload: step });
      }
    },

    advanceStep: () => {
      if (state.currentStep < steps.length - 1) {
        dispatch({ type: actionTypes.GO_TO_STEP, payload: state.currentStep + 1 });
      }
    },

    previousStep: () => {
      if (state.currentStep > 0) {
        dispatch({ type: actionTypes.GO_TO_STEP, payload: state.currentStep - 1 });
      }
    },

    resetInvestigation: () => {
      dispatch({ type: actionTypes.RESET_INVESTIGATION });
    },

    selectNode: (nodeId) => {
      dispatch({ type: actionTypes.SELECT_NODE, payload: nodeId });
    },

    deselectNode: () => {
      dispatch({ type: actionTypes.DESELECT_NODE });
    },

    highlightNodes: (nodeIds) => {
      dispatch({ type: actionTypes.HIGHLIGHT_NODES, payload: nodeIds });
    },

    clearHighlights: () => {
      dispatch({ type: actionTypes.CLEAR_HIGHLIGHTS });
    },

    startAnimation: (queue) => {
      dispatch({ type: actionTypes.START_ANIMATION, payload: queue });
    },

    endAnimation: () => {
      dispatch({ type: actionTypes.END_ANIMATION });
    },

    toggleVulnerabilities: () => {
      dispatch({ type: actionTypes.TOGGLE_VULNERABILITIES });
    },

    toggleCustodyStatus: () => {
      dispatch({ type: actionTypes.TOGGLE_CUSTODY_STATUS });
    },

    activateVolatility: () => {
      dispatch({ type: actionTypes.ACTIVATE_VOLATILITY });
    },

    deactivateVolatility: () => {
      dispatch({ type: actionTypes.DEACTIVATE_VOLATILITY });
    },

    setVolatilityTimestamp: (timestamp) => {
      dispatch({ type: actionTypes.SET_VOLATILITY_TIMESTAMP, payload: timestamp });
    },

    addDegradedNodes: (nodeIds) => {
      dispatch({ type: actionTypes.ADD_DEGRADED_NODES, payload: nodeIds });
    },

    addDegradedEdges: (edgeIds) => {
      dispatch({ type: actionTypes.ADD_DEGRADED_EDGES, payload: edgeIds });
    },

    clearDegradation: () => {
      dispatch({ type: actionTypes.CLEAR_DEGRADATION });
    },

    toggleEdgeLabels: () => {
      dispatch({ type: actionTypes.TOGGLE_EDGE_LABELS });
    },
  }), [state.currentStep]);

  const value = useMemo(() => ({
    state,
    ...derivedData,
    ...actions,
    steps,
    allNodes,
    allEdges,
  }), [state, derivedData, actions]);

  return (
    <InvestigationContext.Provider value={value}>
      {children}
    </InvestigationContext.Provider>
  );
}

// Hook customizado
export function useInvestigation() {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
}

export default InvestigationContext;
