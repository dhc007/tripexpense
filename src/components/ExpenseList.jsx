import { useState } from 'react';
import { formatCurrency, calculateExpenseSplit } from '../utils/splitCalculator';
import './ExpenseList.css';

function ExpenseList({ expenses, friends, categories, onEdit, onDelete, viewOnly }) {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => b.createdAt - a.createdAt);

    // Filter expenses
    const filteredExpenses = sortedExpenses.filter(expense => {
        const matchesCategory = filter === 'all' || expense.category === filter;
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryInfo = (categoryId) => categories.find(c => c.id === categoryId) || {};
    const getFriendInfo = (friendId) => friends.find(f => f.id === friendId) || {};

    return (
        <div className="expense-list-container">
            {/* Filters */}
            <div className="expense-filters">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="input search-input"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    <button
                        className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-chip ${filter === cat.id ? 'active' : ''}`}
                            onClick={() => setFilter(cat.id)}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Expense List */}
            {filteredExpenses.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <h3>No expenses found</h3>
                    <p>{viewOnly ? 'No matching expenses' : 'Add your first expense using the + button below'}</p>
                </div>
            ) : (
                <div className="expense-list">
                    {filteredExpenses.map((expense, index) => {
                        const category = getCategoryInfo(expense.category);
                        const payer = getFriendInfo(expense.paidBy);
                        const splits = calculateExpenseSplit(expense, friends);

                        return (
                            <div
                                key={expense.id}
                                className="expense-item"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="expense-icon" style={{ backgroundColor: category.color + '20', color: category.color }}>
                                    {category.icon}
                                </div>

                                <div className="expense-details">
                                    <div className="expense-main">
                                        <h4 className="expense-description">{expense.description}</h4>
                                        <span className="expense-date">{expense.date}</span>
                                    </div>

                                    <div className="expense-meta">
                                        <span className="expense-payer">
                                            <span className={`avatar-small ${payer.color}`}>
                                                {payer.name?.charAt(0)}
                                            </span>
                                            {payer.name} paid
                                        </span>
                                        <span className="expense-split-type">
                                            {expense.splitType === 'equal' && '= Equal'}
                                            {expense.splitType === 'by_days' && '📅 By Days'}
                                            {expense.splitType === 'custom' && '✏️ Custom'}
                                        </span>
                                        <span className="expense-participants">
                                            👥 {expense.participants.length} people
                                        </span>
                                    </div>
                                </div>

                                <div className="expense-amount-section">
                                    <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                                    {/* Only show edit/delete buttons when NOT in viewOnly mode */}
                                    {!viewOnly && onEdit && onDelete && (
                                        <div className="expense-actions">
                                            <button className="btn-icon btn-small" onClick={() => onEdit(expense)} title="Edit">
                                                ✏️
                                            </button>
                                            <button className="btn-icon btn-small btn-danger-icon" onClick={() => onDelete(expense.id)} title="Delete">
                                                🗑️
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Summary */}
            {filteredExpenses.length > 0 && (
                <div className="expense-summary">
                    <span>{filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}</span>
                    <span className="summary-total">
                        Total: {formatCurrency(filteredExpenses.reduce((sum, e) => sum + e.amount, 0))}
                    </span>
                </div>
            )}
        </div>
    );
}

export default ExpenseList;
