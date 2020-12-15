import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import { FiTrash2, FiEdit, FiX } from 'react-icons/fi';

import './style.css'
const Publication = ({userName, content, date, updated_at, postId}) => {

    const [wasEdited, setWasEdited] = useState(false);
    const [editContainer, setEditContainer] = useState(false)
    const [newValuePostContent, setNewValuePostContent] = useState(content)
    const [currentPostDate, setCurrentPostDate] = useState('');

    const token = localStorage.getItem('UserToken')

    useEffect(()=> {
        checkIfWasEdited()
    }, [])

    function formattedDate(WeDate) {
        const date = new Date(WeDate);
        const weFormattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        const weFormattedHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        return { 
            formattedDate : weFormattedDate,
            formattadHour : weFormattedHour
         } 
    }

    function checkIfWasEdited() {

        const createdAt = formattedDate(date)
        const updatedAt = formattedDate(updated_at)
        if( createdAt.formattedDate === updatedAt.formattedDate ) {
            if( createdAt.formattadHour !== updatedAt.formattadHour ) {
                setWasEdited(true)
                setCurrentPostDate(updatedAt.formattedDate)
            } else {
                setCurrentPostDate(createdAt.formattedDate)
            }
        }else if( createdAt.formattedDate !== updatedAt.formattedDate ) {
            setWasEdited(true)
            setCurrentPostDate(updatedAt.formattedDate)
        }else {
            setCurrentPostDate(createdAt.formattedDate)
        }
    }

    async function handleDeletePost(id) {
        const result = window.confirm('Esta ação irá excluir a sua publicação...')
        if( result === true) {
        
            await api.delete(`posts/${id}/`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then( () => {
                alert(`Prontinho! Atualize a página para vizualizar as alterações`)
                
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.detail); 
                  }
            })
        }
    }

    function handleEditPost(){
        if(editContainer) {
            setEditContainer(false)
        }else {
            setEditContainer(true)
        }
    }

    function handleNewValuePost(e) {
        const value = e.target.value
        setNewValuePostContent(value)
    }

    async function handleSubmitEditPost(e, id) {
        e.preventDefault()
        const data = {
            content : newValuePostContent
        }

        await api.put(`posts/${id}/`, data, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        .then(response => {
                
                alert(`Prontinho, ${response.data.author_name}. Atualize a página para vizualizar as alterações`)
                handleEditPost()
        })
        .catch(error => {
            if (error.response) {
                alert(error.response.data.detail); 
              }
        })
    }

    return (
        <>
        {editContainer ? (
            <div className="edit-post-container">
                <div className="edit-post">
                    <FiX className='x-icon' onClick={handleEditPost}/>
                    <form onSubmit={(e) => handleSubmitEditPost(e, postId)} >
                        <textarea name="posts"
                                    cols="40" rows="10" 
                                    onChange={handleNewValuePost}
                                    value={newValuePostContent}>
                        </textarea>
                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        ) : '' }
        
        <div className="post-container">
            
            <div className="user-info">
                <div>
                    <figure></figure>
                    <h4>{userName}</h4>
                </div>
                <div className="post-actions">
                    <ul>
                        <li> <FiTrash2 onClick={() => handleDeletePost(postId)} className='trash-icon' title='Excluir'/> </li>
                        <li> <FiEdit className='edit-icon' onClick={handleEditPost} title='Editar'/> </li>
                    </ul>
                </div>
            </div>
            <div className="post-info">
                <p>{content}</p>
                <div className="other-info">
                    <span className='edited'>{ wasEdited ? 'Editado' : '' }</span>
                    <span className='date'>{currentPostDate}</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Publication;