import useAuth from "../../hooks/useAuth"

export default function Home() {
    const auth = useAuth();

    return (
        <div>Welcome back {auth.user.displayName}! <button onClick={auth.logOut}>LOG OUT</button></div>
    )
}