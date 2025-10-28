'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Item } from '@/types';
import { CheckCircle, ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ClaimConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Back to Browse</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href={`/items/${item.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Claim Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your claim has been submitted successfully. You will be contacted soon to arrange pickup.
          </p>

          {/* Item Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Claimed Item</h2>
            <div className="text-left space-y-3">
              <div>
                <span className="font-medium text-gray-600">Item:</span>
                <p className="text-gray-900">{item.title}</p>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-600">Location:</span>
                <span className="text-gray-900">{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-600">Found:</span>
                <span className="text-gray-900">{new Date(item.dateFound).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Pickup Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pickup Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Next Steps:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>You will receive an email confirmation within 24 hours</li>
                    <li>Bring a valid ID when picking up the item</li>
                    <li>Pickup location: UF Lost & Found Office, Reitz Union</li>
                    <li>Office hours: Monday-Friday, 9:00 AM - 5:00 PM</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Important:</h4>
                  <p className="text-blue-800 text-sm">
                    Items must be claimed within 30 days. Unclaimed items will be donated or disposed of.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse More Items
              </Button>
            </Link>
            <Link href="/my-items" className="flex-1">
              <Button className="w-full">
                View My Items
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
