export default function UserDetails( {user} ) {
    return (
        <div className='userDetails'>
            {user.profilePicUrl && <img style={{width: '250px'}}src={user.profilePicUrl} alt={user.username + "'s profile picture"} />}
            <h2>{user.displayName}</h2>
            <p>@{user.username}</p>
            {!user.demo && (
                <>
                <p>Member since {new Date(user.joined).toLocaleString()}</p>
                {user.status === 'Offline' && user.lastSeen && <p>Last seen {new Date(user.lastSeen).toLocaleString()}</p>}
                <p>
                    Currently <span className={user.status === 'Online' ? 'online' : 'offline'}>{user.status}</span>
                </p>
                </>
            )}
            {user.bio && (
                <div style={{whiteSpace: 'pre-wrap'}}>
                    <h3>Bio:</h3>
                    <div>
                        {user.bio}
                    </div>
                </div>
            )}
        </div>
    )
}