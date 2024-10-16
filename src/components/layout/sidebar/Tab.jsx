import ChatLink from "./ChatLink";
import UserLink from "./UserLink";

export default function Tab( {tab, tabData, user} ) {
    const data = [...tabData];
    if (tab === 'user') {
        data.sort((a, b) => {
            if (a.status === 'Online' && b.status === 'Offline') return -1; // a comes before b
            if (a.status === 'Offline' && b.status === 'Online') return 1; // b comes before a
            return 0; // if both are the same, maintain their order
        })
    }

    return (
        <div className='tab'>
            <h2 style={{textTransform: 'capitalize'}}>{tab + 's'}</h2>
            <ul>
                {data.map((d) => {
                    return (
                        tab === 'chat' ? <ChatLink key={d._id} user={user} chat={d} />: <UserLink key={d._id} userData={d}/>
                    )
                })}
            </ul>
        </div>
    )
}