import axios from 'axios';
import React from 'react'
import SideBar from '../../../components/sidebar';
import { useAuth } from '../../../providers/auth';
import './index.css';
import parse from 'html-react-parser';

export default function Sentences() {

    const {token} = useAuth();
    const [search, setSearch] = React.useState('');
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState('');
    const [listResponse, setListResponse] = React.useState('');
    const [token_, setToken_] = React.useState(localStorage.getItem('token') || token);

    const searchSentences = async () => {
        setError(null);
        if(search.length < 2) {
            setError('Por favor, informe uma palavra para buscar');
            return;
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_}`
        }

        const data = {
            word: search
        }

        await axios.post('http://localhost:3086/documents/word-sentences', 
            data,
            {headers: headers}
            ).then(response => {
                const array = response.data;
                const total = array.length;
                if(total > 0) {
                    setResponse(`<p>A palavra <b>${search}</b> foi encontrada em ${total} frases no texto</p>`);
                    var list = '<ol className="order-list">';
                    array.map(item => {
                        list += `<li className="list">${item}</li>`;
                    })
                    list += '</ol>';
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
  return (
    <div className='container-words'>
        <SideBar />
        <div className='container-body-words'>
            <div className='container-title'>
                <h1>M??todo 2</h1>
            </div>
            <div className='container-text-column'>
                <label className='label'>Digite uma palavra</label>
                <input
                    onChange={(e) => setSearch(e.target.value)} 
                    className={error ? 'input-words input-error' : 'input-words'}
                    type='text' 
                    placeholder='Digite uma palavra' />
                {error && (<p className='error-text'>{error}</p>)}
            </div>
            <div className="container-button">
                <button onClick={searchSentences} className='button'>Verificar</button>
            </div>
            <div className="container-response">
                {parse(response)}
                {parse(listResponse)}
            </div>
        </div>
    </div>
  )
}
