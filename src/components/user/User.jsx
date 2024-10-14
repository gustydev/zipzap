import { useEffect } from "react"
import { useData } from "../../hooks/useData/useData"
import { useOutletContext, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth/useAuth";
import UserDetails from "./UserDetails";
import UserEdit from "./UserEdit";

export default function User() {
    const { userId } = useParams();
    const { data: user, setData: setUser } = useData(`user/${userId}`)
    const auth = useAuth();
    const [socket] = useOutletContext();

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

    if (!user) return 'Loading user details...'

    return (
        <div className='user'>
            <UserDetails user={user} />
            {auth.user._id === user._id && (
                <UserEdit user={user} socket={socket} />
            )}
        </div>    
    )
}