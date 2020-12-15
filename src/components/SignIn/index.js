import React, {useState} from 'react';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import './style.css'

const SignIn = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function handleUsernameChange(e){ // Input username capture
    const usernameValue = e.target.value
    setUsername(usernameValue)
  }

  function HandlePassChange(e) { // Input password capture
    const passValue = e.target.value
    setPassword(passValue)
  }

  async function handleSubmit(e){ // Handle submit event
      e.preventDefault()
      
      const data = {
        username: username,
        password: password
      }
  
      if ( localStorage.getItem('UserToken') ) {
        localStorage.removeItem('UserToken')
        console.log('Deletou algun token já existente')
        }
      
      await api.post('auth/', data )
      .then(response => {
        const token = response.data.token
        localStorage.setItem('UserToken', token)
        history.push('publicacoes')
        
      })
      .catch(error => {
        if(error.response) {
            alert(error.response.data.non_field_errors)   
        }
      })  
    }

    return (
        <>
          <div className="field-signin padding8r">

            <form onSubmit={handleSubmit} >                
              
                <h1>Login</h1>
                <input type="text"
                        name='username'
                        id='username'
                        placeholder='Usuário'
                        value={username}
                        onChange={handleUsernameChange}
                        />

                <input type="password"
                       name="password" 
                       id="password" 
                       placeholder='Senha'
                       value={password}
                       onChange={HandlePassChange}
                       />

                <button type='submit'>Entrar</button>
            </form>
          </div>
        </>
    )
}

export default SignIn;