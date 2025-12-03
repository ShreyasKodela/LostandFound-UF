'use client';

import { useState, useEffect } from 'react';
import { ItemCard } from '@/components/ItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Item } from '@/types';
import { Package, CheckCircle, Clock } from 'lucide-react';

export default function MyItemsPage() {
  const [reportedItems, setReportedItems] = useState<Item[]>([]);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [claimedItems, setClaimedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserItems = async () => {
      try {
        // TODO: Replace with actual user ID from auth context
        const userId = 'current-user';
        const data = await api.getUserItems(userId);
        
        setReportedItems(data.reported);
        setFoundItems(data.found);
        setClaimedItems(data.claimed);
      } catch (error) {
        console.error('Failed to load user items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserItems();
  }, []);

  const EmptyState = ({ 
    icon: Icon, 
    title, 
    description 
  }: { 
    icon: any; 
    title: string; 
    description: string; 
  }) => (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Items</h1>
        <p className="text-gray-600">Manage your reported, found, and claimed items</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="reported" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reported" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Reported ({reportedItems.length})
          </TabsTrigger>
          <TabsTrigger value="found" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Found ({foundItems.length})
          </TabsTrigger>
          <TabsTrigger value="claimed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Claimed ({claimedItems.length})
          </TabsTrigger>
        </TabsList>

        {/* Reported Items Tab */}
        <TabsContent value="reported" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Items You Reported</h2>
            <p className="text-sm text-gray-600">
              Items you found and reported to help others
            </p>
          </div>
          
          {reportedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Package}
              title="No Reported Items"
              description="You haven't reported any items yet. Help others by reporting items you find around campus."
            />
          )}
        </TabsContent>

        {/* Found Items Tab */}
        <TabsContent value="found" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Items You Found</h2>
            <p className="text-sm text-gray-600">
              Items you discovered and reported
            </p>
          </div>
          
          {foundItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Clock}
              title="No Found Items"
              description="You haven't found any items yet. Keep an eye out for lost items around campus!"
            />
          )}
        </TabsContent>

        {/* Claimed Items Tab */}
        <TabsContent value="claimed" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Items You Claimed</h2>
            <p className="text-sm text-gray-600">
              Items you successfully claimed and picked up
            </p>
          </div>
          
          {claimedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle}
              title="No Claimed Items"
              description="You haven't claimed any items yet. Browse the available items to see if any belong to you."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}