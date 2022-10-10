import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      singInUserAsync();
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  async function singInUserAsync() {
    try {
      setLoading(true);
      await signIn(username, password);
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ height: '100vh' }} className='w-full flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-[600px] p-5 space-y-8 bg-white shadow sm:rounded-md'>
        <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>Dash Delivery</h2>
        <form method='post' onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div>
            <label htmlFor='username' className='block text-md font-medium text-gray-700'>
              Usuario o correo
            </label>
            <input
              name='username'
              type='email'
              value={username}
              onChange={handleUsernameChange}
              className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-md font-medium text-gray-700'>
              Contraseña
            </label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='group relative uppercase tracking-wider flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
              <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
            </span>
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
