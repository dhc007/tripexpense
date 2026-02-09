import { useState, useEffect } from 'react';
import { TRIP_INFO, initialFriends, sampleExpenses, CATEGORIES } from './data/initialData';
import { calculateBalances, simplifyDebts, getTripStats, formatCurrency } from './utils/splitCalculator';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import SettlementView from './components/SettlementView';
import FriendsPanel from './components/FriendsPanel';
import PaymentForm from './components/PaymentForm';
import './App.css';

// LocalStorage keys
const STORAGE_KEYS = {
  EXPENSES: 'splitit-expenses',
  FRIENDS: 'splitit-friends',
  PAYMENTS: 'splitit-payments'
};

function App() {
  // State
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FRIENDS);
    return saved ? JSON.parse(saved) : initialFriends;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : sampleExpenses;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveView] = useState('dashboard');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showFriendsPanel, setShowFriendsPanel] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  // Calculated values - include payments in balance calculation
  const balances = calculateBalances(expenses, friends, payments);
  const settlements = simplifyDebts(balances);
  const stats = getTripStats(expenses, friends);

  // Handlers
  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
    setShowExpenseForm(false);
  };

  const handleEditExpense = (expense) => {
    setExpenses(prev => prev.map(e => e.id === expense.id ? expense : e));
    setShowExpenseForm(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prev => prev.filter(e => e.id !== expenseId));
  };

  const handleUpdateFriends = (updatedFriends) => {
    setFriends(updatedFriends);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const closeForm = () => {
    setShowExpenseForm(false);
    setEditingExpense(null);
  };

  // Payment handlers
  const handleAddPayment = (payment) => {
    setPayments(prev => [...prev, payment]);
    setShowPaymentForm(false);
  };

  const handleDeletePayment = (paymentId) => {
    setPayments(prev => prev.filter(p => p.id !== paymentId));
  };

  return (
    <div className="app">
      <Header
        tripInfo={TRIP_INFO}
        totalSpent={stats.totalSpent}
        onShowFriends={() => setShowFriendsPanel(true)}
      />

      <main className="main-content">
        <div className="container">
          {/* Navigation Tabs */}
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveView('dashboard')}
            >
              <span className="nav-icon">📊</span>
              Dashboard
            </button>
            <button
              className={`nav-tab ${activeView === 'expenses' ? 'active' : ''}`}
              onClick={() => setActiveView('expenses')}
            >
              <span className="nav-icon">📝</span>
              Expenses
            </button>
            <button
              className={`nav-tab ${activeView === 'settle' ? 'active' : ''}`}
              onClick={() => setActiveView('settle')}
            >
              <span className="nav-icon">💸</span>
              Settle Up
            </button>
          </nav>

          {/* Views */}
          <div className="view-container animate-fade-in">
            {activeView === 'dashboard' && (
              <Dashboard
                friends={friends}
                balances={balances}
                stats={stats}
                categories={CATEGORIES}
              />
            )}

            {activeView === 'expenses' && (
              <ExpenseList
                expenses={expenses}
                friends={friends}
                categories={CATEGORIES}
                onEdit={openEditForm}
                onDelete={handleDeleteExpense}
              />
            )}

            {activeView === 'settle' && (
              <SettlementView
                friends={friends}
                balances={balances}
                settlements={settlements}
                payments={payments}
                expenses={expenses}
                stats={stats}
                categories={CATEGORIES}
                onRecordPayment={() => setShowPaymentForm(true)}
                onDeletePayment={handleDeletePayment}
              />
            )}
          </div>

          {/* Floating Add Button */}
          <button
            className="fab"
            onClick={() => setShowExpenseForm(true)}
            title="Add Expense"
          >
            <span>+</span>
          </button>
        </div>
      </main>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          friends={friends}
          categories={CATEGORIES}
          expense={editingExpense}
          onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
          onClose={closeForm}
        />
      )}

      {/* Friends Panel Modal */}
      {showFriendsPanel && (
        <FriendsPanel
          friends={friends}
          onUpdate={handleUpdateFriends}
          onClose={() => setShowFriendsPanel(false)}
        />
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm
          friends={friends}
          onSubmit={handleAddPayment}
          onClose={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
}

export default App;
