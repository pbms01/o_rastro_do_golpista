// src/utils/animations.js

// Configurações de animação
export const animationConfig = {
  nodeEnter: {
    duration: 600,
    easing: 'ease-out',
    stagger: 100,
  },
  edgeEnter: {
    duration: 300,
    delay: 600, // Aguarda nó entrar
  },
  layoutTransition: {
    duration: 1200,
    easing: 'ease-in-out',
  },
  degradation: {
    duration: 800,
  },
  panel: {
    duration: 300,
    easing: 'ease-out',
  },
};

// Anima entrada de nós no Cytoscape
export const animateNodeEntry = (cy, nodeId, delay = 0) => {
  const node = cy.getElementById(nodeId);
  if (!node.length) return;

  // Estado inicial
  node.style({
    'opacity': 0,
    'width': 10,
    'height': 10,
  });

  // Anima para estado final
  setTimeout(() => {
    node.animate({
      style: {
        'opacity': 1,
        'width': node.data('originalWidth') || 40,
        'height': node.data('originalHeight') || 40,
      },
      duration: animationConfig.nodeEnter.duration,
      easing: animationConfig.nodeEnter.easing,
    });
  }, delay);
};

// Anima entrada de arestas no Cytoscape
export const animateEdgeEntry = (cy, edgeId, delay = 0) => {
  const edge = cy.getElementById(edgeId);
  if (!edge.length) return;

  // Estado inicial
  edge.style({
    'opacity': 0,
  });

  // Anima para estado final
  setTimeout(() => {
    edge.animate({
      style: {
        'opacity': 1,
      },
      duration: animationConfig.edgeEnter.duration,
    });
  }, delay + animationConfig.edgeEnter.delay);
};

// Anima pulse/glow em nó
export const animateNodePulse = (cy, nodeId, duration = 1000) => {
  const node = cy.getElementById(nodeId);
  if (!node.length) return;

  const originalBorderWidth = node.style('border-width');

  node.animate({
    style: {
      'border-width': 6,
    },
    duration: duration / 2,
    easing: 'ease-in-out',
  }).animate({
    style: {
      'border-width': originalBorderWidth,
    },
    duration: duration / 2,
    easing: 'ease-in-out',
  });
};

// Anima destaque de nós
export const highlightNodes = (cy, nodeIds, duration = 2000) => {
  const nodes = cy.collection();
  nodeIds.forEach(id => {
    nodes.merge(cy.getElementById(id));
  });

  nodes.addClass('highlighted');

  setTimeout(() => {
    nodes.removeClass('highlighted');
  }, duration);
};

// Anima degradação de nó
export const animateNodeDegradation = (cy, nodeId, effect) => {
  const node = cy.getElementById(nodeId);
  if (!node.length) return;

  node.addClass('degraded');

  if (effect === 'takenDown') {
    node.addClass('taken-down');
  } else if (effect === 'redacted') {
    node.addClass('redacted');
  } else if (effect === 'disconnected') {
    node.addClass('disconnected');
  } else if (effect === 'reassigned') {
    node.addClass('reassigned');
  } else if (effect === 'revoked') {
    node.addClass('revoked');
  } else if (effect === 'changed') {
    node.addClass('changed');
  }
};

// Remove degradação de nó
export const removeNodeDegradation = (cy, nodeId) => {
  const node = cy.getElementById(nodeId);
  if (!node.length) return;

  node.removeClass('degraded taken-down redacted disconnected reassigned revoked changed');
};

// Anima degradação de aresta
export const animateEdgeDegradation = (cy, edgeId) => {
  const edge = cy.getElementById(edgeId);
  if (!edge.length) return;

  edge.addClass('degraded');
};

// Remove degradação de aresta
export const removeEdgeDegradation = (cy, edgeId) => {
  const edge = cy.getElementById(edgeId);
  if (!edge.length) return;

  edge.removeClass('degraded');
};
