/**
 * 
 * Creación de un componente en React.
 * 
 */
import {
  FC,
  useState,
  useCallback,
  useEffect,
} from 'react';

type User = {
  id: number;
  name: string;
}

// ! DON'T DO IT WITH JAVASCRIPT
type AppProps = object & {
  title?: string;
};

const App: FC<AppProps> = (props) => {
  const [counter, setCounter,] = useState<number>(0);
  const [users, setUsers,] = useState<Array<User>>([]);

  // Traer datos con boton
  const fetchBackendData = async () => {
    const url = `http://localhost:3005/users`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();

    console.log('data', data);
    const {
      users
    } = data;

    setUsers(users);
  };

  const getAllUsers = useCallback(async () => {
    const url = 'http://localhost:3005/users';
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();
    return data.users ?? [];
  }, []);

  const handleDecrement: () => void = () => {
    setCounter((previousCounter) => previousCounter - 1);
  };

  const handleIncrement: () => void = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getAllUsers()
        .then(setUsers)
        .catch(err => console.error(err));
    }

    return () => {
      isSubscribed = false;
    };
  }, [getAllUsers,]);

  return (
    <main className='flex flex-col gap-y-4 p-6'>
      {props.title && (
        <h1 className='text-2xl text-red-500'>
          {props.title}
        </h1>
      )}
      <div className='flex items-center gap-x-4'>
        <button onClick={handleDecrement}>
          -
        </button>
        <span id='counter'>
          {counter}
        </span>
        <button onClick={handleIncrement}>
          +
        </button>
      </div>
      <div>
        <button onClick={fetchBackendData}>
          Conectar con backend
        </button>
      </div>
      {users && users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.id} - {user.name}
            </li>
          ))}
        </ul>
      )}
      {!users || users.length === 0 && (
        <span>No hay usuarios</span>
      )}
    </main>
  );
};

export default App;