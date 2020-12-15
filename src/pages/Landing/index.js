import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import undrawSocial from '../../assets/undraw_Social_life.svg';
import Login from '../../components/SignIn';

import './style.css';
const Landing = () => {

    return (
        <>
        <Navbar company={true} signin={true} feed={true} signup={true} logout={false} listUsers={false} />
        <div className="landing" id='landing' > 
            <div className="landing-container pt8r">
                <div className="header-field">
                    <h1>PAGURU SOCIAL</h1>
                    <div className="desc mt1r">
                        <p>Faça parte agora mesmo do "backstage paguru" e se divirta com os mais diversos
                            assuntos no nosso ambiente.
                        </p>
                    </div>
                    <button className='button mt2r' > <a href="#username">Vamos lá!</a> </button>
                    <span> <Link to="/cadastro"> Não tenho cadastro :'( </Link> </span>
                </div>
                <div className="landing-img">
                        <img src={undrawSocial} alt="undraw"/>
                </div>
            </div>
        </div>
        <Login/>
        </>
    )
}

export default Landing;