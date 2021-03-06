import React from 'react';
import Layout from '../components/layout/Layout';
import DetalleProductos from '../components/layout/DetalleProducto';
import useProductos from '../hooks/useProductos';

const Home = () => {

  const { productos } = useProductos('creado');
  
  return (
    <div>
      <Layout>
          <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                {productos.map(producto => (
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

export default Home;
