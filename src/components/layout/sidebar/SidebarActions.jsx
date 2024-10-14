export default function SidebarActions( {setTab, auth} ) {
    return (
        <>
        <button onClick={auth.logOut} style={{position: 'absolute', right: 5, top: 5}}>Log out</button>
        <div className='tabSelector'>
            <button onClick={() => {setTab('chat')}}>Chats</button>
            <button onClick={() => {setTab('user')}}>Users</button>
        </div>
        </>
    )
}