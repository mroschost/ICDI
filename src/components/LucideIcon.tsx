import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps extends LucideIcons.LucideProps {
  name: string;
  className?: string;
}

export const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.HelpCircle {...props} />;
  return <Icon {...props} />;
};
