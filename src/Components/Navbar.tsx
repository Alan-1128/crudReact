import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, hasRole } from './usuarioApi';
import { salirCorrecto } from '../Swals/Swals';


function abrir():void {
    const containerCall:any = document.querySelector('.contenedor');
    containerCall.classList.toggle("change");
}


const Navbar = () => {

    const navigate = useNavigate();

      function salir() {
          logout();
          salirCorrecto();
          navigate(`/login`, {
            replace: true
        });
      }


    return <div className="contenedor" onClick={abrir}>
                <div className="top-menu contenedor" >
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                </div>
                
                <section className="sidebar">
                    <ul className="menu">
                        <li className="menu-item">
                            <Link to="crud" 
                                  className="menu-link pointer" 
                                  data-content="Inicio">
                                Inicio
                            </Link> 
                        </li>
                        <hr />
                        {isAuthenticated() && (
                            <li className="menu-item">
                                <a className="menu-link pointer" 
                                    data-content="Salir"
                                    onClick={salir}>
                                    Salir
                                </a> 
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <li className="menu-item">
                                <Link to="login" 
                                    className="menu-link pointer" 
                                    data-content="Entrar">
                                    Entrar
                                </Link> 
                            </li>
                        )}
                        <hr />
                        {hasRole('ROLE_ADMIN') && (
                            <li className="menu-item">
                                <Link to="add" 
                                    className="menu-link pointer" 
                                    data-content="Agregar">
                                    Agregar
                                </Link> 
                            </li>
                        )}
                    </ul>
                </section>
        </div>;
};

export default Navbar;


