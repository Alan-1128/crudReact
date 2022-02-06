import { Usuario } from '../class/usuario';
import { swalIncorrecto, swalOk } from '../Swals/Swals';
// import { useNavigate } from 'react-router-dom';


const api = process.env.REACT_APP_TOKEN;
let _usuario!: any;
let _token!: any;
// const navigate = useNavigate();

export const usuario = (): Usuario => {

  if (_usuario != null) {
    return _usuario;
  } else if (_usuario == null && sessionStorage.getItem('usuario') != null) {
    _usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
    return _usuario;
  }
  return new Usuario();
}

export const token = (): string => {
  if (_token != null) {
    return _token;
  } else if (_token == null && sessionStorage.getItem('token') != null) {
    _token = sessionStorage.getItem('token');
    return _token;
  }
  return null!;
}

export const login = async (usuario:any) => {

    const credenciales = window.btoa('crudapp' + ':' + '12345');

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    try {
      const resp = await fetch(`${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credenciales
        },
        body: params.toString()
      })
  
      const data = await resp.json();
      
      guardarUsuario(data.access_token);
      guardarToken(data.access_token);

        swalOk();
        // navigate(`/crud`, {
        //   replace: true
        // });
        
    } catch (err:any) {
      if (err.status == 400) {
        swalIncorrecto();
    }

}}

export const guardarUsuario = (accessToken:string) => {
  let payload = obtenerDatosToken(accessToken);
  _usuario = new Usuario;
  _usuario.nombre = payload.nombre;
  _usuario.apellido = payload.apellido;
  _usuario.email = payload.email;
  _usuario.username = payload.user_name;
  _usuario.roles = payload.authorities;
  sessionStorage.setItem('usuario', JSON.stringify(_usuario));
}

export const guardarToken = (accessToken:string): void => {
  _token = accessToken;
  sessionStorage.setItem('token', accessToken);
}

function obtenerDatosToken(accessToken: string) {
  if (accessToken != null) {
    return JSON.parse(atob(accessToken.split(".")[1]));
  }
  return null;
}

export const isAuthenticated = () => {
  let payload = obtenerDatosToken(token());
  if (payload != null && payload.user_name && payload.user_name.length > 0) {
    return true;
  }
  return false;
}

export const hasRole = (role: string): boolean => {
  if (usuario().roles.includes(role)) {
    return true;
  }
  return false;
}

export const logout = (): void => {
  _token = null;
  _usuario = null;
  sessionStorage.clear();
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('usuario');
}

export const agregarAuthorizationHeader = () => {

  let _token: any = token();

  if(token != null){
    // return httpHeaders.append('Authorization', 'Bearer ' + _token);
    let a = (`${_token}`)
    return a;
  }
}



