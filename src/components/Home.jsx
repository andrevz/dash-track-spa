import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import Map from './Map';

function Home() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {}
  }

  function filterUsers() {
    let filtered = [...users];
    if (!query) {
      return filtered;
    }

    if (+query > 0) {
      filtered = filtered.filter(u => u.bikeNumber.toString().startsWith(query));
    }

    if (query === 'ocu') {
      filtered = filtered.filter(u => u.status === 1 && u.onFrequency);
    } else if (query === 'lib') {
      filtered = filtered.filter(u => u.status === 0 && u.onFrequency);
    } else if (query.length >= 3) {
      filtered = filtered.filter(u => u.fullName.toLowerCase().includes(query));
    }

    return filtered;
  }

  const filteredUsers = filterUsers();

  return (
    <div className='h-screen w-screen'>
      <NavBar handleSignOut={handleSignOut} />
      <section className='flex fixed top-auto h-full w-full'>
        <Map users={filteredUsers} />
      </section>
    </div>
  );
}

export default Home;
