import './App.css'
import AuthProvider from './hooks/AuthProvider.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      ay
      <Outlet />
    </AuthProvider>
  )
}

export default App
