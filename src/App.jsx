import './App.css';
import { useContext } from 'react';
import { AuthContext } from './context/authContext.jsx'; // Import AuthContext

function App() {
  const { user } = useContext(AuthContext); // Access user from context

  return (
    <div className='px-10 bg-amber-400'>
      <h1 className='text-3xl text-blue-100'>
        {user ? `Hello, ${user.user_name}` : 'Hello, Guest'}
        <br />
          {user ? `money, ${user.wallet_cash}` : 'money'}
      </h1>
    </div>
  );
}

export default App;