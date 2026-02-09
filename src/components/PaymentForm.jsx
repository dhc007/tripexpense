import { useState } from 'react';
import { generateId, formatCurrency } from '../utils/splitCalculator';
import './PaymentForm.css';

function PaymentForm({ friends, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        from: friends[0]?.id || '',
        to: friends[1]?.id || '',
        amount: '',
        note: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payment = {
            id: generateId(),
            from: formData.from,
            to: formData.to,
            amount: parseFloat(formData.amount),
            note: formData.note || 'Settlement payment',
            date: formData.date,
            createdAt: Date.now()
        };

        onSubmit(payment);
    };

    const isValid = formData.from && formData.to &&
        formData.from !== formData.to &&
        formData.amount && parseFloat(formData.amount) > 0;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>💸 Record Payment</h2>
                    <button className="btn-icon" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body payment-form">
                    <p className="payment-intro">
                        Record when someone pays back money to settle their debt.
                    </p>

                    {/* From */}
                    <div className="input-group">
                        <label>Who is paying?</label>
                        <div className="friend-selector">
                            {friends.map(friend => (
                                <button
                                    key={friend.id}
                                    type="button"
                                    className={`friend-option ${formData.from === friend.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, from: friend.id }))}
                                >
                                    <span className={`avatar ${friend.color}`}>
                                        {friend.name.charAt(0)}
                                    </span>
                                    <span className="friend-name">{friend.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Arrow visualization */}
                    <div className="payment-arrow">
                        <span className="arrow-text">pays</span>
                        <span className="arrow-icon">↓</span>
                    </div>

                    {/* To */}
                    <div className="input-group">
                        <label>Who is receiving?</label>
                        <div className="friend-selector">
                            {friends.map(friend => (
                                <button
                                    key={friend.id}
                                    type="button"
                                    className={`friend-option ${formData.to === friend.id ? 'selected' : ''} ${formData.from === friend.id ? 'disabled' : ''}`}
                                    onClick={() => formData.from !== friend.id && setFormData(prev => ({ ...prev, to: friend.id }))}
                                    disabled={formData.from === friend.id}
                                >
                                    <span className={`avatar ${friend.color}`}>
                                        {friend.name.charAt(0)}
                                    </span>
                                    <span className="friend-name">{friend.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount & Date */}
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

                    {/* Note */}
                    <div className="input-group">
                        <label htmlFor="note">Note (optional)</label>
                        <input
                            type="text"
                            id="note"
                            name="note"
                            className="input"
                            placeholder="e.g., UPI payment, Cash, etc."
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Preview */}
                    {isValid && (
                        <div className="payment-preview">
                            <span className="preview-from">{friends.find(f => f.id === formData.from)?.name}</span>
                            <span className="preview-pays">pays</span>
                            <span className="preview-amount">{formatCurrency(parseFloat(formData.amount))}</span>
                            <span className="preview-to">to {friends.find(f => f.id === formData.to)?.name}</span>
                        </div>
                    )}
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
                        Record Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentForm;
