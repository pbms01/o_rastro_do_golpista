// src/components/layout/DetailPanel.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import NodeMetadata from '../detail/NodeMetadata';
import CustodyStatus from '../detail/CustodyStatus';
import VulnerabilityCard from '../detail/VulnerabilityCard';
import EntityIcon from '../shared/EntityIcon';
import Badge from '../shared/Badge';
import { entityTypes } from '../../utils/entityTypes';

export default function DetailPanel({ mobile = false }) {
  const { state, selectedNode, deselectNode } = useInvestigation();
  const [activeTab, setActiveTab] = useState('properties');

  if (!state.detailPanelOpen || !selectedNode) {
    return null;
  }

  const entityType = entityTypes[selectedNode.type];
  const hasVulnerabilities = selectedNode.vulnerabilities && selectedNode.vulnerabilities.length > 0;
  const showCustodyTab = state.currentStep >= 6 || state.showCustodyStatus;
  const showVulnTab = (state.currentStep >= 6 || state.showVulnerabilities) && hasVulnerabilities;

  const tabs = [
    { id: 'properties', label: 'Propriedades' },
    ...(showCustodyTab ? [{ id: 'custody', label: 'Custódia' }] : []),
    ...(showVulnTab ? [{ id: 'vulnerabilities', label: `Vulns (${selectedNode.vulnerabilities.length})` }] : []),
  ];

  const tabsContent = (
    <>
      {/* Tabs */}
      <div className="flex border-b border-white/10 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 lg:px-4 py-2 lg:py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-text-accent border-b-2 border-text-accent'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'properties' && (
          <NodeMetadata node={selectedNode} />
        )}
        {activeTab === 'custody' && showCustodyTab && (
          <CustodyStatus node={selectedNode} />
        )}
        {activeTab === 'vulnerabilities' && showVulnTab && (
          <div className="p-4 space-y-3">
            {selectedNode.vulnerabilities.map((vuln) => (
              <VulnerabilityCard key={vuln.id} vulnerability={vuln} />
            ))}
          </div>
        )}
      </div>
    </>
  );

  const headerContent = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${entityType?.color}20` }}
          >
            <EntityIcon type={selectedNode.type} size={mobile ? 18 : 20} />
          </div>
          <div className="min-w-0">
            <Badge variant={selectedNode.type}>
              {entityType?.label || selectedNode.type}
            </Badge>
            <h3 className="text-sm font-medium text-text-primary mt-1 break-all line-clamp-2">
              {selectedNode.label}
            </h3>
          </div>
        </div>
        <button
          onClick={deselectNode}
          className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>

      {/* Custody indicator */}
      {showCustodyTab && (
        <div className="mt-2 lg:mt-3 flex items-center gap-2">
          {selectedNode.custodyStatus === 'preserved' ? (
            <Badge variant="preserved">PRESERVADA</Badge>
          ) : selectedNode.custodyStatus === 'partial' ? (
            <Badge variant="partial">PARCIAL</Badge>
          ) : (
            <Badge variant="notPreserved">NÃO PRESERVADA</Badge>
          )}
        </div>
      )}
    </>
  );

  // Mobile: bottom sheet overlay
  if (mobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={deselectNode}
        />
        {/* Panel - slides up from bottom */}
        <aside
          className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary border-t border-white/10 flex flex-col animate-slide-up overflow-hidden rounded-t-2xl"
          style={{ maxHeight: '75vh' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-2 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="px-4 pb-3 border-b border-white/10 flex-shrink-0">
            {headerContent}
          </div>

          {tabsContent}
        </aside>
      </>
    );
  }

  // Desktop: side panel
  return (
    <aside className="w-96 flex-shrink-0 bg-bg-secondary border-l border-white/10 flex flex-col animate-slide-in-right overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        {headerContent}
      </div>

      {tabsContent}
    </aside>
  );
}
