import { formatCurrency } from '../utils/splitCalculator';
import './Dashboard.css';

function Dashboard({ friends, balances, stats, categories }) {
    // Sort friends by balance for display
    const sortedFriends = [...friends].sort((a, b) => balances[b.id] - balances[a.id]);

    // Get category data for chart
    const categoryData = categories
        .filter(cat => stats.byCategory[cat.id] > 0)
        .map(cat => ({
            ...cat,
            amount: stats.byCategory[cat.id] || 0,
            percentage: ((stats.byCategory[cat.id] || 0) / stats.totalSpent) * 100
        }))
        .sort((a, b) => b.amount - a.amount);

    const topPayer = friends.find(f => f.id === stats.topPayer);

    return (
        <div className="dashboard">
            {/* Quick Stats Row */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <span className="stat-value">{formatCurrency(stats.totalSpent)}</span>
                        <span className="stat-label">Total Trip Cost</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.expenseCount}</span>
                        <span className="stat-label">Expenses</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👑</div>
                    <div className="stat-content">
                        <span className="stat-value">{topPayer?.name || '-'}</span>
                        <span className="stat-label">Top Payer ({formatCurrency(stats.topPayerAmount)})</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <span className="stat-value">{formatCurrency(stats.averageExpense)}</span>
                        <span className="stat-label">Avg per Expense</span>
                    </div>
                </div>
            </div>

            {/* Balance Cards */}
            <section className="section">
                <h2 className="section-title">Individual Balances</h2>
                <p className="section-subtitle">Who's owed money vs who owes money</p>

                <div className="balance-grid">
                    {sortedFriends.map((friend, index) => {
                        const balance = balances[friend.id];
                        const isPositive = balance >= 0;
                        const paidAmount = stats.paidByPerson[friend.id] || 0;

                        return (
                            <div
                                key={friend.id}
                                className={`balance-card ${isPositive ? 'positive' : 'negative'}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="balance-header">
                                    <div className={`avatar ${friend.color}`}>
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div className="balance-name">
                                        <span className="name">{friend.name}</span>
                                        <span className="days">{friend.daysPresent} days</span>
                                    </div>
                                </div>

                                <div className="balance-amount">
                                    <span className={`amount ${isPositive ? 'amount-positive' : 'amount-negative'}`}>
                                        {isPositive ? '+' : ''}{formatCurrency(balance)}
                                    </span>
                                    <span className="balance-status">
                                        {isPositive ? 'gets back' : 'owes'}
                                    </span>
                                </div>

                                <div className="balance-footer">
                                    <span className="paid-label">Paid</span>
                                    <span className="paid-amount">{formatCurrency(paidAmount)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Category Breakdown */}
            <section className="section">
                <h2 className="section-title">Spending by Category</h2>
                <p className="section-subtitle">Where the money went</p>

                <div className="category-chart">
                    {categoryData.map((cat, index) => (
                        <div
                            key={cat.id}
                            className="category-bar"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="category-info">
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-name">{cat.name}</span>
                                <span className="category-amount">{formatCurrency(cat.amount)}</span>
                            </div>
                            <div className="bar-track">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${cat.percentage}%`,
                                        backgroundColor: cat.color
                                    }}
                                />
                            </div>
                            <span className="category-percent">{cat.percentage.toFixed(0)}%</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
