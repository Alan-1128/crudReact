import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { agregarAuthorizationHeader } from '../Components/usuarioApi';

const MySwal = withReactContent(Swal)
const api = process.env.REACT_APP_API;

export const swalEstasSeguro: any = (id: number) => {
  MySwal.fire({
    title: '¿Estás seguro?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1c2c4c',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__fast'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown animate__fast'
    }
  }).then(async (result) => {
    if (result.isConfirmed) {

      const resp = await fetch(`${api}/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${agregarAuthorizationHeader()}`
        },
      })
          Swal.fire(
            'Eliminado!',
            '',
            'success'
          )
          window.location.reload();
        
      }
  })
}

export const swalOk: any = () => {
    MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Realizado con exito',
        showConfirmButton: false,
        timer: 1500
    })
}

export const swalIncorrecto: any = () => {
  MySwal.fire({
    position: 'center',
    icon: 'error',
    title: 'Incorrecto',
    showConfirmButton: false,
    timer: 1500
  })
}

export const salirCorrecto: any = () => {
  MySwal.fire({
    title: 'Has cerrado sesión!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
  })
}
