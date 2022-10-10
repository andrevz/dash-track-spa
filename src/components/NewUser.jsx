import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../config/firebase";

function NewUser({ closeModal, userCreatedHander }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bikeNumber, setBikeNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onCreateClick() {
    if (!email || !name || !bikeNumber || !password) {
      return;
    }

    setLoading(true);

    const newUser = {
      fullName: name,
      onFrequency: false,
      status: 0,
      bikeNumber
    };

    let success = false;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, `/users/${user.uid}`), newUser);
      success = true;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    userCreatedHander(success);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onBikeNumberChange(e) {
    setBikeNumber(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <form className='space-y-6 px-4 pb-2'>
      <div>
        <label htmlFor='email' className='block text-md font-medium text-gray-700'>
          Correo
        </label>
        <input
          name='email'
          type='email'
          value={email}
          onChange={onEmailChange}
          className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          required
        />
      </div>
      <div>
        <label htmlFor='username' className='block text-md font-medium text-gray-700'>
          Nombre Completo
        </label>
        <input
          name='username'
          type='text'
          value={name}
          onChange={onNameChange}
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
          onChange={onBikeNumberChange}
          className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
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
          onChange={onPasswordChange}
          className='block w-full px-3 py-2 mt-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type='button'
          onClick={closeModal}
          className='uppercase text-sm text-white tracking-wide w-28 px-4 py-2 rounded-md border border-transparent bg-gray-500'
        >
          Cancelar
        </button>
        <button
          type='button'
          onClick={onCreateClick}
          disabled={loading}
          className='flex justify-center uppercase text-sm text-white tracking-wide w-28 px-4 py-2 ml-2 rounded-md border border-transparent shadow-md bg-indigo-600'>
          {loading
            ? <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
            : <span>Crear</span>}
        </button>
      </div>
    </form>
  );
}

export default NewUser;