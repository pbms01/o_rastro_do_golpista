// src/components/volatility/DegradationTimer.jsx
import React from 'react';
import { Timer, AlertTriangle } from 'lucide-react';

export default function DegradationTimer({ timestamp }) {
  const getTimestampColor = () => {
    switch (timestamp) {
      case '0h':
        return 'text-status-preserved';
      case '6h':
        return 'text-status-partial';
      case '24h':
        return 'text-status-volatile';
      case '48h':
        return 'text-status-notPreserved';
      case '72h':
        return 'text-status-notPreserved';
      default:
        return 'text-text-primary';
    }
  };

  const getProgress = () => {
    switch (timestamp) {
      case '0h':
        return 0;
      case '6h':
        return 8;
      case '24h':
        return 33;
      case '48h':
        return 67;
      case '72h':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-bg-tertiary/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-status-notPreserved/30 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-status-notPreserved" />
          <span className="text-sm font-medium text-status-notPreserved">
            72 HORAS DEPOIS...
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Timer className={`w-5 h-5 ${getTimestampColor()}`} />
          <span className={`text-xl font-mono font-bold ${getTimestampColor()}`}>
            {timestamp}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-2 bg-bg-primary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-status-preserved via-status-volatile to-status-notPreserved transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>
    </div>
  );
}
