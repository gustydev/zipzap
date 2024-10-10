import './App.css'
import AuthProvider from './hooks/AuthProvider.jsx'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Topbar from './components/layout/Topbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';

function App() {
  return (
    <AuthProvider>
      <header>
        <Topbar/>
      </header>
      <main>
        <Sidebar/>
        <Outlet/>
      </main>
      <footer></footer>
      <ToastContainer position='bottom-left' autoClose={5000}/>
    </AuthProvider>
  )
}

export default App
