import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleUsername(e) {
        const value = e.target.value
        setUsername(value)
    }

    function handleEmail(e) {
        const value = e.target.value
        setEmail(value)
    }

    function handlePassword(e) {
        const value = e.target.value
        setPassword(value)
    }

    async function handleCreateNewUser(e){
        e.preventDefault()
        const data = {
            username: username,
            password: password,
            email: email
        }
        await api.post('users/', data)
        .then(response => {
            alert(`Bem vindo, ${response.data.username}!! Agora basta fazer login ;)`)
            history.push('/')
        })
        .catch(error => {
            if (error.response) {
              alert(error.response.data.username); 
            }
        })
    }

    return(
        <div className="signUp-page">
            <div  className='back-link'>
                <Link to='/'>
                     <FiArrowLeft/> Voltar para a home
                </Link>
            </div>
            <div className='signup-container'>
                <div className="text-field">
                    <h1>CADASTRO</h1>
                    <p>Faça o seu cadastro em <i> 2 </i> palitos e bora se divertir com o pessoal da Paguru Digital Solutions!!</p>
                </div>
                <div className="form-field">
                    <form onSubmit={handleCreateNewUser} >
                        <input type="text"
                                placeholder='Um nome para o teu usuário'
                                value={username}
                                onChange={handleUsername}
                                />
                        <input type="email" 
                                placeholder='Agora um email'
                                value={email}
                                onChange={handleEmail}
                                />
                        <input type="password"
                                 placeholder='Por útimo, uma senha...'
                                 value={password}
                                onChange={handlePassword}
                                 />
                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp;