import React, { useState, useEffect} from  'react';

import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import api from '../../services/api';

import './style.css'
const Users = () => {
    const [users, setUsers] = useState([]);
    const [numUsers, setNumUsers] = useState(0);
    const token = localStorage.getItem('UserToken');
    const [hasNext, setHasNext] = useState(true);
    const [offSet, setOffSet] = useState(10);
    const [loader, setLoader] = useState(false);
    const [generalLoader, setGeneralLoader] = useState(false);

    const history = useHistory()

    useEffect(()=> {
        setGeneralLoader(true)
        if(token) {
            
        }else {
            alert('Você precisa fazer login para ver o feed')
            history.push('/')
        }
        try{
            api.get('users', {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then(response => {
                const listUsers = response.data.results
                setUsers([...listUsers])
                setNumUsers(response.data.count)
                if (response.data.next !== null){ // check if exist next page
                    setHasNext(true)
                } else {
                  setHasNext(false)  
                }
                
                setGeneralLoader(false)
            })
        }catch(erro){
            console.log('Opss... ', erro)
        }
    }, [])


    function handleSeeMoreUsers() {
        setLoader(true)
        try {
            api.get(`users/?limit=10&offset=${offSet}`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then(res => {
                //console.log(res.data.results)
                setUsers([...users, ...res.data.results])

                if (res.data.next !== null){ // check if exist next page
                    setHasNext(true)
                } else {
                  setHasNext(false)  
                }
                setLoader(false)
            })
            setOffSet(offSet + 10)
        }catch(err) {
            console.log('Erro ', err)
        }
    }

    return (
        <>
            <Navbar company={true} signin={false} feed={true} signup={false} logout={true} listUsers={false} />
            <div className="users-container">
            <div className="field-users">
                <Link to='/publicacoes' className="backToFeed">
                    <FiArrowLeft className='arrowLeft-icon'/>
                    <span>Voltar para o Feed</span>
                </Link>
                <span className='tot-users'>Temos <i> {numUsers} </i> usuários por aqui</span>

                {generalLoader ? <Loader/>  : '' }

                <div>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}> 
                                <Link to={`usuario/${user.id}`}>
                                    <figure></figure> 
                                    <h4>{user.username}</h4>
                                    <h4>{user.email}</h4>
                                </Link>
                            </li>
                        ))}
                        
                    </ul>
                </div>
                
                {hasNext ? (
                        <div className="more-users">
                            <h1 onClick={handleSeeMoreUsers}> {loader ? <Loader/> : 'Mostrar Mais' } </h1>
                        </div>
                    ) : '' }

            </div>
        </div>
        </>
    )
}

export default Users;