// src/components/shared/Badge.jsx
import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary border-white/10',
    domain: 'badge-domain',
    email: 'badge-email',
    ip: 'badge-ip',
    whois: 'badge-whois',
    dns: 'badge-dns',
    server: 'badge-server',
    certificate: 'badge-certificate',
    location: 'badge-location',
    person: 'badge-person',
    document: 'badge-document',
    preserved: 'badge-preserved',
    notPreserved: 'badge-not-preserved',
    partial: 'badge-partial',
    critica: 'badge-severity-critica',
    alta: 'badge-severity-alta',
    media: 'badge-severity-media',
    baixa: 'badge-severity-baixa',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
