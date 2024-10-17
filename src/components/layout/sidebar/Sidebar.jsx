import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useData } from "../../../hooks/useData/useData";
import Tab from "./Tab";
import UserInfo from "./UserInfo";
import SidebarActions from "./SidebarActions";
import NewChat from "./NewChat";
import Loading from "../../loading/Loading";

export default function Sidebar( {socket} ) {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const [newFormActive, setNewFormActive] = useState(false);
    const { data: tabData, loading: loadingTab } = useData(`${tab}/list`);
    const { data: user, setData: setUser, loading: loadingUser } = useData(`user/${auth.user._id}`);

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
            {loadingUser ? <Loading /> : <UserInfo user={user}/>}
            <SidebarActions auth={auth} setTab={setTab} tab={tab}/>
            {loadingTab ? <Loading /> : <Tab tab={tab} tabData={tabData} user={user} />}
            {tab === 'chat' && <NewChat newFormActive={newFormActive} setNewFormActive={setNewFormActive}/>}
        </div>
    )
}