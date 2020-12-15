import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import paguruLogo from '../../assets/paguru-logo.png'

import './style.css';

const Navbar = ({company, signin, feed, signup, logout, listUsers}) => {

    const [hiddenMenu, setHiddenMenu] = useState(true);
    const [menuDisplay, setMenuDisplay] = useState('');
    const [iconMenu, seticonMenu] = useState(true);

    function handleLogout() {
        localStorage.removeItem('UserToken')
    }

    function handleMenuClick() {
        if(hiddenMenu){
            setHiddenMenu(false)
            setMenuDisplay('block')
            seticonMenu(false)
        }else {
            setHiddenMenu(true)
            setMenuDisplay('none')
            seticonMenu(true)
        }
    }

    return(
        <div >
            <nav className={`${ hiddenMenu ? 'menu' : 'menu menu-hamburguer' }`}>
                <div className="icons-hamburguer" onClick={handleMenuClick}>
                    { iconMenu ? <FiMenu/> : <FiX/> } 
                </div>
                <Link to='/' className="logo">
                    <img src={paguruLogo} alt="paguru"/>
                    <h4>Social</h4>
                </Link>

                <ul style={ {display: menuDisplay} }>
                    {company ? <li> <a href="https://www.paguru.com.br/">A Paguru</a> </li> : '' }
                    {feed ? <li> <Link to='/publicacoes'>Feed</Link> </li> : '' }
                    {signin ? <li> <a href="#username">Entrar</a> </li> : '' }
                    {signup ? <li> <Link to="/cadastro">Cadastrar</Link> </li> : '' }
                    {listUsers ? <li> <Link to="/usuarios">Usuários</Link> </li> : '' }
                    {logout ? <li> <Link to='/' onClick={handleLogout}> Sair </Link> </li> : '' }
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;