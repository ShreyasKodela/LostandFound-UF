export interface Item {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  dateFound: string;
  dateReported: string;
  status: ItemStatus;
  photoUrl?: string;
  reporterId: string;
  finderId?: string;
  claimerId?: string;
}

export type ItemStatus = 'lost' | 'found' | 'claimed';

export type Category = 
  | 'electronics'
  | 'clothing'
  | 'accessories'
  | 'books'
  | 'keys'
  | 'bags'
  | 'other';

export interface ReportForm {
  title: string;
  description: string;
  category: Category;
  location: string;
  dateFound: string;
  photo?: File;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface FilterOptions {
  category?: Category;
  location?: string;
  status?: ItemStatus;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ClaimRequest {
  itemId: string;
  claimerId: string;
  message?: string;
}
