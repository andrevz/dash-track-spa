import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import EditUser from './EditUser';
import NewUser from './NewUser';
import UserListItem from './UserListItem';

function UserList({ users, query, onQueryChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const [isEditUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function userCreatedHandler(success) {
    if (success) {
      closeModal();
    }
  }

  function userSelectedHandler(user) {
    setSelectedUser({...user});
    openUserEditor();
  }

  function openUserEditor() {
    setEditUserOpen(true);
  }

  function closeUserEditor() {
    setEditUserOpen(false);
  }

  function sortUsers() {
    const byBikeNumberAscending = (a, b) => a.bikeNumber > b.bikeNumber ? 1 : -1;

    const onFrequencyUsers = users.filter(u => u.onFrequency).sort(byBikeNumberAscending);
    const withoutFrequency = users.filter(u => !u.onFrequency).sort(byBikeNumberAscending);
    const freeUsers = onFrequencyUsers.filter(u => u.status === 0).sort(byBikeNumberAscending);
    const busyUsers = onFrequencyUsers.filter(u => u.status === 1).sort(byBikeNumberAscending);
  
    return [...freeUsers, ...busyUsers, ...withoutFrequency];
  }

  const sortedUsers = sortUsers();
  const userCards = sortedUsers.map((user) => <UserListItem key={user.id} user={user} onUserSelected={userSelectedHandler} />);

  return (
    <>
      <div className='basis-1/4 shrink-0 min-w-[400px]'>
        <div className='flex justify-between p-5 mb-3 shadow-sm sticky top-0 z-10 bg-white'>
          <form className='flex grow'>
            <input
              type='search'
              placeholder='Buscar'
              value={query}
              onChange={onQueryChange}
              className='block grow border rounded-md px-3 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mr-4 sm:text-sm'
            />
          </form>
          <button 
            type='button'
            onClick={openModal}
            className='uppercase text-sm text-white tracking-wide px-4 rounded-md border border-transparent bg-green-600'
          >
            Nuevo
          </button>
        </div>
        <div className='px-5 pb-5 space-y-3 h-[calc(100vh-142px)] overflow-y-auto'>{userCards}</div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-bold leading-6 mb-4 pb-4 border-b text-gray-900"
                >
                  Usuario Nuevo
                </Dialog.Title>
                <NewUser closeModal={closeModal} userCreatedHander={userCreatedHandler} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isEditUserOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeUserEditor}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl text-center font-bold leading-6 mb-4 pb-4 border-b text-gray-900"
                >
                  Editar Usuario
                </Dialog.Title>
                <EditUser selectedUser={selectedUser} onClose={closeUserEditor} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default UserList;
