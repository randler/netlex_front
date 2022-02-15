import React, { useEffect } from 'react'
import './index.css';

export default function Alert({message, show, type, setShowAlert}) {
  
  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  },[setShowAlert]);

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return '#4BB543';
      case 'danger':
        return '#FF0000';
      default:
        return '#FFFFFF';
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return '#FFFFFF';
      case 'danger':
        return '#FFFFFF';
      default:
        return '#000000';
    }
  }

  return (
    <div
      style={{backgroundColor: getTypeColor(), color: getTextColor()}} 
      className={`container-alert ${show ? 'show' : 'hide'}`} >
        <div className='body-alert'>{message}</div>
        <div onClick={() => setShowAlert(false)} className='close-alert'>x</div>
    </div>
  )
}
