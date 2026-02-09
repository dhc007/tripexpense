import { formatCurrency } from '../utils/splitCalculator';
import './Header.css';

function Header({ tripInfo, totalSpent, onShowFriends }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo">
                            <span className="logo-icon">✨</span>
                            <span className="logo-text">Split It</span>
                        </div>
                        <div className="trip-info">
                            <h1 className="trip-name">{tripInfo.name}</h1>
                            <p className="trip-dates">
                                📍 {tripInfo.location} • Jan 31 - Feb 2, 2026
                            </p>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="total-spent">
                            <span className="total-label">Total Spent</span>
                            <span className="total-amount">{formatCurrency(totalSpent)}</span>
                        </div>
                        <button
                            className="btn-icon friends-btn"
                            onClick={onShowFriends}
                            title="Manage Friends"
                        >
                            👥
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
