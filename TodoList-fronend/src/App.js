import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import localStorageService from './services/localStorageService';

const { getRole } = localStorageService

function App() {
  const [ role, setRole ] = useState(getRole())

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole}/>
    </div>
  );
}

export default App;
