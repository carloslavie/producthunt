import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';//hook de routing que tiene next
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputSubmit, Campo } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';


const ContenedorProducto = styled.div`
    @media (min-width: 768px){
        display:grid;
        grid-template-columns:2fr 1fr;
        column-gap:2rem;
    }

`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color:#DA552F;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    display:inline-block;
    text-align:center;
`;


const Producto = () => {

    //State del componente
    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);
    const [ comentario, guardarComentario ] = useState({
        mensaje:''
    });
    const [ consultarDB, guardarConsultarDB ] = useState(true);

    console.log(consultarDB);
    //Routing para obtener el id actual
    const router = useRouter();
    // console.log(router); para ver que trae del prod seleccionado el router
    const { query: {id} } = router;

    const { firebase, usuario } = useContext(FirebaseContext);
    
    useEffect(() => {
        if(id && consultarDB){//REVISAR USEEFFECT 
            const obtenerProducto = async ()=>{
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto =  await productoQuery.get();
                console.log("consultando a la BD")
                if(producto.exists){
                    guardarProducto(producto.data());
                    console.log(producto.data())
                    guardarConsultarDB(false);
                } else {
                    guardarError(true);
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id, consultarDB]) //cada vez que haya o cambie el id o algo en el producto se renderiza

    if(Object.keys(producto) === 0 && !error) return 'Cargando...'

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto;
   
    //Administrar y validar los votos
    const votarProducto = ()=>{
        if(!usuario){
            return router.push('/login');
        }

        //Obtener y sumar votos
        const nuevoTotal = votos + 1;
        guardarConsultarDB(true);//Hay un voto, por lo tanto consultar a la BD

        if(haVotado.includes(usuario.uid))return;

        //Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];
        
        //Actualizar en la bd
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: nuevoHaVotado 
        })

        //Actualizar state
        guardarProducto({
            ...producto,
            votos:nuevoTotal
        })


    }

    //Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            mensaje : e.target.value
        })
    }
    
    //Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id){
            return true;
        }
    }
    const agregarComentario = async e => {
        e.preventDefault();
        e.target.reset();
        
        if(!usuario){
            return router.push('/login');
        }
        
        //Informacion extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;
                
        //Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];
        
        //Actualizar BD
        try {
            await firebase.db.collection('productos').doc(id).update({
                comentarios: nuevosComentarios
            })
            
            //Actualizar state
            guardarProducto({
                ...producto,
                comentarios: nuevosComentarios
            })

            
            
        } catch (error) {
            console.log("no funca");
        }
        
        
        guardarConsultarDB(true);//Hay un comentario, por lo tanto consultar a la BD
        
        guardarComentario({
            ...comentario,
            mensaje : ''
        })
        
    }

    //Funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () =>{
        if(!usuario)return false;

        if(creador){
            if(creador.id === usuario.uid) {
            return true;
        }
        }
    }

    //Elimina un producto
    const eliminarProducto = async () => {
        if(!usuario){
            return router.push('/login');
        }

        if(creador){
            if(creador.id !== usuario.uid) {
            return router.push('/login');
        }
        }
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
            
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <Layout>
            <>
            {error ? <Error404/> : (
                <div className="contenedor">
                <h1 css={css`
                    text-align:center;
                    margin-top:5rem;
                `}>{nombre}</h1>
                
                <ContenedorProducto>
                    <div>
                    <p>Publicado hace: {creado ? formatDistanceToNow(new Date(creado), {locale: es}) : null} </p>
                    {creador ? <p>Por: {creador.nombre} de {empresa}</p> : null}
                    <img src={urlimagen}/>
                    <p>{descripcion}</p>

                    {usuario && (
                        <>
                        <h2>Agrega tu comentario</h2>
                        <form
                            onSubmit={agregarComentario}
                        >
                            <Campo>
                                <input
                                    type="text"
                                    required
                                    mame="mensaje"
                                    onChange={comentarioChange}
                                />
                            </Campo>
                            <InputSubmit
                                type="submit"
                                value="Agregar comentario"
                            />
                        </form>
                        </>
                    )}

                    <h2
                        css={css`
                            margin:2rem 0;
                        `}
                    >Comentarios</h2>
                    <ul>
                    {(comentarios && comentarios.length > 0) ? 
                    comentarios.map((comentario, i)=>(
                        <li
                            key={`${comentario.usuarioId}-${i}`}
                            css={css`
                                border:1px solid #e1e1e1;
                                padding:2rem;
                            `}
                        >
                            <p>{comentario.mensaje}</p>
                            <p>Escrito por: 

                                <span
                                    css={css`
                                        font-weight:bold;
                                    `}
                                >
                                    {''} {comentario.usuarioNombre}
                                </span>
                            </p>
                            { esCreador(comentario.usuarioId) && 
                            <CreadorProducto>Es Creador</CreadorProducto>}
                        </li>
                    )) : "Aun no hay comentarios"}
                    </ul>
                    </div>
                    <aside>
                    <Boton
                        target="_blank"
                        bgColor="true"
                        href={url}
                    >Visitar URL</Boton>
                    
                    <div
                        css={css`
                            margin-top:5rem;
                        `}
                    >
                    <p css={css`
                        text-align:center;
                    `}>{votos} Votos</p>

                    {usuario && (
                    <Boton
                        onClick={votarProducto}
                    >Votar</Boton>)}
                    </div>

                    </aside>
                </ContenedorProducto>

                {puedeBorrar() &&
                <Boton
                    onClick={eliminarProducto}
                >Eliminar Producto</Boton>}
            </div>
            )}

            
            </>
        </Layout>
     );
}
 
export default Producto;