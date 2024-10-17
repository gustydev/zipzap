import getDMRecipient from "../../../utils/getDMRecipient"
import { Link } from "react-router-dom"

export default function ChatLink( {chat, user} ) {
    return (
        <li className='list-group-item'>
            <Link to={`/chat/${chat._id}`} className='link-underline link-underline-opacity-0'>
                {chat.members?.find((m) => m.member._id === user._id) || chat.public ? (
                    chat.dm ? getDMRecipient(chat.members, user) : chat.title
                ) : ''}
            </Link>
        </li>
    )
}