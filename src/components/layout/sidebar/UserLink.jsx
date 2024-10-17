import { Link } from "react-router-dom"

export default function UserLink( {userData} ) {
    return (
        <li className='list-group-item'>
            <Link to={`/user/${userData._id}`} className='link-underline link-underline-opacity-0'>
                <span className={userData.status === 'Online' ? 'online' : 'offline'}>
                    <span style={{fontWeight: 'bold'}}>{userData.displayName}</span> (@{userData.username})
                </span>
            </Link>
        </li>
    )
}