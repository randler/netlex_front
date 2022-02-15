import './App.css';
import splash from './assets/images/unsplash_m_7p45JfXQo.png';
import Login from './containers/login';

import { Routes, Route } from "react-router-dom";
import React from 'react';
import { AuthContext, AuthProvider, useAuth } from './providers/auth';
import Error404 from './containers/pageError/error404';
import Error401 from './containers/pageError/error401';
import Frequency from './containers/words/frequency';
import Sentences from './containers/words/sentences';
import Tops from './containers/words/tops';


function App() {
  const {token} = useAuth();

  function PrivateRouter() {
    return (
        <Routes>
          <Route path="/" index element={<Frequency />} />
          <Route path="frequency" exact element={<Frequency />} />
          <Route path="sentences" exact element={<Sentences />} />
          <Route path="tops" exact element={<Tops />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    );
  }

  function PublicRouter() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error401 />} />
      </Routes>
    );
  }
  
  return (
    <div 
      className="App" 
      style={{
        backgroundImage: `url(${splash})`,
        backgroundSize: 'cover'
      }}>
        <div className="container-body">
            {localStorage.getItem('token') || token ? <PrivateRouter /> : <PublicRouter />}
        </div>


    </div>
  );
}

export default App;
