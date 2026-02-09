import './UserSelector.css';

function UserSelector({ friends, onSelectUser, selectedUser }) {
    return (
        <div className="user-selector-overlay">
            <div className="user-selector-modal">
                <div className="user-selector-header">
                    <span className="user-selector-icon">👋</span>
                    <h2>Welcome to Split It!</h2>
                    <p>Select your name to see your personalized breakdown</p>
                </div>

                <div className="user-selector-grid">
                    {friends.map((friend, index) => (
                        <button
                            key={friend.id}
                            className={`user-card ${selectedUser?.id === friend.id ? 'selected' : ''}`}
                            onClick={() => onSelectUser(friend)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`user-avatar ${friend.color}`}>
                                {friend.name.charAt(0)}
                            </div>
                            <span className="user-name">{friend.name}</span>
                        </button>
                    ))}
                </div>

                <div className="user-selector-footer">
                    <button
                        className="btn btn-ghost"
                        onClick={() => onSelectUser(null)}
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserSelector;
