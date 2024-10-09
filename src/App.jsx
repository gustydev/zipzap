import './App.css'
import AuthProvider from './hooks/AuthProvider.jsx'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <header>
        <h1>
          Messenger 
        </h1>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
      <ToastContainer position='bottom-left' autoClose={1000}/>
    </AuthProvider>
  )
}

export default App
