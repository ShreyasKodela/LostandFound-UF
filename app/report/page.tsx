'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api';
import { Category } from '@/types';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const reportSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  category: z.enum(['electronics', 'clothing', 'accessories', 'books', 'keys', 'bags', 'other'], {
    required_error: 'Please select a category'
  }),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
  dateFound: z.string().min(1, 'Date found is required'),
  photo: z.instanceof(File).optional()
});

type ReportFormData = z.infer<typeof reportSchema>;

const categories: { value: Category; label: string }[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'books', label: 'Books' },
  { value: 'keys', label: 'Keys' },
  { value: 'bags', label: 'Bags' },
  { value: 'other', label: 'Other' }
];

export default function ReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
      location: '',
      dateFound: new Date().toISOString().split('T')[0],
      photo: undefined
    }
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call to Supabase/backend
      await api.createReport(data);
      
      // Show success message and redirect
      alert('Item reported successfully!');
      router.push('/');
    } catch (error) {
      console.error('Failed to report item:', error);
      alert('Failed to report item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Found Item</h1>
        <p className="text-gray-600">Help reunite lost items with their owners by reporting what you found</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., iPhone 15 Pro, UF Hoodie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the item in detail (color, brand, condition, etc.)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Found *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Library West, Turlington Hall" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Found */}
              <FormField
                control={form.control}
                name="dateFound"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Found *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo Upload */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Photo (Optional)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label
                            htmlFor="photo"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Choose Photo</span>
                          </label>
                          <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(file);
                              handlePhotoChange(file);
                            }}
                            {...field}
                          />
                          {value && (
                            <span className="text-sm text-gray-600">
                              {value.name}
                            </span>
                          )}
                        </div>
                        {photoPreview && (
                          <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Reporting...' : 'Report Item'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
