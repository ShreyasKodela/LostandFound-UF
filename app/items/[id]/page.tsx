'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusPill } from '@/components/StatusPill';
import { api } from '@/lib/api';
import { Item } from '@/types';
import { ArrowLeft, MapPin, Calendar, User, MessageCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      if (!params.id) return;
      
      try {
        const data = await api.getItemById(params.id as string);
        setItem(data);
      } catch (error) {
        console.error('Failed to load item:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [params.id]);

  const handleClaim = async () => {
    if (!item) return;
    
    setClaiming(true);
    try {
      // TODO: Replace with actual API call to Supabase/backend
      const success = await api.claimItem({
        itemId: item.id,
        claimerId: 'current-user' // TODO: Get from auth context
      });
      
      if (success) {
        router.push(`/items/${item.id}/claim`);
      } else {
        alert('Failed to claim item. Please try again.');
      }
    } catch (error) {
      console.error('Failed to claim item:', error);
      alert('Failed to claim item. Please try again.');
    } finally {
      setClaiming(false);
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Found on {new Date(item.dateFound).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {item.location}
              </span>
            </div>
          </div>
          <StatusPill status={item.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photo */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                {getCategoryIcon(item.category)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>

          {/* Item Information */}
          <Card>
            <CardHeader>
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <p className="capitalize">{item.category}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <p className="capitalize">{item.status}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Location:</span>
                  <p>{item.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date Found:</span>
                  <p>{new Date(item.dateFound).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Reported:</span>
                  <p>{new Date(item.dateReported).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {item.status === 'found' && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Is this your item? Claim it to arrange pickup.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleClaim}
                    disabled={claiming}
                    className="flex-1"
                  >
                    {claiming ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Claiming...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Claim This Item
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Staff
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {item.status === 'claimed' && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Claimed</h3>
                  <p className="text-gray-600">This item has been claimed and is no longer available.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
