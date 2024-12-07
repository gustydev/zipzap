import { Link } from "react-router-dom"

export default function UserLink( {userData} ) {
    const isOnline = userData.status === 'Online';

    return (
        <li className={'list-group-item list-group-item-' + (isOnline ? 'success' : 'danger')}>
            <Link to={`/user/${userData._id}`} className='link-underline link-underline-opacity-0'>
                <span className={isOnline ? 'online' : 'offline'}>
                    <span style={{fontWeight: 'bold'}}>{userData.displayName}</span> (@{userData.username})
                </span>
            </Link>
        </li>
    )
}