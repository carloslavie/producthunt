import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function useAutenticacion () {
    const [ usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null)

    useEffect(() => {
       const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {// onauthstate.. metodo que revisa en firebase si hay usuario
           if(usuario){
                guardarUsuarioAutenticado(usuario);//Si hay usuario guardamos el usuario
           }else{
                guardarUsuarioAutenticado(null);//si no lo dejamos en null
           }
       })
       return () => unsuscribe();
    }, [])

    return usuarioAutenticado;
}
 
export default useAutenticacion;//esta funcion la importamos en el provider de _app