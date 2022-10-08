import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
