import { Link } from "react-router-dom"

export default function UserLink( {userData} ) {
    return (
        <li>
            <Link to={`/user/${userData._id}`}>
                <span className={userData.status === 'Online' ? 'online' : 'offline'}>
                    <span style={{fontWeight: 'bold'}}>{userData.displayName}</span> (@{userData.username})
                </span>
            </Link>
        </li>
    )
}