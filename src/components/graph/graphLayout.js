// src/components/graph/graphLayout.js

// Main layout - COSE-Bilkent (force-directed with cluster support)
export const mainLayout = {
  name: 'cose-bilkent',
  animate: 'end',
  animationDuration: 1000,
  animationEasing: 'ease-out',
  fit: true,
  padding: 60,
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 120,
  nodeRepulsion: 8000,
  gravity: 0.25,
  gravityRange: 3.8,
  numIter: 2500,
  tile: true,
  tilingPaddingVertical: 20,
  tilingPaddingHorizontal: 20,
  randomize: false,
};

// Cluster layout for Step 5 - tighter clusters
export const clusterLayout = {
  ...mainLayout,
  idealEdgeLength: 80,
  nodeRepulsion: 6000,
  gravity: 0.4,
  animationDuration: 1200,
};

// Preset layout for initial steps
export const presetLayout = {
  name: 'preset',
  animate: true,
  animationDuration: 800,
  fit: true,
  padding: 80,
};

// Concentric layout (alternative)
export const concentricLayout = {
  name: 'concentric',
  animate: true,
  animationDuration: 1000,
  fit: true,
  padding: 50,
  concentric: (node) => {
    // Center nodes with more connections
    return node.degree();
  },
  levelWidth: () => 2,
  minNodeSpacing: 50,
};

// Get layout based on current step
export const getLayoutForStep = (step, nodeCount) => {
  // For Step 5, use cluster layout to emphasize grouping
  if (step === 5) {
    return clusterLayout;
  }

  // For early steps with few nodes, use preset if positions are defined
  if (step <= 1 && nodeCount <= 6) {
    return presetLayout;
  }

  // Default to main layout
  return mainLayout;
};

export default mainLayout;
