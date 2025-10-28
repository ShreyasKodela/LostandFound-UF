import { Item, ReportForm, ClaimRequest, FilterOptions } from '@/types';

// Mock data for development
const mockItems: Item[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro',
    description: 'Black iPhone 15 Pro with cracked screen. Found near Library West.',
    category: 'electronics',
    location: 'Library West',
    dateFound: '2024-01-15',
    dateReported: '2024-01-15',
    status: 'found',
    photoUrl: '/placeholder-phone.jpg',
    reporterId: 'user1',
    finderId: 'user2'
  },
  {
    id: '2',
    title: 'UF Gators Hoodie',
    description: 'Blue UF Gators hoodie, size M. Left in Turlington Hall.',
    category: 'clothing',
    location: 'Turlington Hall',
    dateFound: '2024-01-14',
    dateReported: '2024-01-14',
    status: 'found',
    photoUrl: '/placeholder-hoodie.jpg',
    reporterId: 'user1',
    finderId: 'user3'
  },
  {
    id: '3',
    title: 'MacBook Air',
    description: 'Silver MacBook Air 13" with stickers on the cover.',
    category: 'electronics',
    location: 'Marston Science Library',
    dateFound: '2024-01-13',
    dateReported: '2024-01-13',
    status: 'claimed',
    photoUrl: '/placeholder-laptop.jpg',
    reporterId: 'user1',
    finderId: 'user4',
    claimerId: 'user5'
  },
  {
    id: '4',
    title: 'Car Keys',
    description: 'Honda car keys with keychain. Found in parking garage.',
    category: 'keys',
    location: 'Parking Garage',
    dateFound: '2024-01-12',
    dateReported: '2024-01-12',
    status: 'found',
    photoUrl: '/placeholder-keys.jpg',
    reporterId: 'user1',
    finderId: 'user6'
  },
  {
    id: '5',
    title: 'Textbook - Calculus',
    description: 'Calculus textbook, 3rd edition. Left in classroom.',
    category: 'books',
    location: 'Little Hall',
    dateFound: '2024-01-11',
    dateReported: '2024-01-11',
    status: 'found',
    photoUrl: '/placeholder-book.jpg',
    reporterId: 'user1',
    finderId: 'user7'
  },
  {
    id: '6',
    title: 'Backpack',
    description: 'Black Nike backpack with laptop compartment.',
    category: 'bags',
    location: 'Reitz Union',
    dateFound: '2024-01-10',
    dateReported: '2024-01-10',
    status: 'found',
    photoUrl: '/placeholder-backpack.jpg',
    reporterId: 'user1',
    finderId: 'user8'
  },
  {
    id: '7',
    title: 'AirPods Pro',
    description: 'White AirPods Pro in charging case.',
    category: 'electronics',
    location: 'Gainesville Gym',
    dateFound: '2024-01-09',
    dateReported: '2024-01-09',
    status: 'found',
    photoUrl: '/placeholder-airpods.jpg',
    reporterId: 'user1',
    finderId: 'user9'
  },
  {
    id: '8',
    title: 'UF Ring',
    description: 'Gold UF class ring, size 7.',
    category: 'accessories',
    location: 'Ben Hill Griffin Stadium',
    dateFound: '2024-01-08',
    dateReported: '2024-01-08',
    status: 'claimed',
    photoUrl: '/placeholder-ring.jpg',
    reporterId: 'user1',
    finderId: 'user10',
    claimerId: 'user11'
  }
];

// TODO: Replace with actual API calls to Supabase/backend
export const api = {
  // Fetch all items with optional filtering
  async fetchItems(filters?: FilterOptions): Promise<Item[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredItems = [...mockItems];
    
    if (filters?.category) {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    
    if (filters?.location) {
      filteredItems = filteredItems.filter(item => 
        item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters?.status) {
      filteredItems = filteredItems.filter(item => item.status === filters.status);
    }
    
    if (filters?.dateRange) {
      filteredItems = filteredItems.filter(item => {
        const itemDate = new Date(item.dateFound);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    
    return filteredItems;
  },

  // Get a single item by ID
  async getItemById(id: string): Promise<Item | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const item = mockItems.find(item => item.id === id);
    return item || null;
  },

  // Create a new report
  async createReport(formData: ReportForm): Promise<Item> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newItem: Item = {
      id: (mockItems.length + 1).toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      dateFound: formData.dateFound,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'found',
      photoUrl: formData.photo ? URL.createObjectURL(formData.photo) : undefined,
      reporterId: 'current-user', // TODO: Get from auth context
      finderId: 'current-user'
    };
    
    mockItems.unshift(newItem);
    return newItem;
  },

  // Claim an item
  async claimItem(claimRequest: ClaimRequest): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const itemIndex = mockItems.findIndex(item => item.id === claimRequest.itemId);
    if (itemIndex !== -1) {
      mockItems[itemIndex].status = 'claimed';
      mockItems[itemIndex].claimerId = claimRequest.claimerId;
      return true;
    }
    
    return false;
  },

  // Get user's items (reported, found, claimed)
  async getUserItems(userId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const reported = mockItems.filter(item => item.reporterId === userId);
    const found = mockItems.filter(item => item.finderId === userId);
    const claimed = mockItems.filter(item => item.claimerId === userId);
    
    return { reported, found, claimed };
  }
};
