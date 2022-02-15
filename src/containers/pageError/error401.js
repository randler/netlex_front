import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';

import './index.css';

function Error401() {
  return (
    <div className='container-error'>
        <h1 className='error-title'>Oops!</h1>
        <p className='error-subtitle'>Você não pode acessar</p>
        <NavLink to="/" replace >Voltar</NavLink>
    </div>
  );
}

export default Error401;