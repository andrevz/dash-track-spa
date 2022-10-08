import { AdjustmentsHorizontalIcon, CheckCircleIcon, EllipsisHorizontalCircleIcon, MinusCircleIcon, SignalIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

function UserListItem({ user }) {
  const userStatusIcon = getUserStatusIcon();

  function sendNotification(_event) {
    const data = {
      notification: {
        title: "Dash Delivery",
        body: "Comunícate con la central."
      },
      to: user.token ?? ''
    }

    const response = fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': `key=${process.env.REACT_APP_MESSAGE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    toast.promise(response, {
      pending: 'Enviando...',
      success: 'Notificación enviada',
      error: 'Error al notificar'
    }).catch((error) => console.error(error));
  }

  function getUserStatusIcon() {
    if (!user.onFrequency) {
      return <EllipsisHorizontalCircleIcon className='block h-8 w-8 my-auto mx-0 text-gray-500' />
    }

    return user.status === 0 
      ? <CheckCircleIcon className='block h-8 w-8 my-auto mx-0 text-green-600'/>
      : <MinusCircleIcon className='block h-8 w-8 my-auto mx-0 text-red-600' />;
  }

  return (
    <div className='flex justify-between align-baseline py-4 px-3 rounded-md bg-gray-200'>
      <span className='flex-none flex justify-center'>
        { userStatusIcon }
      </span>
      <div className='grow mx-2'>
        <h3 className='text-xl font-bold text-gray-800'>{'Moto ' + user.bikeNumber}</h3>
        <p className='text-lg mt-1 text-gray-700'>{user.fullName}</p>
      </div>
      <div className='flex-none flex justify-between space-x-3'>
        <button onClick={sendNotification}>
          <SignalIcon className='h-8 w-8 text-gray-600' />
        </button>
        <button>
          <AdjustmentsHorizontalIcon className='h-8 w-8 text-indigo-500' />
        </button>
      </div>
    </div>
  );
}

export default UserListItem;
