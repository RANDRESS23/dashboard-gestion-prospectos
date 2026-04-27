import { useContext } from 'react';
import { LeadsContext } from '@/contexts/LeadsContext';

export function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}
