import UserListItem from './UserListItem';

function UserList({ users, query, onQueryChange, onCreateClick }) {
  const sortedUsers = sortUsers();
  const userCards = sortedUsers.map((user) => <UserListItem key={user.id} user={user} />);

  function sortUsers() {
    const byBikeNumberAscending = (a, b) => a.bikeNumber > b.bikeNumber ? 1 : -1;

    const onFrequencyUsers = users.filter(u => u.onFrequency).sort(byBikeNumberAscending);
    const withoutFrequency = users.filter(u => !u.onFrequency).sort(byBikeNumberAscending);
    const freeUsers = onFrequencyUsers.filter(u => u.status === 0).sort(byBikeNumberAscending);
    const busyUsers = onFrequencyUsers.filter(u => u.status === 1).sort(byBikeNumberAscending);
  
    return [...freeUsers, ...busyUsers, ...withoutFrequency];
  }

  return (
    <div className='basis-1/4 shrink-0 min-w-[400px]'>
      <div className='flex justify-between p-5 mb-3 shadow-sm sticky top-0 z-10 bg-white'>
        <form className='flex grow'>
          <input
            type='search'
            placeholder='Buscar'
            value={query}
            onChange={onQueryChange}
            className='block grow rounded-md px-3 py-2 shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mr-4 sm:text-sm'
          />
        </form>
        <button 
          type='button'
          onClick={onCreateClick}
          className='uppercase text-sm text-white tracking-wide px-4 rounded-md border border-transparent bg-green-600'
        >
          Nuevo
        </button>
      </div>
      <div className='px-5 space-y-3 h-[calc(100vh-142px)] overflow-y-auto'>{userCards}</div>
    </div>
  );
}

export default UserList;
