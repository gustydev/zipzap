export default function Message( {msg} ) {
    return (
        <div className='message'>
            {msg.postedBy.displayName + ': ' + msg.content}
            {msg.attachment && (
                msg.attachment.type.startsWith('image') ? 
                    <img 
                      src={msg.attachment.url} 
                      alt={'attachment posted by ' + msg.postedBy.username} 
                      style={{width: '50px'}}
                    /> : 
                    <a href={msg.attachment.url}>
                        Attachment ({msg.attachment.type})
                    </a>
            )}
        </div>
    )
}