import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useProductos = orden => {//para hacerlo reutilizable toma un orden

  const [ productos, guardarProductos ] = useState([]);
  
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async ()=>{
      await firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot) //escribis todo lo que queres traer, pero el snapshot es realmente el que accede a los datos y permite iterarlos
    }
    obtenerProductos();
  }, [])

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data() //accedemos a todos los datos del documento
      }
    })
    guardarProductos(productos);
  } 

  return{
      productos
  }
}

export default useProductos;