import React from 'react'
import './index.css';

export default function SideBar() {
    
    const isSelected = (selected) => {
        const link = window.location.pathname;
        return link.includes(selected) ? 'link link-selected' : 'link'
    }

    return (
        <div className='container-links'>
            <a className={isSelected('frequency')} href='/frequency'>Método 1</a>
            <a className={isSelected('sentences')} href='/sentences'>Método 2</a>
            <a className={isSelected('tops')} href='/tops'>Método 3</a>
        </div>
    )
}
