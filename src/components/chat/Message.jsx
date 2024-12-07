import { Link } from "react-router-dom"

export default function Message( {msg} ) {
    return (
        <div className='message'>
            <Link to={`/user/${msg.postedBy._id}`} style={{display: 'flex', gap: '4px', width: '100%', color: 'black', textDecoration: 'none'}}>
                {msg.postedBy.profilePicUrl && (
                    <img className='userImage' style={{width: '25px', height: '25px'}} src={msg.postedBy.profilePicUrl} alt={msg.postedBy.username + "'s profile picture"} />
                )}
                <span style={{fontWeight: 500}}>{msg.postedBy.displayName}</span>
                <span>{new Date(msg.postDate).toLocaleString()}</span>
            </Link>
            {msg.attachment && (
                <div>
                {msg.attachment.type.startsWith('image') ? 
                    <img 
                    src={msg.attachment.url} 
                    alt={'attachment posted by ' + msg.postedBy.username} 
                    style={{width: '150px'}}
                    /> : 
                    <a href={msg.attachment.url}>
                        Attachment ({msg.attachment.type})
                    </a>}
                </div>
            )}
            <div>{msg.content}</div>
        </div>
    )
}