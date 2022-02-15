import axios from 'axios';
import React from 'react'
import SideBar from '../../../components/sidebar';
import { useAuth } from '../../../providers/auth';
import './index.css';
import parse from 'html-react-parser';

export default function Tops() {

    const {token} = useAuth();
    const [minWordLength, setMinWordLength] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState('');
    const [listResponse, setListResponse] = React.useState('');
    const [token_, setToken_] = React.useState(localStorage.getItem('token') || token);

    const searchTops = async () => {
        setError(null);
        if(count<= 0 || minWordLength<= 0) {
            setError('Por favor, informe uma quantidade e o mínimo de palavras para buscar');
            return;
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_}`
        }

        const data = {
            count: count,
            minWordLength: minWordLength
        }

        await axios.post('http://localhost:3086/documents/top-words', 
            data,
            {headers: headers}
            ).then(response => {
                console.log(response.data);
                const array = response.data;
                const total = array.length;
                if(total > 0) {
                    let list = '';
                    array.map(item => {
                        list += `<p className="list">${item.name} - <b>${item.count}</b> ${item.count > 1 ? 'ocorrências' : 'ocorrência' } no texto.</p>`;
                    })
                    setListResponse(list);
                }
            }).catch((err) => {
                const {status} = err.response;
                if(status === 401) {
                    setToken_('');
                    localStorage.removeItem('token');
                    window.location.reload();
                }
            });
    }

    const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
    }


  return (
    <div className='container-words'>
        <SideBar />
        <div className='container-body-words'>
            <div className='container-title'>
                <h1>Método 2</h1>
            </div>
            <div className='container-text'>
                <div className='container-row'>
                    <label className='label'>Count</label>
                    <select
                        onChange={(e) => setCount(e.target.value)} 
                        className={error ? 'select-words select-error' : 'select-words'} >
                        {range(0,12).map(item => {
                            return <option value={item}>{item}</option>
                        })}
                    </select>
                </div>
                <div className='container-row'>
                    <label className='label'>Minimum Word Length</label>
                    <select
                        onChange={(e) => setMinWordLength(e.target.value)} 
                        className={error ? 'select-words select-error' : 'select-words'}>
                        {range(0,12).map(item => {
                            return <option value={item}>{item}</option>
                        })}
                    </select>
                </div>
                {error && (<p className='error-text'>{error}</p>)}
            </div>
            <div className="container-button">
                <button onClick={searchTops} className='button'>Verificar</button>
            </div>
            <div className="container-response">
                {parse(listResponse)}
            </div>
        </div>
    </div>
  )
}
