import React, {useState, useEffect} from 'react';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import Publication from '../../components/Publication';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import './style.css'
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [hasNext, setHasNext] = useState(true);
    const [offSet, setOffSet] = useState(10);
    const [loader, setLoader] = useState(false);
    const [generalLoader, setGeneralLoader] = useState(false);
    const history = useHistory();
    
    const token = localStorage.getItem('UserToken')

    // Load first posts...
    useEffect(()=> {
        setOffSet(10)
        setGeneralLoader(true)
        window.scrollTo({top: 0})
        if(token) {
            
        }else {
            alert('Você precisa fazer login para ver o feed')
            history.push('/')
        }
        try {
            api.get('posts', {
                headers: {
                    Authorization: `token ${token}`
                }
            } ).then(response => {
                setPosts([...response.data.results]) // set we posts list

                if (response.data.next !== null){ // check if exist next page
                    setHasNext(true)
                } else {
                  setHasNext(false)  
                }
                setGeneralLoader(false)
                })
        }catch(err){
            console.log('ERRO ', err)
        }
        
    }, [])

    // See more posts...
    function handleSeeMore() {
        setLoader(true)
        try {
            api.get(`posts/?limit=10&offset=${offSet}`, {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            .then(res => {
                //console.log(res.data.results)
                setPosts([...posts, ...res.data.results])
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

    // Set content for the new post
    function handleNewPost(e) {
        const value = e.target.value
        setNewPostContent(value)
    }

    // Launch new post
    function handleSubmitNewPost(e) {
        e.preventDefault()
        const data = {
            content: newPostContent
        }
        try {
            api.post('posts/', data , {
                headers: {
                    Authorization: `token ${token}`
                }
            })
            setNewPostContent('')
        }catch(erro) {
            console.log(erro)
        }
    }

    return (
        <>
            <Navbar company={true} signin={false} feed={false} signup={false} logout={true} listUsers={true} />
            <div className="feed-container">
                <div className="feed-field">
                    <div className="new-post-field">
                        <form onSubmit={handleSubmitNewPost}>
                            <textarea value={newPostContent}
                                        placeholder='O que você está pensando...'
                                        onChange={handleNewPost}
                            />
                            <button type='submit'>Publicar</button>
                        </form>
                    </div>
                    <hr/>

                    {generalLoader ? <Loader/>  : '' }
                    
                    {posts.map(post => (

                        <Publication key={post.id}
                                    postId={post.id}
                                    userName={post.author_name}
                                    content={post.content} 
                                    date={post.created_at}
                                    updated_at={post.updated_at}
                                    />

                    ))}           

                    {hasNext ? (
                        <div className="see-more">
                            <h1 onClick={handleSeeMore}> {loader ? <Loader/> : 'Mostrar Mais' } </h1>
                        </div>
                    ) : '' }
                </div>
            </div>
        </>
    )
}

export default Feed;