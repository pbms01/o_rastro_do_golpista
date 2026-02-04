// src/components/detail/CustodyStatus.jsx
import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldQuestion, AlertCircle } from 'lucide-react';
import Badge from '../shared/Badge';

export default function CustodyStatus({ node }) {
  const status = node?.custodyStatus || 'notPreserved';
  const detail = node?.custodyDetail || 'Sem informações de cadeia de custódia disponíveis.';

  const statusConfig = {
    preserved: {
      icon: ShieldCheck,
      label: 'PRESERVADA',
      color: 'text-status-preserved',
      bgColor: 'bg-status-preserved/10',
      borderColor: 'border-status-preserved/20',
      description: 'Esta evidência possui cadeia de custódia documentada e verificável.',
    },
    partial: {
      icon: ShieldQuestion,
      label: 'PARCIALMENTE PRESERVADA',
      color: 'text-status-partial',
      bgColor: 'bg-status-partial/10',
      borderColor: 'border-status-partial/20',
      description: 'Esta evidência possui documentação parcial de cadeia de custódia.',
    },
    notPreserved: {
      icon: ShieldAlert,
      label: 'NÃO PRESERVADA',
      color: 'text-status-notPreserved',
      bgColor: 'bg-status-notPreserved/10',
      borderColor: 'border-status-notPreserved/20',
      description: 'Esta evidência NÃO possui cadeia de custódia documentada.',
    },
  };

  const config = statusConfig[status] || statusConfig.notPreserved;
  const StatusIcon = config.icon;

  return (
    <div className="p-4 space-y-4">
      {/* Status header */}
      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <StatusIcon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <Badge variant={status === 'preserved' ? 'preserved' : status === 'partial' ? 'partial' : 'notPreserved'}>
              {config.label}
            </Badge>
            <p className="text-xs text-text-muted mt-1">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Detail explanation */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Detalhes da Custódia
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {detail}
        </p>
      </div>

      {/* Warning for not preserved */}
      {status === 'notPreserved' && (
        <div className="bg-status-notPreserved/5 border border-status-notPreserved/10 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-status-notPreserved flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-status-notPreserved">
                Implicação Processual
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Sem cadeia de custódia documentada, a autenticidade e integridade desta
                evidência podem ser questionadas em juízo. A defesa pode argumentar que
                os dados foram alterados, fabricados ou obtidos de fonte diversa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* What would be needed */}
      {status !== 'preserved' && (
        <div className="bg-bg-tertiary rounded-lg p-3">
          <h4 className="text-xs font-semibold text-text-muted mb-2">
            O que seria necessário para preservar esta evidência:
          </h4>
          <ul className="space-y-1.5 text-xs text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-text-muted">•</span>
              <span>Hash criptográfico (SHA-256) do conteúdo original</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-muted">•</span>
              <span>Timestamp de coleta com fonte confiável (RFC 3161)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-muted">•</span>
              <span>Identificação do agente responsável pela coleta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-muted">•</span>
              <span>Registro da metodologia de obtenção</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-muted">•</span>
              <span>Armazenamento em repositório com controle de acesso</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
