import React from 'react'
import Alert from '../../components/alert';
import api from '../../services/api';
import './index.css';
import loadingSVG from '../../assets/icons/loading.svg'; 
import axios from 'axios';
import { useAuth } from '../../providers/auth';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('Erro Exemplo');
    const [showAlert, setShowAlert] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('');

  const {setUserLogged, setTokenLogged} = useAuth();

    const validateAndSet = (value, input) => {
        if (value.length > 0) {
            if(input === 'email') {
                setEmail(value);
            } else {
                setPassword(value);
            }
        }
    }

    const redirectToHome = () => {
        window.location.href = '/frequency';
    }

    async function doLogin(e) {
        e.preventDefault();
        if(email.length > 0 && password.length > 0) {
            setLoading(true);
            await axios.post('http://localhost:3086/users/login', {
                email: email,
                password: password
            }).then(response => {
                const {user, token} = response.data;
                const user_ = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
                setUserLogged(user_);
                setTokenLogged(token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user_));
                setLoading(false);
                setError(response.data.message);
                setTypeMessage('success');
                setShowAlert(true);
                
                setTimeout(() => {
                    redirectToHome();
                }, 3000);

            }).catch((err) => {
                setError('Usuário ou senha inválidos');
                setTypeMessage('danger');
                setShowAlert(true);
                setLoading(false);
            });
        }
    }

    return (
        <div className="container-login">
          <div className="container-header">
            <div className="container-header-title">
                <p>Login</p>
            </div>
          </div>
          <form
            className="container-body"
            onSubmit={doLogin} >
            <div>
                <div className="container-email">
                    <label className="label">Email</label>
                    <input 
                        onChange={(e) => validateAndSet(e.target.value, 'email')}
                        className="input" 
                        required 
                        type="email" 
                        placeholder="Digite seu email"/>
                </div>
                <div className="container-pass">
                    <label className="label">Senha</label>
                    <input 
                        onChange={(e) => validateAndSet(e.target.value, 'password')}
                        className="input" 
                        required 
                        type="password" 
                        placeholder="Digite sua senha"/>
                </div>
            </div>
            <div className="container-footer">
                {loading ? 
                    <img src={loadingSVG} className="submit-disabled" alt="loading" /> : 
                    <input type="submit" className="submit" value="Entrar" />
                }
            </div>
          </form>
          <Alert
            message={error}
            show={showAlert}
            type={typeMessage}
            setShowAlert={(show) => setShowAlert(show)} />
        </div>
    );
}
