import { useState } from 'react';
import './FriendsPanel.css';

function FriendsPanel({ friends, onUpdate, onClose }) {
    const [editedFriends, setEditedFriends] = useState([...friends]);

    const handleNameChange = (friendId, newName) => {
        setEditedFriends(prev =>
            prev.map(f => f.id === friendId ? { ...f, name: newName } : f)
        );
    };

    const handleDaysChange = (friendId, days) => {
        const numDays = parseFloat(days) || 0;
        setEditedFriends(prev =>
            prev.map(f => f.id === friendId ? { ...f, daysPresent: numDays } : f)
        );
    };

    const handleSave = () => {
        onUpdate(editedFriends);
        onClose();
    };

    const hasChanges = JSON.stringify(friends) !== JSON.stringify(editedFriends);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content friends-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>👥 Trip Friends</h2>
                    <button className="btn-icon" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <p className="friends-intro">
                        Edit names and adjust stay duration for accurate splitting.
                        The "days present" affects how expenses marked "By Days" are split.
                    </p>

                    <div className="friends-list">
                        {editedFriends.map((friend, index) => (
                            <div
                                key={friend.id}
                                className="friend-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className={`avatar avatar-lg ${friend.color}`}>
                                    {friend.name.charAt(0)}
                                </div>

                                <div className="friend-fields">
                                    <div className="input-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={friend.name}
                                            onChange={(e) => handleNameChange(friend.id, e.target.value)}
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label>Days Present</label>
                                        <div className="days-input-wrapper">
                                            <input
                                                type="number"
                                                className="input days-input"
                                                value={friend.daysPresent}
                                                onChange={(e) => handleDaysChange(friend.id, e.target.value)}
                                                min="0"
                                                max="10"
                                                step="0.5"
                                            />
                                            <span className="days-suffix">days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="days-help">
                        <h4>📅 Days Reference</h4>
                        <ul>
                            <li><strong>2 days:</strong> Left early morning on Feb 2</li>
                            <li><strong>2.5 days:</strong> Left afternoon on Feb 2</li>
                            <li><strong>3 days:</strong> Left evening on Feb 2 (full trip)</li>
                        </ul>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={!hasChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FriendsPanel;
