// Initial trip data for Mumbai trip
// Jan 31 - Feb 2, 2026

export const TRIP_INFO = {
  name: 'Mumbai Trip 2026',
  startDate: '2026-01-31',
  endDate: '2026-02-02',
  location: 'Mumbai',
  currency: 'INR',
  currencySymbol: '₹'
};

// Friend data with arrival/departure times
export const initialFriends = [
  {
    id: 'friend-1',
    name: 'Dhruv',
    color: 'friend-1',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T08:00',
    daysPresent: 2.0
  },
  {
    id: 'friend-2',
    name: 'Rahul',
    color: 'friend-2',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T16:50',
    daysPresent: 2.5
  },
  {
    id: 'friend-3',
    name: 'Amit',
    color: 'friend-3',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T22:00',
    daysPresent: 3.0
  },
  {
    id: 'friend-4',
    name: 'Vikram',
    color: 'friend-4',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T22:00',
    daysPresent: 3.0
  }
];

// Expense categories with icons
export const CATEGORIES = [
  { id: 'hotel', name: 'Hotel', icon: '🏨', color: '#8B5CF6' },
  { id: 'food', name: 'Food & Drinks', icon: '🍽️', color: '#FF6B35' },
  { id: 'transport', name: 'Transport', icon: '🚕', color: '#10B981' },
  { id: 'activities', name: 'Activities', icon: '🎭', color: '#F59E0B' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { id: 'other', name: 'Other', icon: '📦', color: '#6B7280' }
];

// Split types
export const SPLIT_TYPES = {
  EQUAL: 'equal',
  BY_DAYS: 'by_days',
  CUSTOM: 'custom',
  EXACT: 'exact'
};

// Sample expenses to get started
export const sampleExpenses = [
  {
    id: 'exp-1',
    description: 'Hotel Stay - Taj Lands End',
    amount: 15000,
    category: 'hotel',
    paidBy: 'friend-1',
    splitType: 'by_days',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: Date.now()
  },
  {
    id: 'exp-2',
    description: 'Dinner at Leopold Cafe',
    amount: 4200,
    category: 'food',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: Date.now() + 1
  },
  {
    id: 'exp-3',
    description: 'Uber to Gateway of India',
    amount: 350,
    category: 'transport',
    paidBy: 'friend-2',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: Date.now() + 2
  },
  {
    id: 'exp-4',
    description: 'Ferry to Elephanta Caves',
    amount: 1200,
    category: 'activities',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: Date.now() + 3
  },
  {
    id: 'exp-5',
    description: 'Street Food Tour',
    amount: 1800,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-02',
    createdAt: Date.now() + 4
  }
];
