// src/components/layout/Sidebar.jsx
import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import StepList from '../sidebar/StepList';
import TransformInfo from '../sidebar/TransformInfo';
import StepNarrative from '../sidebar/StepNarrative';
import PresenterControls from '../sidebar/PresenterControls';

export default function Sidebar({ onClose }) {
  const { currentStepData } = useInvestigation();

  return (
    <aside className="w-80 max-w-full flex-shrink-0 bg-bg-secondary border-r border-white/10 flex flex-col overflow-hidden h-full">
      {/* Step List */}
      <div className="flex-shrink-0 border-b border-white/10">
        <StepList onStepClick={onClose} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Transform Info */}
        {currentStepData?.transform && (
          <div className="border-b border-white/10">
            <TransformInfo />
          </div>
        )}

        {/* Narrative */}
        <div className="border-b border-white/10">
          <StepNarrative />
        </div>
      </div>

      {/* Presenter Controls - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-white/10">
        <PresenterControls />
      </div>
    </aside>
  );
}
