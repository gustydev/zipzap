import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useData } from "../../../hooks/useData/useData";
import Tab from "./Tab";
import UserInfo from "./UserInfo";
import SidebarActions from "./SidebarActions";
import NewChat from "./NewChat";

export default function Sidebar( {socket} ) {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const [newFormActive, setNewFormActive] = useState(false);
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
            <UserInfo user={user}/>
            <SidebarActions auth={auth} setTab={setTab} newFormActive={newFormActive} setNewFormActive={setNewFormActive} />
            <Tab tab={tab} tabData={tabData} />
            <NewChat newFormActive={newFormActive} setNewFormActive={setNewFormActive}/>
        </div>
    )
}