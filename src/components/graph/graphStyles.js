// src/components/graph/graphStyles.js
import { entityTypes } from '../../utils/entityTypes';

// Generate node styles for each entity type
const generateEntityStyles = () => {
  const styles = [];

  Object.entries(entityTypes).forEach(([type, config]) => {
    styles.push({
      selector: `node[type="${type}"]`,
      style: {
        'background-color': config.color,
        'shape': config.shape,
        'width': config.size,
        'height': config.size,
        'border-width': config.borderWidth,
        'border-color': adjustColor(config.color, -20),
      },
    });
  });

  return styles;
};

// Helper to darken color
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export const cytoscapeStylesheet = [
  // Base node styles
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'font-size': '11px',
      'font-family': 'Inter, sans-serif',
      'color': '#e8eaed',
      'text-outline-width': 2,
      'text-outline-color': '#0f1117',
      'text-max-width': '120px',
      'text-wrap': 'ellipsis',
      'min-zoomed-font-size': 8,
      'transition-property': 'background-color, border-color, width, height, opacity',
      'transition-duration': '0.3s',
      'background-opacity': 1,
    },
  },

  // Entity type styles
  ...generateEntityStyles(),

  // Selected node
  {
    selector: 'node:selected',
    style: {
      'border-width': 4,
      'border-color': '#60a5fa',
      'overlay-opacity': 0.15,
      'overlay-color': '#60a5fa',
    },
  },

  // Highlighted node
  {
    selector: 'node.highlighted',
    style: {
      'border-width': 4,
      'border-color': '#60a5fa',
    },
  },

  // Preserved node (custody status)
  {
    selector: 'node.preserved',
    style: {
      'border-width': 3,
      'border-color': '#10b981',
    },
  },

  // Not preserved node (custody status)
  {
    selector: 'node.not-preserved',
    style: {
      'border-width': 3,
      'border-color': '#ef4444',
    },
  },

  // Vulnerable node
  {
    selector: 'node.vulnerable',
    style: {
      'border-width': 3,
      'border-color': '#ef4444',
    },
  },

  // Degraded node (volatility)
  {
    selector: 'node.degraded',
    style: {
      'opacity': 0.25,
      'border-style': 'dashed',
      'border-color': '#4b5563',
      'background-color': '#374151',
    },
  },

  // Taken down node
  {
    selector: 'node.taken-down',
    style: {
      'opacity': 0.2,
      'border-style': 'dashed',
      'background-color': '#1f2937',
    },
  },

  // Redacted node
  {
    selector: 'node.redacted',
    style: {
      'opacity': 0.3,
      'background-color': '#374151',
    },
  },

  // Disconnected node
  {
    selector: 'node.disconnected',
    style: {
      'opacity': 0.35,
      'border-style': 'dotted',
    },
  },

  // Reassigned node
  {
    selector: 'node.reassigned',
    style: {
      'opacity': 0.3,
      'background-color': '#4b5563',
    },
  },

  // Revoked node
  {
    selector: 'node.revoked',
    style: {
      'opacity': 0.25,
      'border-color': '#ef4444',
      'border-style': 'dashed',
    },
  },

  // Entering node (animation)
  {
    selector: 'node.entering',
    style: {
      'opacity': 0,
    },
  },

  // Base edge styles
  {
    selector: 'edge',
    style: {
      'width': 1.5,
      'line-color': '#4b5563',
      'target-arrow-color': '#4b5563',
      'target-arrow-shape': 'triangle',
      'arrow-scale': 0.8,
      'curve-style': 'bezier',
      'font-size': '9px',
      'color': '#6b7280',
      'text-rotation': 'autorotate',
      'text-outline-width': 1.5,
      'text-outline-color': '#0f1117',
      'text-margin-y': -8,
      'min-zoomed-font-size': 8,
      'transition-property': 'line-color, opacity, width',
      'transition-duration': '0.3s',
    },
  },

  // Edge with label visible
  {
    selector: 'edge.show-label',
    style: {
      'label': 'data(label)',
    },
  },

  // Transform edge (highlighted)
  {
    selector: 'edge[?isTransform]',
    style: {
      'line-color': '#60a5fa',
      'target-arrow-color': '#60a5fa',
      'width': 2,
      'line-style': 'dashed',
    },
  },

  // Highlighted edge
  {
    selector: 'edge.highlighted',
    style: {
      'line-color': '#60a5fa',
      'target-arrow-color': '#60a5fa',
      'width': 2.5,
    },
  },

  // Degraded edge
  {
    selector: 'edge.degraded',
    style: {
      'opacity': 0.15,
      'line-style': 'dashed',
      'line-color': '#374151',
      'target-arrow-color': '#374151',
    },
  },

  // New edge (animation)
  {
    selector: 'edge.new',
    style: {
      'line-color': '#10b981',
      'target-arrow-color': '#10b981',
    },
  },
];

export default cytoscapeStylesheet;
