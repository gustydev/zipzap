import useAuth from "../../hooks/useAuth/useAuth";

export default function Sidebar() {
    const auth = useAuth();

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
            <div className='tabs'>
                <button>Chats</button>
                <button>Users</button>
            </div>
            <div>
                tab display is here
            </div>
        </div>
    )
}