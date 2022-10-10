import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../config/firebase';

function EditUser({selectedUser, onClose}) {
  const [name, setName] = useState(selectedUser.fullName);
  const [bikeNumber, setBikeNumber] = useState(selectedUser.bikeNumber);
  const [busy, setBusy] = useState(selectedUser.status === 1);
  const [onFrequency, setOnFrequency] = useState(selectedUser.onFrequency);
  const [loading, setLoading] = useState(false);

  async function updateUser() {
    setLoading(true);
    try {
      const userRef = doc(firestore, `users/${selectedUser.id}`);
      await updateDoc(userRef, {
        fullName: name,
        bikeNumber: Number(bikeNumber),
        status: busy ? 1 : 0,
        onFrequency: onFrequency
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return ( 
    <section className='space-y-6 px-4 pb-2'>
      <div>
        <label htmlFor='name' className='block text-md font-medium text-gray-700'>
          Nombre Completo
        </label>
        <input
          name='name'
          type='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          required
        />
      </div>
      <div>
        <label htmlFor='bikeNumber' className='block text-md font-medium text-gray-700'>
          Numero de Moto
        </label>
        <input
          name='bikeNumber'
          type='number'
          value={bikeNumber}
          onChange={(e) => setBikeNumber(e.target.value)}
          className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          required
        />
      </div>
      <div className='flex align-center'>
        <input
          name='frequency'
          type='checkbox'
          checked={onFrequency}
          value={onFrequency}
          className='self-center'
          onChange={(e) => setOnFrequency(e.target.checked)}
          required
        />
        <label htmlFor='frequency' className='block ml-2 text-md font-medium text-gray-700'>
          En Frequencia
        </label>
      </div>
      <div className='flex align-center'>
        <input
          name='status'
          type='checkbox'
          checked={busy}
          value={busy}
          className='self-center'
          onChange={(e) => setBusy(e.target.checked)}
          required
        />
        <label htmlFor='status' className='block ml-2 text-md font-medium text-gray-700'>
          Ocupado
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type='button'
          onClick={onClose}
          className='uppercase text-sm text-white tracking-wide w-28 px-4 py-2 rounded-md border border-transparent bg-gray-500'
        >
          Cancelar
        </button>
        <button
          type='button'
          onClick={updateUser}
          disabled={loading}
          className='flex justify-center uppercase text-sm text-white tracking-wide w-28 px-4 py-2 ml-2 rounded-md border border-transparent shadow-md bg-indigo-600'>
          {loading
            ? <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            : <span>Guardar</span>}
        </button>
      </div>
    </section>
  );
}

export default EditUser;