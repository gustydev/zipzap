export default function getDMRecipient(membersArray, user) {
    return membersArray.find((m) => m.member._id !== user._id).member.displayName
}