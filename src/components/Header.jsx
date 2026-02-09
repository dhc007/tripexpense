import { formatCurrency } from '../utils/splitCalculator';
import './Header.css';

function Header({ tripInfo, totalSpent, onShowFriends, selectedUser, onChangeUser, viewOnly }) {
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

                        {/* User badge - clickable to change user */}
                        {selectedUser && selectedUser.id !== 'guest' && (
                            <button
                                className="user-badge"
                                onClick={onChangeUser}
                                title="Click to switch user"
                            >
                                <span className={`user-badge-avatar ${selectedUser.color}`}>
                                    {selectedUser.name.charAt(0)}
                                </span>
                                <span className="user-badge-name">{selectedUser.name}</span>
                            </button>
                        )}

                        {/* Guest badge */}
                        {selectedUser && selectedUser.id === 'guest' && (
                            <button
                                className="user-badge guest"
                                onClick={onChangeUser}
                                title="Click to select your name"
                            >
                                <span className="user-badge-avatar guest">👤</span>
                                <span className="user-badge-name">Guest</span>
                            </button>
                        )}

                        {/* Friends button - only show when not VIEW_ONLY */}
                        {!viewOnly && onShowFriends && (
                            <button
                                className="btn-icon friends-btn"
                                onClick={onShowFriends}
                                title="Manage Friends"
                            >
                                👥
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
