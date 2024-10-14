import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { useData } from "../../../hooks/useData/useData";
import Tab from "./Tab";

export default function Sidebar( {socket} ) {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const { data: tabData } = useData(`${tab}/list`);
    const { data: user, setData: setUser } = useData(`user/${auth.user._id}`);

    useEffect(() => {
        socket.on('updateProfile', (data) => {
            if (data.user._id === auth.user._id) {
                setUser(data.user);
            }
        })

        return () => {
            socket.off('updateProfile')
        }
    }, [socket, setUser, auth.user._id])   

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
            <Tab tab={tab} tabData={tabData} />
        </div>
    )
}