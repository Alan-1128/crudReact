import React from 'react';
import { swalEstasSeguro } from '../Swals/Swals';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { hasRole } from './usuarioApi';

const api = process.env.REACT_APP_API;

const eliminar = async (id) => {
  await swalEstasSeguro(id);
}

export let name;
export let brand;
export let madein;
export let price;
export let Id;

const CrudApp = () => {

  const navigate = useNavigate();
  
  const {data, loading} = useFetch(api);

  const editar = (id, nombre, marca, hecho, precio) => {
    Id = id;
    name = nombre;
    brand = marca;
    madein = hecho;
    price = precio;

    navigate(`/edit/${id}`);
  }

  return <>
            <br /> <br />
            <h1 className='Flex'>Sistema Crud</h1>
            <br /> <br />
            <br /> <br />

            <div className="container animate__animated animate__fadeIn">
              <div className="card">
                <div className="card-body">
                    <div className="panel panel-primary">
                        <div className="panel-body">
                          <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Marca</th>
                                  <th>Hecho en</th>
                                  <th>Precio</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                              { 
                                // loading ?
                                // (
                                //   <tr>
                                //         <td></td>
                                //         <td></td>
                                //         <td>cargando..</td>
                                //         <td></td>
                                //         <td></td>
                                //    </tr>
                                // ) 
                                // :
                                // (
                                //   data.map((resp) => {
                                //       return <tr key={resp.id}>
                                //         <td>{resp.name}</td>
                                //         <td>{resp.brand}</td>
                                //         <td>{resp.madein}</td>
                                //         <td>{resp.price}</td>
                                //         {hasRole('ROLE_USER') && (
                                //           <td>
                                //             <button onClick={() => eliminar(resp.id)} 
                                //                     className="btn btn-danger">
                                //                     Eliminar</button>
                                //             <button className="btn btn-azul" 
                                //                     onClick={() => editar(resp.id, resp.name, 
                                //                     resp.brand, resp.madein, resp.price)}>
                                //                     Editar</button>
                                //           </td>
                                //         )}
                                //       </tr>
                                //   })
                                // )
                                !data ? 'cargando...' :
                                
                                  data.map((resp) => {
                                      return <tr key={resp.id}>
                                        <td>{resp.name}</td>
                                        <td>{resp.brand}</td>
                                        <td>{resp.madein}</td>
                                        <td>{resp.price}</td>
                                        {hasRole('ROLE_USER') && (
                                          <td>
                                            <button onClick={() => eliminar(resp.id)} 
                                                    className="btn btn-danger">
                                                    Eliminar</button>
                                            <button className="btn btn-azul" 
                                                    onClick={() => editar(resp.id, resp.name, 
                                                    resp.brand, resp.madein, resp.price)}>
                                                    Editar</button>
                                          </td>
                                        )}
                                      </tr>
                                  })
                              }
                              </tbody>
                          </table>
                        </div>
                    </div>
                </div>
              </div>
            </div>
         </>;
};

export default CrudApp;