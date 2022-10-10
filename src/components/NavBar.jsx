import { ArrowRightOnRectangleIcon, BellIcon } from '@heroicons/react/24/outline';

function NavBar({...props}) {
  return (
    <header className='sticky top-0 z-50 bg-gray-800 mx-auto px-2 sm:px-6 lg:px-8'>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
          <div className='flex flex-shrink-0 items-center'>
            <img
              className='block h-8 w-auto lg:hidden'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Dash Delivery'
            />
            <img
              className='hidden h-8 w-auto lg:block'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Dash Delivery'
            />
          </div>

          <div className='hidden sm:ml-6 sm:block'>
            <div className='flex space-x-4'>
              <a href='/' className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'>
                Dash Delivery
              </a>
            </div>
          </div>
        </div>

        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-5'>
          <button
            type='button'
            onClick={props.handleSignOut}
            className='rounded-full inline-flex bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          >
            <span>Salir</span>
            <ArrowRightOnRectangleIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
