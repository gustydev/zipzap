export default function Message( {msg} ) {
    return (
        <div className='message'>
            <div style={{display: 'flex', gap: '4px', width: '100%'}}>
                {msg.postedBy.profilePicUrl && (
                    <img className='userImage' style={{width: '25px'}} src={msg.postedBy.profilePicUrl} alt={msg.postedBy.username + "'s profile picture"} />
                )}
                <span style={{fontWeight: 500}}>{msg.postedBy.displayName}</span>
                <span>{new Date(msg.postDate).toLocaleString()}</span>
            </div>
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