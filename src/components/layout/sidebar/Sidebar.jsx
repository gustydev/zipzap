import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useData } from "../../../hooks/useData/useData";
import Tab from "./Tab";
import UserInfo from "./UserInfo";
import SidebarActions from "./SidebarActions";
import NewChat from "./NewChat";
import Loading from "../../loading/Loading";
import FetchError from '../../error/FetchError';

export default function Sidebar( {socket} ) {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const [newFormActive, setNewFormActive] = useState(false);
    const { data: tabData, loading: loadingTab, error: tabError } = useData(`${tab}/list`);
    const { data: user, setData: setUser, loading: loadingUser, error: userError } = useData(`user/${auth.user._id}`);

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

    if (loadingTab && loadingUser) return <Loading />

    return (
        <div className="sidebar" style={{position: 'relative', padding: '12px'}}>
            {loadingUser ? <Loading /> : userError? <FetchError error={userError}/> : <UserInfo user={user}/>}
            <SidebarActions auth={auth} setTab={setTab} tab={tab}/>
            {loadingTab ? <Loading /> : tabError? <FetchError error={tabError}/> : <Tab tab={tab} tabData={tabData} user={user} />}
            {tab === 'chat' && !auth.user.demo && <NewChat newFormActive={newFormActive} setNewFormActive={setNewFormActive}/>}
        </div>
    )
}