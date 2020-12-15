import React, {useEffect, useState} from 'react';

import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Publication from '../../components/Publication';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import api from '../../services/api';

import './style.css';
const UserDetail = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [thereArePosts, setThereArePosts] = useState(false)
    const [loader, setLoader] = useState(true)

    const { id } = useParams()
    const token = localStorage.getItem('UserToken')


    useEffect(()=> {

        api.get(`users/${id}/`, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then(response => {
            setUserDetails(response.data)
            checkArrayFull(response.data.posts)
        })
        .catch(error => {
            alert('Opss... Algo deu errado')
            console.log(error)
        })

    }, [])

    function checkArrayFull(array) {
        if(array.length !== 0) {
            setLoader(false)
            setThereArePosts(true)

        }else {
            setLoader(false)
            setThereArePosts(false)
        }
    }
    
    return (
        <>
            <Navbar company={true} signin={false} feed={true} signup={false} logout={true} listUsers={true} />
            <div className="user-detail-container">
                <div className="user-detail-field">
                    <Link to='/usuarios' className="backToFeed">
                        <FiArrowLeft className='arrowLeft-icon'/>
                        <span>Voltar para a lista de usuários</span>
                    </Link>
                    <div className="user-info-field">
                        <figure></figure>
                        <h2>{userDetails.username}</h2>
                        <span>{userDetails.email}</span>
                    </div>
                    <hr/>

                    {thereArePosts ? (

                        userDetails.posts.map(post => (
                            <Publication 
                                key={post.id}
                                userName={post.author_name}
                                content={post.content}
                                date={post.created_at}
                                updated_at={post.updated_at}
                                postId={post.id}
                            />
                        ))

                    ) : (
                        <div className="no-post-field">
                            {loader ? <Loader/> : (
                                <p> 
                                    <i>{userDetails.username}</i> não tem publicações :(
                                </p>
                            ) }
                        </div>
                    ) }
                </div>
            </div>
        </>
    )
}

export default UserDetail;