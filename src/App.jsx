import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './navigation/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App
