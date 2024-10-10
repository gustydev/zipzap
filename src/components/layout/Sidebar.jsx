import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { API_URL, apiRequest } from "../../utils/api";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const auth = useAuth();
    const [tab, setTab] = useState('chat');
    const [data, setData] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            try {
                const data = await apiRequest(`${API_URL}/${tab}/list`)
                setData(data);
            } catch (error) {
                console.error(error)
            }
        }

        if (!ignore) fetchData()

        return () => {
            ignore = true;
        }
    }, [tab])

    console.log(data)

    return (
        <div className="sidebar" style={{position: 'relative', padding: '12px'}}>
            <button onClick={auth.logOut} style={{position: 'absolute', right: 5, top: 5}}>Log out</button>
            <div className='userInfo'>
                <img 
                // placeholder, later replace with avatar url or a generic blank image if not set
                src="https://i.redd.it/msn-avatars-of-all-colors-v0-wpe4viwd5uha1.png?width=640&crop=smart&auto=webp&s=c26cede93da27fd95f2087b942635f8efb62fd47" 
                alt={`${auth.user.username}'s profile picture`}
                style={{width: '25px'}}
                />
                <div>{auth.user.displayName}</div>
                <div>@{auth.user.username}</div>
            </div>
            <div className='tabSelector'>
                <button onClick={() => {setTab('chat')}}>Chats</button>
                <button onClick={() => {setTab('user')}}>Users</button>
            </div>
            <div className='tab'>
                <h2 style={{textTransform: 'capitalize'}}>{tab + 's'}</h2>
                <ul>
                    {data.map((d) => {
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