export default function validarCrearProducto(valores) {

    let errores={};

    //validar el nombre del usuario
    if(!valores.nombre){
        errores.nombre = "el nombre es obligatorio"
    }

    //validar email
    if(!valores.empresa){
        errores.empresa = "Nombre de empresa es obligatorio"
    }

    //validar la url
    if(!valores.url){
        errores.url = "La URL del producto es obligatoria";
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL mal formateada o no válida"
    }

    //Validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción de tu producto"
    }
    return errores;
}