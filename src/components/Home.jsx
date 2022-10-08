import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import Map from './Map';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase';

function Home() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubs = onSnapshot(collection(firestore, 'users'), (snapshot) => {
      if (!snapshot.empty) {
        const users = snapshot.docs.map((documentData) => {
          return { id: documentData.id, ...documentData.data() };
        });

        setUsers(users);
      }
    });

    return () => {
      if (unsubs) unsubs();
    };
  }, []);

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
