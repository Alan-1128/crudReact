import React from 'react';
import { swalOk, swalIncorrecto } from '../Swals/Swals';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { brand as marca, Id, madein as hecho, name as nombre, price as precio } from './CrudApp';
import { agregarAuthorizationHeader } from './usuarioApi';


const api = process.env.REACT_APP_API;

const Edit = () => {

    const navigate = useNavigate();

    const editar = async (valores:any) => {

            const resp = await fetch(`${api}/${Id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${agregarAuthorizationHeader()}`
                },
                body: JSON.stringify(valores)
            })
        
                swalOk();
                navigate(`/crud`, {
                    replace: true
                });
            
        
    }
    

    return <>
    <br /> <br />
    <br /> <br />
          <div className="containerr animate__animated animate__fadeIn">
              <div className="formulario">
                  <div className="titulo">
                      <h3>Editar</h3>
                  </div>
                  <Formik
                        initialValues={{
                            name: `${nombre}`,
                            brand: `${marca}`,
                            madein: `${hecho}`,
                            price: `${precio}`
                        }}
                        validate={(valores: any) => {
                            let errores: any = {};

                            // Validacion nombre
                            if(!valores.name){
                                errores.name = 'Por favor ingresa un nombre'
                            } else if(!/^[a-zA-ZÀ-ÿ0-9_.+-]{3,40}$/.test(valores.name)){
                                errores.name = 'El nombre debe tener más de 2 caracteres'
                            }

                            // Validacion marca
                            if(!valores.brand){
                                errores.brand = 'Por favor ingresa una marca'
                            } else if(!/^[a-zA-ZÀ-ÿ0-9_.+-]{3,40}$/.test(valores.brand)){
                                errores.brand = 'La marca debe tener más de 2 caracteres.'
                            }

                            // Validacion hecho
                            if(!valores.madein){
                                errores.madein = 'Por favor ingresa en donde fue hecho'
                            } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.madein)){
                                errores.madein = 'Solo puede contener letras y espacios.'
                            }

                            // Validacion precio
                            if(!valores.price){
                                errores.price = 'Por favor ingresa un precio'
                            } else if(!/^[0-9.-]{1,40}$/.test(valores.price)){
                                errores.price = 'El precio solo puede contener numeros.'
                            }
                            return errores;
                        }}
                        onSubmit={(valores, {resetForm}) => {
                            console.log(valores);
                            editar(valores);
                            resetForm();
                        }}>


                        {( {errors} ) => (
                            <Form className="form" autoComplete="off" >
                                <div className="inputs">
                                    <label htmlFor="name">Nombre</label>
                                    <ErrorMessage name="name" component={() => (<div className="text-danger">{errors.name}</div>)} />
                                    <Field
                                        type="text" 
                                        id="name" 
                                        name="name"/>

                                </div>
                                <div className="inputs">
                                    <label htmlFor="brand">Marca</label>
                                    <ErrorMessage name="brand" component={() => (<div className="text-danger">{errors.brand}</div>)} />
                                    <Field
                                        type="text" 
                                        id="brand" 
                                        name="brand"/>

                                </div>
                                <div className="inputs">
                                    <label htmlFor="madein">Hecho en</label>
                                    <ErrorMessage name="madein" component={() => (<div className="text-danger">{errors.madein}</div>)} />
                                    <Field
                                        type="text" 
                                        id="madein" 
                                        name="madein"/>

                                </div>
                                <div className="inputs">
                                    <label htmlFor="price">Precio</label>
                                    <ErrorMessage name="price" component={() => (<div className="text-danger">{errors.price}</div>)} />
                                    <Field
                                        type="number" 
                                        id="price" 
                                        name="price" />

                                </div>



                                <div className="boton">
                                    <button type="submit" className="login">Agregar</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>;
};

export default Edit;
