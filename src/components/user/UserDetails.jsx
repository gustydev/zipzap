export default function UserDetails( {user} ) {
    return (
        <div className='details'>
            {user.profilePicUrl && <img src={user.profilePicUrl} alt={user.username + "'s profile picture"} />}
            <h2>{user.displayName}</h2>
            <p>@{user.username}</p>
            <p>Member since {new Date(user.joined).toLocaleDateString()}</p>
            <p>Currently {user.status}</p>
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