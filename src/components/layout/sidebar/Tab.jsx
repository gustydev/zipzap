import { Link } from "react-router-dom"

export default function Tab( {tab, tabData} ) {
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
                    <li key={d._id}>
                        <Link to={`/${tab}/${d._id}`}>
                            {tab === 'chat' ? d.title : (
                                <span className={d.status === 'Online' ? 'online' : 'offline'}>
                                    <span style={{fontWeight: 'bold'}}>{d.displayName}</span> (@{d.username})
                                </span>
                            )}
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}