import React, { useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

import firebase from '../firebase';//importa el index que contiene tanto context como firebase
//Validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
  email:'',
  password:''
}

const Login = () => {

  const [error, guardarError ] = useState(false);
  
  const { valores, errores, handleChange, handleSubmit, handleBlur} = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  //Primer parametro para el hook personalizado es el state inicial que creamos, segundo Las reglas de validacion, que las creo en carpeta de validacion; y tercero la funcion que va a ejecutarse

  const { email, password } = valores;

  async function iniciarSesion(){
    try {
      //const usuario = await firebase.login(email, password);
      //console.log(usuario) para ver la info del usuario que tiene firebase
      await firebase.login(email, password);
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario', error.message);
      guardarError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align:center;
              margin-top:5rem;
            `}
          >Iniciar Sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"   
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}              
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"      
                value={password}
                onChange={handleChange} 
                onBlur={handleBlur}          
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            
            {error && <Error>{error}</Error>}

            <InputSubmit
              type="submit"
              value="Iniciar Sesión"
            />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}
export default Login;
