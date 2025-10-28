import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types';
import { MapPin, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'found':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'claimed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lost':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return '📱';
      case 'clothing':
        return '👕';
      case 'accessories':
        return '💍';
      case 'books':
        return '📚';
      case 'keys':
        return '🔑';
      case 'bags':
        return '🎒';
      default:
        return '📦';
    }
  };

  return (
    <Link href={`/items/${item.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Photo placeholder */}
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
              {getCategoryIcon(item.category)}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(item.dateFound).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
