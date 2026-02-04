// src/components/shared/EntityIcon.jsx
import React from 'react';
import {
  Globe,
  Mail,
  Cpu,
  FileSearch,
  ArrowRightLeft,
  Server,
  ShieldCheck,
  MapPin,
  User,
  FileText,
  File,
} from 'lucide-react';
import { entityTypes } from '../../utils/entityTypes';

const iconMap = {
  Globe,
  Mail,
  Cpu,
  FileSearch,
  ArrowRightLeft,
  Server,
  ShieldCheck,
  MapPin,
  User,
  FileText,
  File,
};

export default function EntityIcon({ type, size = 16, className = '' }) {
  const entityType = entityTypes[type];
  const iconName = entityType?.icon || 'File';
  const color = entityType?.color || '#64748b';
  const IconComponent = iconMap[iconName] || File;

  return (
    <IconComponent
      size={size}
      className={className}
      style={{ color }}
    />
  );
}
