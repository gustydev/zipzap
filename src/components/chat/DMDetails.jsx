import getDMRecipient from "../../utils/getDMRecipient";

export default function DMDetails({chat, auth}) {
    return (() => {
        const recipient = getDMRecipient(chat.members, auth.user);
        return (
            <>
                {recipient.profilePicUrl && (
                    <img 
                        src={recipient.profilePicUrl} 
                        alt={`${recipient.username}'s profile picture`}
                        className='userImage'
                        style={{width: '50px'}} 
                    />
                )}
                <h2 style={{margin: 0}}>{recipient.displayName}</h2>
            </>
        );
    })()
}