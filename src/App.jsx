import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './navigation/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

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
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </AuthProvider>
  );
}

export default App
