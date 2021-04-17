import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router';
import DetalleProductos from '../components/layout/DetalleProducto';
import useProductos from '../hooks/useProductos';


const Buscar = () => {

  const router = useRouter();
  //console.log(router); para ver que viene del router
  const { query: { q } } = router;
  //console.log(q);

  //Todos los productos
  const { productos } = useProductos('creado');
  //console.log(productos);

  const [ resultado, guardarResultado ] = useState([]);
  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    guardarResultado(filtro);
    
  }, [q, productos])
  
  return (
    <div>
      <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {resultado.map(producto => (
                  <DetalleProductos
                    key= {producto.id} 
                    producto= {producto}
                  />
                ))}
              </ul>
            </div>
          </div>
      </Layout>
    </div>
  )
}

export default Buscar;
