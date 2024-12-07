import { Link } from "react-router-dom"

export default function UserInfo( {user} ) {
    return (
        <div className='userInfo'>
            {user.profilePicUrl && (<img 
            src={user.profilePicUrl} 
            alt={`${user.username}'s profile picture`}
            style={{width: '50px', height: '50px'}}
            className='userImage'
            />)}
            <div className='d-grid'>
                {user.displayName}
                <Link to={`/user/${user._id}`} className='link-underline link-underline-opacity-0'>
                    @{user.username}
                </Link>
            </div>
        </div>
    )
}