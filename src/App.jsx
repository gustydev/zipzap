import './App.css'
import AuthProvider from './hooks/useAuth/AuthProvider.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, Zoom } from 'react-toastify';
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
      <ToastContainer position='top-center' autoClose={5000} closeOnClick={true} transition={Slide}/>
    </AuthProvider>
  )
}

export default App
