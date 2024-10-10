import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const auth = useAuth();

    return (
        <div className="sidebar">
            <button onClick={auth.logOut}>Log out</button>
        </div>
    )
}