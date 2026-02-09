// Initial trip data for Mumbai trip
// Jan 30 - Feb 9, 2026

export const TRIP_INFO = {
  name: 'Mumbai Trip 2026',
  startDate: '2026-01-30',
  endDate: '2026-02-09',
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
    daysPresent: 2
  },
  {
    id: 'friend-2',
    name: 'Kartik',
    color: 'friend-2',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T16:50',
    daysPresent: 2
  },
  {
    id: 'friend-3',
    name: 'Aryan',
    color: 'friend-3',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T22:00',
    daysPresent: 2
  },
  {
    id: 'friend-4',
    name: 'Aaron',
    color: 'friend-4',
    arrival: '2026-01-31T10:00',
    departure: '2026-02-02T22:00',
    daysPresent: 1
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

// Actual trip expenses
export const sampleExpenses = [
  {
    id: 'exp-1',
    description: 'Airbnb - Bandra day 1',
    amount: 6818.5,
    category: 'hotel',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-01-30',
    createdAt: 1770118123128
  },
  {
    id: 'exp-2',
    description: 'Airbnb - Bandra Day 2',
    amount: 6818.5,
    category: 'hotel',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-2', 'friend-4'],
    customSplits: {},
    date: '2026-01-30',
    createdAt: 1770119162495
  },
  {
    id: 'exp-3',
    description: 'Entisi Chocolate',
    amount: 650,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: 1770119246415
  },
  {
    id: 'exp-4',
    description: 'Under Armour',
    amount: 11968,
    category: 'shopping',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-2'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: 1770119370386
  },
  {
    id: 'exp-5',
    description: '6hour Stay Royal Orchard',
    amount: 2524,
    category: 'hotel',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-2', 'friend-4', 'friend-1'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: 1770119413288
  },
  {
    id: 'exp-6',
    description: 'JD Honey',
    amount: 3800,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-01-31',
    createdAt: 1770119474538
  },
  {
    id: 'exp-7',
    description: 'Burger Swiggy night',
    amount: 658,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770119572026
  },
  {
    id: 'exp-8',
    description: 'Keventers swiggy',
    amount: 438,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770119684330
  },
  {
    id: 'exp-9',
    description: '99 Pancakes Waffles swiggy',
    amount: 354,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770119707731
  },
  {
    id: 'exp-10',
    description: 'FOO',
    amount: 7196,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'custom',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: { 'friend-1': 24, 'friend-2': 32, 'friend-3': 20, 'friend-4': 24 },
    date: '2026-02-01',
    createdAt: 1770119817619
  },
  {
    id: 'exp-11',
    description: 'croffles',
    amount: 600,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-02',
    createdAt: 1770121289154
  },
  {
    id: 'exp-12',
    description: 'Subko',
    amount: 2634,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-4'],
    customSplits: {},
    date: '2026-02-03',
    createdAt: 1770121511375
  },
  {
    id: 'exp-13',
    description: 'Cabs and metro',
    amount: 457,
    category: 'transport',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-4'],
    customSplits: {},
    date: '2026-02-03',
    createdAt: 1770121709113
  },
  {
    id: 'exp-14',
    description: 'stuff',
    amount: 1000,
    category: 'food',
    paidBy: 'friend-2',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3'],
    customSplits: {},
    date: '2026-02-03',
    createdAt: 1770122155982
  },
  {
    id: 'exp-15',
    description: 'stuff',
    amount: 1000,
    category: 'other',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3'],
    customSplits: {},
    date: '2026-01-30',
    createdAt: 1770131987758
  },
  {
    id: 'exp-16',
    description: 'cigs and blinkit',
    amount: 232,
    category: 'other',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770132161257
  },
  {
    id: 'exp-17',
    description: 'cab all in one',
    amount: 450,
    category: 'transport',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770132345054
  },
  {
    id: 'exp-18',
    description: 'pani puri',
    amount: 270,
    category: 'food',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-03',
    createdAt: 1770132368139
  },
  {
    id: 'exp-19',
    description: 'Swiggy- ultimate roll',
    amount: 474,
    category: 'food',
    paidBy: 'friend-3',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3'],
    customSplits: {},
    date: '2026-02-03',
    createdAt: 1770132442564
  },
  {
    id: 'exp-20',
    description: 'Pop Tates',
    amount: 2000,
    category: 'food',
    paidBy: 'friend-1',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-06',
    createdAt: 1770383404069
  },
  {
    id: 'exp-21',
    description: 'Blinkit coke ice',
    amount: 300,
    category: 'food',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-02',
    createdAt: 1770626703384
  },
  {
    id: 'exp-22',
    description: 'rolling paper',
    amount: 229,
    category: 'other',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3'],
    customSplits: {},
    date: '2026-02-02',
    createdAt: 1770626731534
  },
  {
    id: 'exp-23',
    description: 'metro to airport',
    amount: 120,
    category: 'transport',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-2', 'friend-4'],
    customSplits: {},
    date: '2026-02-09',
    createdAt: 1770626824830
  },
  {
    id: 'exp-24',
    description: 'metro parel and back',
    amount: 320,
    category: 'transport',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: {},
    date: '2026-02-01',
    createdAt: 1770626883663
  },
  {
    id: 'exp-25',
    description: 'cst metro',
    amount: 180,
    category: 'transport',
    paidBy: 'friend-4',
    splitType: 'equal',
    participants: ['friend-1', 'friend-2', 'friend-4'],
    customSplits: {},
    date: '2026-02-09',
    createdAt: 1770626959847
  },
  {
    id: 'exp-26',
    description: 'elco',
    amount: 2500,
    category: 'food',
    paidBy: 'friend-2',
    splitType: 'custom',
    participants: ['friend-1', 'friend-2', 'friend-3', 'friend-4'],
    customSplits: { 'friend-1': 14.8, 'friend-2': 56, 'friend-3': 20, 'friend-4': 9.2 },
    date: '2026-02-01',
    createdAt: 1770627510521
  },
  {
    id: 'exp-27',
    description: 'Perfume aaron',
    amount: 2000,
    category: 'shopping',
    paidBy: 'friend-4',
    splitType: 'custom',
    participants: ['friend-1', 'friend-2', 'friend-4'],
    customSplits: { 'friend-1': 20, 'friend-2': 10, 'friend-4': 70 },
    date: '2026-02-09',
    createdAt: 1770627946115
  }
];

// Initial payments
export const initialPayments = [
  {
    id: 'pay-1',
    from: 'friend-2',
    to: 'friend-1',
    amount: 12000,
    note: 'Upi',
    date: '2026-02-09',
    createdAt: 1770627887900
  }
];
