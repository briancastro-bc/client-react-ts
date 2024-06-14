/**
 * 
 * Creación de un componente en React.
 * 
 */
import {
  FC,
  useState,
  useEffect,
} from 'react';

const users = [
  {
    id: 1,
    name: 'Lolo',
  },
  {
    id: 2,
    name: 'Ana',
  }
];

// ! DON'T DO IT WITH JAVASCRIPT
// ! NO HAGAS ESTO SI UTILIZAS JAVASCRIPT/JSX
type AppProps = object;

// LifeCycle React, primero se carga todo el código Javascript/Typescript
// ! TERCER PASO, REALIZAR EL RENDER O RE-RENDER 3 VECES.
const App: FC<AppProps> = () => {

  // ! INICIO DEL CICLO DE VIDA - PRIMER PASO, RENDER DE CODIGO.
  const [counter, setCounter,] = useState<number>(0);

  /**
   * 
   * Estructura del hook useState
   * const [valor, functionQueCambiaELValor,] = useState<tipo de dato que almacenamos>('Valor por defecto');
   * 
   */
  const [name, setName,] = useState<string>('Brian');

  const handleDecrement: () => void = () => {
    setCounter((previousCounter) => previousCounter - 1);
  };

  const handleIncrement: () => void = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  const handleChangeName: () => void = () => {
    const newName = name === 'Brian' ? 'Pepe' : 'Brian';
    setName(newName);
  };

  const testFunction = () => {
    for (const user of users) {
      console.log('user', user);
    }
  }

  /**
   * 
   * Ciclo de vida de React
   * React siempre llamara a todos los useEffect al menos una sola vez en el
   * render.
   * 
   * Esto quiere decir, que, si un useEffect no tiene dependencias en el array de dependencias,
   * unicamente se ejecutará una sola vez.
   * 
   */
  // SE EJECUTA UNA VEZ
  useEffect(() => {
    // MOUNT
    console.log('Ejecucion de useEffect No. 1');

    // UNMOUNT
    return () => {
      console.log('Esto se ejecuta cuando se desmonta el componente');
    };
  }, [ 
    // si no tiene nada aca no se va a llamar
  ]);

  // SE EJECUTA CADA QUE SE CAMBIA EL CONTADOR
  useEffect(() => {
    console.log('Ejecucion de useEffect No. 2');
  }, [
    counter, 
    name,
  ]);

  // ! FIN DE PRIMER PASO

  // Una vez se carga todo el codigo Javascript, React renderiza el HTML.
  // ! EL SEGUNDO PASO DEL CICLO DE VIDA, ES CARGA O RENDERIZAR EL HTML
  return (
    <main className='flex flex-col gap-y-4 p-6'>
      <h1 className='text-2xl text-red-500'>
        Hola mundo
      </h1>
      {/* IF EN REACT */}
      {name === 'Brian' ? (
        <p onClick={handleChangeName}>
          {name}
        </p>
        // ELSE
      ) : 
        <span onClick={testFunction}>El nombre no es Brian</span>
      }
      <div className='flex items-center gap-x-4'>
        <button onClick={handleDecrement}>
          -
        </button>
        <span id='counter'>
          {/* COUNTER = 0 o es 1 */}
          {/* 
            Opcion 1. El counter es 0 - Tomas, Juan David, Elias, Alfredo, David
            Opcion 2. El counter es 1 - Andres
          */}
          {counter}
        </span>
        <button onClick={handleIncrement}>
          +
        </button>
      </div>
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    </main>
  );
  // ! FIN DEL SEGUNDO PASO.
};

export default App;