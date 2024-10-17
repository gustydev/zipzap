export default function SidebarActions( {setTab, auth, tab} ) {
    return (
        <>
        <button onClick={auth.logOut} style={{position: 'absolute', right: 5, top: 5}} className="btn btn-outline-secondary">Log out</button>
        <div className='btn-group'>
            <button className={'btn btn-outline-primary' + (tab === 'chat' ? ' active' : '')} onClick={() => {setTab('chat')}}>
                Chats
            </button>
            <button className={'btn btn-outline-primary' + (tab === 'user' ? ' active' : '')} onClick={() => {setTab('user')}}>
                Users
            </button>
        </div>
        </>
    )
}