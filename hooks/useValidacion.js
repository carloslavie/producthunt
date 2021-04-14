import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn) => {

    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitform, guardarSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitform){
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores){
                fn();// fn = Funcion que se ejecuta en el componente(puede ser crear producto, iniciar sesion, o crear usuario)
            }
            guardarSubmitForm(false);
        }
    }, [errores])//Usamos como dependencia errores para que revise si hay o no hay, y si no hay ejecuta la funcion que le pasamos

    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);//Si hay errores, guardar errores
        guardarSubmitForm(true);
    }

    const handleBlur = ()=>{
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur
    };
}
 
export default useValidacion;