import './App.css'
import AuthProvider from './hooks/useAuth/AuthProvider.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Topbar from './components/layout/Topbar.jsx';

function App() {
  const location = useLocation();
  const isNotAuthPage = !['/login', '/register'].includes(location.pathname);  

  return (
    <AuthProvider>
      <header>
        <Topbar/>
      </header>
      <main className={isNotAuthPage ? 'mainLayout' : ''}>
        <Outlet/>
      </main>
      <footer></footer>
      <ToastContainer position='bottom-left' autoClose={5000}/>
    </AuthProvider>
  )
}

export default App
