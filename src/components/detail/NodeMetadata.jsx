// src/components/detail/NodeMetadata.jsx
import React from 'react';
import { formatDate, formatMetadataKey, shouldUseMono, isArray } from '../../utils/formatters';

export default function NodeMetadata({ node }) {
  if (!node?.metadata) {
    return (
      <div className="p-4 text-text-muted text-sm">
        Sem metadados disponíveis.
      </div>
    );
  }

  const entries = Object.entries(node.metadata);

  return (
    <div className="p-4 space-y-3">
      {entries.map(([key, value]) => {
        const label = formatMetadataKey(key);
        const useMono = shouldUseMono(key, value);

        // Handle null/undefined
        if (value === null || value === undefined) {
          return null;
        }

        // Handle arrays
        if (isArray(value)) {
          return (
            <div key={key} className="space-y-1">
              <p className="text-xs text-text-muted">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {value.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex px-2 py-1 bg-bg-tertiary rounded text-xs font-mono text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        }

        // Format dates
        let displayValue = value;
        if (key.toLowerCase().includes('data') || key.toLowerCase().includes('date')) {
          displayValue = formatDate(value);
        }

        // Handle empty values
        if (value === '' || value === '(vazio)') {
          displayValue = <span className="text-text-muted italic">(vazio)</span>;
        }

        // Highlight certain fields
        const isHighlighted = ['relevancia', 'observacao', 'confiabilidade', 'reputacao'].includes(key);

        return (
          <div
            key={key}
            className={`space-y-1 ${
              isHighlighted ? 'bg-bg-tertiary -mx-4 px-4 py-3' : ''
            }`}
          >
            <p className="text-xs text-text-muted">{label}</p>
            <p
              className={`text-sm ${
                useMono ? 'font-mono' : ''
              } ${
                isHighlighted ? 'text-status-volatile' : 'text-text-primary'
              } break-all`}
            >
              {displayValue}
            </p>
          </div>
        );
      })}
    </div>
  );
}
