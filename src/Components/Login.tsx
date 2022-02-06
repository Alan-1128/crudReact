import React, { useEffect, useState } from 'react';
import '../Styles/formulario.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, login } from './usuarioApi';
import { swalIncorrecto } from '../Swals/Swals';


const Login = () => {

	const navigate = useNavigate();

	  const n = async (valores:any) => {
		  await login(valores)

		  if(isAuthenticated()){
			  navigate(`/crud`);
		  }else {
			swalIncorrecto();
		  }
	  }

    return <>
    <br /> <br />
    <br /> <br />
    <div className="containerr animate__animated animate__fadeIn">
        <div className="formulario">
            <div className="titulo">
                <h3>Iniciar sesión</h3>
            </div>

            <Formik
				initialValues={{
					username: '',
					password: ''
				}}
				validate={(valores) => {
					let errores: any = {};

					// Validacion usuario
					if(!valores.username){
						errores.username = 'Por favor ingresa un usuario'
					} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.username)){
						errores.username = 'El usuario solo puede contener letras y espacios'
					}

					// Validacion password
					if(!valores.password){
						errores.password = 'Por favor ingresa un password'
					} else if(!/^[a-zA-ZÀ-ÿ0-9]{1,40}$/.test(valores.password)){
						errores.password = 'La contraseña solo puede contener letras y numeros.'
					}
					return errores;
				}}
				onSubmit={(valores, {resetForm}) => {
					n(valores);
					resetForm();
				}}>

				{( {errors} ) => (
                    <Form className="form" autoComplete="off" >
                        <div className="inputs">
                            <label htmlFor="username">Usuario</label>
					        <ErrorMessage name="username" component={() => (<div className="text-danger">{errors.username}</div>)} />
                            <Field
					 			type="text" 
					 			id="username" 
					 			name="username" 
					 		/>
                        </div>
                        <div className="inputs">
                            <label htmlFor="password">Contraseña</label>
					        <ErrorMessage name="password" component={() => (<div className="text-danger">{errors.password}</div>)} />
                            <Field
					 			type="password" 
					 			id="password" 
					 			name="password" 
					 		/>
                        </div>



                        <div className="boton">
                            <button type="submit" className="login">Iniciar sesión</button>
                        </div>
                    </Form>
				)}
            </Formik>

        </div>
    </div>
</>;
};

export default Login;
