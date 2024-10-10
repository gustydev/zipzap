import useAuth from "../../hooks/useAuth"

export default function Home() {
    const auth = useAuth();

    return (
        <div>Welcome back {auth.user.displayName}!</div>
    )
}