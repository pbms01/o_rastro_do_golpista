// src/components/graph/CytoscapeGraph.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { useInvestigation } from '../../context/InvestigationContext';
import { cytoscapeStylesheet } from './graphStyles';
import { getLayoutForStep } from './graphLayout';

// Register extension
cytoscape.use(coseBilkent);

export default function CytoscapeGraph() {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const prevStepRef = useRef(0);

  const {
    state,
    visibleNodesData,
    visibleEdgesData,
    selectNode,
    deselectNode,
  } = useInvestigation();

  // Initialize Cytoscape
  useEffect(() => {
    if (!containerRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,
      style: cytoscapeStylesheet,
      layout: { name: 'preset' },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.3,
      boxSelectionEnabled: false,
      autounselectify: false,
    });

    // Event handlers
    cyRef.current.on('tap', 'node', (evt) => {
      const nodeId = evt.target.id();
      selectNode(nodeId);
    });

    cyRef.current.on('tap', (evt) => {
      if (evt.target === cyRef.current) {
        deselectNode();
      }
    });

    // Hover effects
    cyRef.current.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      node.connectedEdges().addClass('highlighted');
    });

    cyRef.current.on('mouseout', 'node', (evt) => {
      const node = evt.target;
      node.connectedEdges().removeClass('highlighted');
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [selectNode, deselectNode]);

  // Update graph when visible elements change
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const currentNodeIds = new Set(visibleNodesData.map(n => n.id));
    const currentEdgeIds = new Set(visibleEdgesData.map(e => e.id));

    // Get existing element IDs
    const existingNodeIds = new Set(cy.nodes().map(n => n.id()));
    const existingEdgeIds = new Set(cy.edges().map(e => e.id()));

    // Find new nodes and edges to add
    const nodesToAdd = visibleNodesData.filter(n => !existingNodeIds.has(n.id));
    const edgesToAdd = visibleEdgesData.filter(e => !existingEdgeIds.has(e.id));

    // Find nodes and edges to remove
    const nodeIdsToRemove = [...existingNodeIds].filter(id => !currentNodeIds.has(id));
    const edgeIdsToRemove = [...existingEdgeIds].filter(id => !currentEdgeIds.has(id));

    // Remove old elements
    nodeIdsToRemove.forEach(id => {
      cy.getElementById(id).remove();
    });
    edgeIdsToRemove.forEach(id => {
      cy.getElementById(id).remove();
    });

    // Add new nodes with animation
    if (nodesToAdd.length > 0) {
      nodesToAdd.forEach((node, index) => {
        const cyNode = cy.add({
          group: 'nodes',
          data: {
            id: node.id,
            label: node.label,
            type: node.type,
            custodyStatus: node.custodyStatus,
            hasVulnerabilities: node.vulnerabilities && node.vulnerabilities.length > 0,
          },
          position: node.position || { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
        });

        // Animation: fade in with stagger
        cyNode.style({ opacity: 0 });
        setTimeout(() => {
          cyNode.animate({
            style: { opacity: 1 },
            duration: 500,
            easing: 'ease-out',
          });
        }, index * 80);
      });
    }

    // Add new edges
    if (edgesToAdd.length > 0) {
      setTimeout(() => {
        edgesToAdd.forEach((edge, index) => {
          // Only add edge if both source and target exist
          if (cy.getElementById(edge.source).length && cy.getElementById(edge.target).length) {
            const cyEdge = cy.add({
              group: 'edges',
              data: {
                id: edge.id,
                source: edge.source,
                target: edge.target,
                label: edge.label,
                isTransform: edge.isTransform || false,
              },
            });

            // Add label class if showing labels
            if (state.showEdgeLabels) {
              cyEdge.addClass('show-label');
            }

            // Animation
            cyEdge.style({ opacity: 0 });
            setTimeout(() => {
              cyEdge.animate({
                style: { opacity: 1 },
                duration: 300,
              });
            }, index * 30);
          }
        });
      }, nodesToAdd.length * 80 + 200);
    }

    // Run layout if elements were added
    if (nodesToAdd.length > 0 || nodeIdsToRemove.length > 0) {
      const layoutDelay = nodesToAdd.length * 80 + edgesToAdd.length * 30 + 400;
      setTimeout(() => {
        const layout = getLayoutForStep(state.currentStep, cy.nodes().length);
        cy.layout(layout).run();
      }, layoutDelay);
    }

    prevStepRef.current = state.currentStep;
  }, [visibleNodesData, visibleEdgesData, state.currentStep, state.showEdgeLabels]);

  // Update edge labels visibility
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    if (state.showEdgeLabels) {
      cy.edges().addClass('show-label');
    } else {
      cy.edges().removeClass('show-label');
    }
  }, [state.showEdgeLabels]);

  // Update custody/vulnerability classes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().forEach((node) => {
      const custodyStatus = node.data('custodyStatus');
      const hasVulns = node.data('hasVulnerabilities');

      // Remove existing classes
      node.removeClass('preserved not-preserved vulnerable');

      if (state.showCustodyStatus || state.currentStep >= 6) {
        if (custodyStatus === 'preserved') {
          node.addClass('preserved');
        } else {
          node.addClass('not-preserved');
        }
      }

      if ((state.showVulnerabilities || state.currentStep >= 6) && hasVulns) {
        node.addClass('vulnerable');
      }
    });
  }, [state.showCustodyStatus, state.showVulnerabilities, state.currentStep, visibleNodesData]);

  // Handle degradation (volatility)
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Reset all degradation classes first
    cy.nodes().removeClass('degraded taken-down redacted disconnected reassigned revoked changed');
    cy.edges().removeClass('degraded');

    if (state.volatilityActive && state.degradedNodes.length > 0) {
      state.degradedNodes.forEach((nodeId) => {
        const node = cy.getElementById(nodeId);
        if (node.length) {
          node.addClass('degraded');

          // Degrade connected edges
          node.connectedEdges().addClass('degraded');
        }
      });
    }
  }, [state.volatilityActive, state.degradedNodes]);

  // Handle node selection
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().unselect();
    if (state.selectedNodeId) {
      cy.getElementById(state.selectedNodeId).select();
    }
  }, [state.selectedNodeId]);

  // Fit graph on step change
  const fitGraph = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.fit(undefined, 60);
  }, []);

  // Keyboard shortcut for fit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey) {
          fitGraph();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fitGraph]);

  return (
    <div
      ref={containerRef}
      className="cytoscape-container w-full h-full"
    />
  );
}
