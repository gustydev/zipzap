import './App.css'
import AuthProvider from './hooks/AuthProvider.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Topbar from './components/layout/Topbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';

function App() {
  const location = useLocation();
  const isLoggedIn = !['/login', '/register'].includes(location.pathname);

  return (
    <AuthProvider>
      <header>
        <Topbar/>
      </header>
      <main className={isLoggedIn && 'mainLoggedIn'}>
        {isLoggedIn && <Sidebar/>}
        <Outlet/>
      </main>
      <footer></footer>
      <ToastContainer position='bottom-left' autoClose={5000}/>
    </AuthProvider>
  )
}

export default App
