import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData/useData";

export default function Sidebar( {socket} ) {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const { data: tabData } = useData(`${tab}/list`);
    const { data: user, setData: setUser } = useData(`user/${auth.user._id}`);

    useEffect(() => {
        socket.on('updateProfile', (data) => {
            setUser(data.user);
        })

        return () => {
            socket.off('updateProfile')
        }
    }, [socket, setUser])   

    if (!tabData || !user) return 'Loading data...'

    return (
        <div className="sidebar" style={{position: 'relative', padding: '12px'}}>
            <button onClick={auth.logOut} style={{position: 'absolute', right: 5, top: 5}}>Log out</button>
            <div className='userInfo'>
                {user.profilePicUrl && (<img 
                src={user.profilePicUrl} 
                alt={`${user.username}'s profile picture`}
                style={{width: '25px'}}
                />)}
                <div>{user.displayName}</div>
                <div><Link to={`/user/${user._id}`}>@{user.username}</Link></div>
            </div>
            <div className='tabSelector'>
                <button onClick={() => {setTab('chat')}}>Chats</button>
                <button onClick={() => {setTab('user')}}>Users</button>
            </div>
            <div className='tab'>
                <h2 style={{textTransform: 'capitalize'}}>{tab + 's'}</h2>
                <ul>
                    {tabData.map((d) => {
                       return (
                        <li key={d._id}>
                            <Link to={`/${tab}/${d._id}`}>{tab === 'chat' ? d.title : d.displayName}</Link>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}