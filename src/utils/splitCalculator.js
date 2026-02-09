/**
 * Split Calculator - Core expense splitting logic
 * Handles equal splits, pro-rated by days, and custom splits
 * Also simplifies debts to minimize transactions
 */

import { SPLIT_TYPES } from '../data/initialData';

/**
 * Calculate how much each participant owes for a single expense
 * @param {Object} expense - The expense object
 * @param {Array} friends - Array of friend objects with daysPresent
 * @returns {Object} - Map of friendId to amount owed
 */
export function calculateExpenseSplit(expense, friends) {
    const { amount, splitType, participants, customSplits } = expense;
    const participatingFriends = friends.filter(f => participants.includes(f.id));

    const splits = {};

    switch (splitType) {
        case SPLIT_TYPES.EQUAL: {
            const perPerson = amount / participatingFriends.length;
            participatingFriends.forEach(friend => {
                splits[friend.id] = perPerson;
            });
            break;
        }

        case SPLIT_TYPES.BY_DAYS: {
            const totalDays = participatingFriends.reduce((sum, f) => sum + f.daysPresent, 0);
            participatingFriends.forEach(friend => {
                splits[friend.id] = (friend.daysPresent / totalDays) * amount;
            });
            break;
        }

        case SPLIT_TYPES.CUSTOM: {
            // Custom percentages
            participatingFriends.forEach(friend => {
                const percentage = customSplits[friend.id] || (100 / participatingFriends.length);
                splits[friend.id] = (percentage / 100) * amount;
            });
            break;
        }

        case SPLIT_TYPES.EXACT: {
            // Exact amounts
            participatingFriends.forEach(friend => {
                splits[friend.id] = customSplits[friend.id] || 0;
            });
            break;
        }

        default: {
            const perPerson = amount / participatingFriends.length;
            participatingFriends.forEach(friend => {
                splits[friend.id] = perPerson;
            });
        }
    }

    return splits;
}

/**
 * Calculate net balance for each friend across all expenses
 * Positive = they are owed money, Negative = they owe money
 * @param {Array} expenses - All expenses
 * @param {Array} friends - All friends
 * @param {Array} payments - Settlement payments made
 * @returns {Object} - Map of friendId to net balance
 */
export function calculateBalances(expenses, friends, payments = []) {
    const balances = {};

    // Initialize balances to 0
    friends.forEach(friend => {
        balances[friend.id] = 0;
    });

    // Process each expense
    expenses.forEach(expense => {
        const splits = calculateExpenseSplit(expense, friends);

        // Add amount paid
        balances[expense.paidBy] += expense.amount;

        // Subtract amount owed
        Object.entries(splits).forEach(([friendId, owedAmount]) => {
            balances[friendId] -= owedAmount;
        });
    });

    // Apply settlement payments
    payments.forEach(payment => {
        // Person who paid reduces their debt (or increases what they're owed)
        balances[payment.from] += payment.amount;
        // Person who received reduces what they're owed (or increases their debt)
        balances[payment.to] -= payment.amount;
    });

    return balances;
}

/**
 * Simplify debts to minimize number of transactions
 * Uses a greedy algorithm to settle debts efficiently
 * @param {Object} balances - Map of friendId to net balance
 * @returns {Array} - Array of { from, to, amount } transactions
 */
export function simplifyDebts(balances) {
    const transactions = [];

    // Separate into creditors (positive) and debtors (negative)
    const creditors = [];
    const debtors = [];

    Object.entries(balances).forEach(([friendId, balance]) => {
        if (balance > 0.01) {
            creditors.push({ id: friendId, amount: balance });
        } else if (balance < -0.01) {
            debtors.push({ id: friendId, amount: -balance }); // Make positive
        }
    });

    // Sort by amount (descending) for more efficient matching
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    // Match debtors to creditors
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        const transferAmount = Math.min(debtor.amount, creditor.amount);

        if (transferAmount > 0.01) {
            transactions.push({
                from: debtor.id,
                to: creditor.id,
                amount: Math.round(transferAmount * 100) / 100
            });
        }

        debtor.amount -= transferAmount;
        creditor.amount -= transferAmount;

        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }

    return transactions;
}

/**
 * Get summary statistics for the trip
 * @param {Array} expenses - All expenses
 * @param {Array} friends - All friends
 * @returns {Object} - Summary statistics
 */
export function getTripStats(expenses, friends) {
    const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Spending by category
    const byCategory = {};
    expenses.forEach(exp => {
        byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });

    // Who paid the most
    const paidByPerson = {};
    expenses.forEach(exp => {
        paidByPerson[exp.paidBy] = (paidByPerson[exp.paidBy] || 0) + exp.amount;
    });

    let topPayer = null;
    let maxPaid = 0;
    Object.entries(paidByPerson).forEach(([friendId, amount]) => {
        if (amount > maxPaid) {
            maxPaid = amount;
            topPayer = friendId;
        }
    });

    return {
        totalSpent,
        byCategory,
        paidByPerson,
        topPayer,
        topPayerAmount: maxPaid,
        expenseCount: expenses.length,
        averageExpense: expenses.length > 0 ? totalSpent / expenses.length : 0
    };
}

/**
 * Format currency amount
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.abs(amount));
}

/**
 * Generate unique ID
 * @returns {string}
 */
export function generateId() {
    return `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
