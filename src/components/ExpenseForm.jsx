import { useState, useEffect } from 'react';
import { SPLIT_TYPES } from '../data/initialData';
import { generateId } from '../utils/splitCalculator';
import './ExpenseForm.css';

function ExpenseForm({ friends, categories, expense, onSubmit, onClose }) {
    const isEditing = !!expense;

    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: 'food',
        paidBy: friends[0]?.id || '',
        splitType: SPLIT_TYPES.EQUAL,
        participants: friends.map(f => f.id),
        customSplits: {},
        date: new Date().toISOString().split('T')[0]
    });

    // Load expense data if editing
    useEffect(() => {
        if (expense) {
            setFormData({
                description: expense.description,
                amount: expense.amount.toString(),
                category: expense.category,
                paidBy: expense.paidBy,
                splitType: expense.splitType,
                participants: expense.participants,
                customSplits: expense.customSplits || {},
                date: expense.date
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleParticipantToggle = (friendId) => {
        setFormData(prev => {
            const isSelected = prev.participants.includes(friendId);
            const newParticipants = isSelected
                ? prev.participants.filter(id => id !== friendId)
                : [...prev.participants, friendId];

            // Ensure at least one participant
            if (newParticipants.length === 0) return prev;

            // Reset custom splits when participants change
            const newCustomSplits = { ...prev.customSplits };
            if (!isSelected) {
                // New participant - give them equal share
                const equalShare = 100 / newParticipants.length;
                newParticipants.forEach(id => {
                    newCustomSplits[id] = equalShare;
                });
            } else {
                // Removed participant
                delete newCustomSplits[friendId];
                // Redistribute among remaining
                const equalShare = 100 / newParticipants.length;
                newParticipants.forEach(id => {
                    newCustomSplits[id] = equalShare;
                });
            }

            return { ...prev, participants: newParticipants, customSplits: newCustomSplits };
        });
    };

    const handleProportionChange = (friendId, value) => {
        const numValue = parseFloat(value) || 0;
        setFormData(prev => ({
            ...prev,
            customSplits: { ...prev.customSplits, [friendId]: numValue }
        }));
    };

    // Initialize custom splits when switching to CUSTOM mode
    const initializeCustomSplits = () => {
        const equalShare = 100 / formData.participants.length;
        const newSplits = {};
        formData.participants.forEach(id => {
            newSplits[id] = formData.customSplits[id] || equalShare;
        });
        setFormData(prev => ({
            ...prev,
            splitType: SPLIT_TYPES.CUSTOM,
            customSplits: newSplits
        }));
    };

    // Calculate total proportion
    const totalProportion = formData.participants.reduce((sum, id) =>
        sum + (formData.customSplits[id] || 0), 0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const expenseData = {
            id: expense?.id || generateId(),
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: formData.category,
            paidBy: formData.paidBy,
            splitType: formData.splitType,
            participants: formData.participants,
            customSplits: formData.customSplits,
            date: formData.date,
            createdAt: expense?.createdAt || Date.now()
        };

        onSubmit(expenseData);
    };

    const isValid = formData.description && formData.amount && parseFloat(formData.amount) > 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
                    <button className="btn-icon" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body expense-form">
                    {/* Description */}
                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="input"
                            placeholder="What was the expense for?"
                            value={formData.description}
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>

                    {/* Amount & Date Row */}
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="amount">Amount (₹)</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                className="input"
                                placeholder="0"
                                min="0"
                                step="0.01"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="input"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="input-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="select"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Paid By */}
                    <div className="input-group">
                        <label>Paid By</label>
                        <div className="friend-selector">
                            {friends.map(friend => (
                                <button
                                    key={friend.id}
                                    type="button"
                                    className={`friend-option ${formData.paidBy === friend.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, paidBy: friend.id }))}
                                >
                                    <span className={`avatar ${friend.color}`}>
                                        {friend.name.charAt(0)}
                                    </span>
                                    <span className="friend-name">{friend.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Split Type */}
                    <div className="input-group">
                        <label>Split Type</label>
                        <div className="tab-toggle">
                            <button
                                type="button"
                                className={formData.splitType === SPLIT_TYPES.EQUAL ? 'active' : ''}
                                onClick={() => setFormData(prev => ({ ...prev, splitType: SPLIT_TYPES.EQUAL }))}
                            >
                                = Equal
                            </button>
                            <button
                                type="button"
                                className={formData.splitType === SPLIT_TYPES.BY_DAYS ? 'active' : ''}
                                onClick={() => setFormData(prev => ({ ...prev, splitType: SPLIT_TYPES.BY_DAYS }))}
                            >
                                📅 By Days
                            </button>
                            <button
                                type="button"
                                className={formData.splitType === SPLIT_TYPES.CUSTOM ? 'active' : ''}
                                onClick={initializeCustomSplits}
                            >
                                ✏️ Custom %
                            </button>
                        </div>
                        {formData.splitType === SPLIT_TYPES.BY_DAYS && (
                            <p className="split-hint">
                                Split proportionally based on how many days each person stayed
                            </p>
                        )}
                        {formData.splitType === SPLIT_TYPES.CUSTOM && (
                            <p className="split-hint">
                                Enter custom percentages for each person (should total 100%)
                            </p>
                        )}
                    </div>

                    {/* Custom Proportions */}
                    {formData.splitType === SPLIT_TYPES.CUSTOM && (
                        <div className="input-group">
                            <label>Custom Proportions</label>
                            <div className="proportion-inputs">
                                {formData.participants.map(friendId => {
                                    const friend = friends.find(f => f.id === friendId);
                                    return (
                                        <div key={friendId} className="proportion-row">
                                            <span className={`avatar-small ${friend?.color}`}>
                                                {friend?.name?.charAt(0)}
                                            </span>
                                            <span className="proportion-name">{friend?.name}</span>
                                            <div className="proportion-input-wrapper">
                                                <input
                                                    type="number"
                                                    className="input proportion-input"
                                                    value={formData.customSplits[friendId] || ''}
                                                    onChange={(e) => handleProportionChange(friendId, e.target.value)}
                                                    min="0"
                                                    max="100"
                                                    step="0.5"
                                                />
                                                <span className="proportion-suffix">%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={`proportion-total ${Math.abs(totalProportion - 100) < 0.1 ? 'valid' : 'invalid'}`}>
                                Total: {totalProportion.toFixed(1)}%
                                {Math.abs(totalProportion - 100) >= 0.1 && (
                                    <span className="total-warning"> (should be 100%)</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Participants */}
                    <div className="input-group">
                        <label>Split Among</label>
                        <div className="checkbox-group">
                            {friends.map(friend => {
                                const isSelected = formData.participants.includes(friend.id);
                                return (
                                    <label
                                        key={friend.id}
                                        className={`checkbox-item ${isSelected ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleParticipantToggle(friend.id)}
                                        />
                                        <span className={`avatar-small ${friend.color}`}>
                                            {friend.name.charAt(0)}
                                        </span>
                                        <span>{friend.name}</span>
                                        {formData.splitType === SPLIT_TYPES.BY_DAYS && (
                                            <span className="participant-days">({friend.daysPresent}d)</span>
                                        )}
                                        {formData.splitType === SPLIT_TYPES.CUSTOM && formData.customSplits[friend.id] && (
                                            <span className="participant-days">({formData.customSplits[friend.id].toFixed(0)}%)</span>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!isValid}
                    >
                        {isEditing ? 'Save Changes' : 'Add Expense'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExpenseForm;
