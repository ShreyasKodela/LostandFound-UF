import { Badge } from '@/components/ui/badge';
import { ItemStatus } from '@/types';

interface StatusPillProps {
  status: ItemStatus;
  className?: string;
}

export function StatusPill({ status, className = '' }: StatusPillProps) {
  const getStatusConfig = (status: ItemStatus) => {
    switch (status) {
      case 'found':
        return {
          label: 'Found',
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
        };
      case 'claimed':
        return {
          label: 'Claimed',
          className: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
        };
      case 'lost':
        return {
          label: 'Lost',
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`${config.className} ${className}`}>
      {config.label}
    </Badge>
  );
}
